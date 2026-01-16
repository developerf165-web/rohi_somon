import { ref, onMounted, computed, type Ref } from 'vue';
import { useRouter } from 'vue-router';



/**
 * Опсияҳо барои истифодаи useEntityForm.
 * @template T - Навъи (Type) маълумоти форма
 */
interface UseEntityFormOptions<T> {
    store: any; // Стор, ки бояд CRUD амалҳоро (createItem, updateItem, fetchItems) дошта бошад
    id?: string | number; // ID-иEntity (агар режим edit/view бошад)
    mode: 'add' | 'edit' | 'view'; // Режими форма
    initialState: T; // Ҳолати аввалияи форма (холӣ)
    onLoad?: (item: any) => T; // Функсия барои табдили маълумоти стор ба форма
    backRoute?: string; // Роҳ (Route) барои баргаштан пас аз сабт ё бекоркунӣ
}

/**
 * Composable-и универсалӣ барои идоракунии формаҳои Entity (Add/Edit/View).
 * Ин мантиқи стандартиро барои боргузорӣ, сабт ва валдиатсия муттаҳид мекунад.
 */
export function useEntityForm<T extends Record<string, any>>(options: UseEntityFormOptions<T>) {
    const { store, id, mode, initialState, onLoad, backRoute } = options;
    const router = useRouter();
    
    // Create a deep copy of initial state to avoid reference issues
    const form = ref<T>(JSON.parse(JSON.stringify(initialState))) as Ref<T>;
    const errors = ref<Partial<Record<keyof T, string>>>({});
    
    const isReadOnly = computed(() => mode === 'view');
    const isEdit = computed(() => mode === 'edit');
    const isAdd = computed(() => mode === 'add');

    const loadData = async () => {
        if (!id) return;
        
        // Determine the array to search in (handles different store structures)
        let collection = store.items || store.points || [];
        
        let item = collection.find((i: any) => i.id == id);
        
        if (!item) {
            // Determine fetch method
            if (store.fetchItems) await store.fetchItems();
            else if (store.fetchPoints) await store.fetchPoints();
            else if (store.fetchSklads) await store.fetchSklads();
            
            collection = store.items || store.points || [];
            item = collection.find((i: any) => i.id == id);
        }

        if (item) {
            if (onLoad) {
                form.value = onLoad(item);
            } else {
                // Default: merge item into form
                form.value = { ...form.value, ...item };
            }
        }
    };

    onMounted(() => {
        if (mode !== 'add') {
            loadData();
        }
    });

    const goBack = () => {
        if (backRoute) {
            router.push(backRoute);
        } else {
            router.back();
        }
    };

    const handleSave = async (
        validateFn: () => boolean, 
        payloadOverride?: any
    ) => {
        if (isReadOnly.value) return;
        if (!validateFn()) return;

        let success = false;
        const payload = payloadOverride || form.value;

        // Determine create/update methods
        const createMethod = store.createItem || store.createSklad || store.createArrival || store.createExpense;
        const updateMethod = store.updateItem || store.updateSklad || store.updateArrival || store.updateExpense;

        if (isAdd.value) {
            if (createMethod) {
                success = await createMethod(payload);
            }
        } else if (isEdit.value && id) {
             if (updateMethod) {
                success = await updateMethod(id, payload);
             }
        }

        if (success && backRoute) {
            router.push(backRoute);
        }
        return success;
    };

    return {
        form,
        errors,
        isReadOnly,
        isEdit,
        isAdd,
        loadData,
        handleSave,
        goBack
    };
}
