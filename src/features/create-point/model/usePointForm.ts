import { useRouter } from 'vue-router';
import { usePointStore } from '@/entities/Point';
import { ref } from 'vue';
import { z } from 'zod';

const pointSchema = z.object({
  title: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  address: z.string().min(2, 'Укажите адрес'),
  lat: z.string().min(1, 'Укажите широту'),
  lng: z.string().min(1, 'Укажите долготу'),
  comment: z.string().optional(),
});

export function usePointForm() {
  const router = useRouter();
  const pointStore = usePointStore();
  const errors = ref<Record<string, string>>({});

  const validate = () => {
    errors.value = {};
    const result = pointSchema.safeParse(pointStore.createForm);
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
    
    const success = await pointStore.createPoint();
    if (success) {
      router.push('/');
    }
  };

  const onCancel = () => {
    pointStore.resetForm();
    router.push('/');
  };

  return {
    form: pointStore.createForm,
    isLoading: pointStore.isLoading,
    errors,
    onSave,
    onCancel,
  };
}
