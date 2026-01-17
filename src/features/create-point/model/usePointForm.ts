import { useRouter } from 'vue-router';
import { usePointStore } from '@/entities/Point';
import { ref, onMounted, computed } from 'vue';
import { z } from 'zod';
import { MAP_CONFIG } from '@/shared/config/map';

const pointSchema = z.object({
  title: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  address: z.string().min(2, 'Укажите адрес'),
  lat: z.string().min(1, 'Укажите широту'),
  lng: z.string().min(1, 'Укажите долготу'),
  comment: z.string().optional(),
  images: z.array(z.string()).optional(),
});

interface UsePointFormOptions {
  id?: string | number;
  mode?: 'add' | 'edit' | 'view' | 'map';
}

export function usePointForm(options: UsePointFormOptions = {}) {
  const { id, mode = 'add' } = options;
  const router = useRouter();
  const pointStore = usePointStore();
  const errors = ref<Record<string, string>>({});
  
  const form = ref({
    title: '',
    address: '',
    lat: '',
    lng: '',
    comment: '',
    images: [] as string[],
  });

  const loadData = async () => {
    if (!id || mode === 'add') return;
    
    let point = pointStore.points.find(p => p.id == id);
    
    if (!point) {
      await pointStore.fetchPoints();
      point = pointStore.points.find(p => p.id == id);
    }

    if (point) {
      form.value = {
        title: point.title,
        address: point.address || '',
        lat: point.lat || MAP_CONFIG.DEFAULT_CENTER[0].toString(),
        lng: point.lng || MAP_CONFIG.DEFAULT_CENTER[1].toString(),
        comment: point.comment || '',
        images: point.images || (point.image ? [point.image] : []),
      };
    }
  };

  onMounted(() => {
    if (mode !== 'add') {
      loadData();
    }
  });

  const validate = () => {
    errors.value = {};
    const result = pointSchema.safeParse(form.value);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === 'string') {
          errors.value[field] = issue.message;
        }
      });
      return false;
    }
    return true;
  };

  const onSave = async () => {
    if (!validate()) return;
    
    let success = false;
    
    if (mode === 'edit' && id) {
      success = await pointStore.updatePointById(id, form.value);
    } else {
      success = await pointStore.createPoint(form.value);
    }
    
    if (success) {
      // Small delay to allow the user to see the success state (optional but gives a better feel)
      router.push('/points');
    }
  };

  const onCancel = () => {
    router.push('/points');
  };

  return {
    form,
    isLoading: computed(() => pointStore.isLoading || false),
    errors,
    onSave,
    onCancel,
    loadData,
  };
}
