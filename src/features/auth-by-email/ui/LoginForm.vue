<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm } from 'vee-validate';
import { AppButton } from '@/shared/ui/button';
import { AppInput } from '@/shared/ui/input';
import { AppCheckbox } from '@/shared/ui/checkbox';
import { useUserStore } from '@/entities/user';
import { useRouter } from 'vue-router';
import { authApi } from '../api/auth';
import { handleApiError } from '@/shared/lib/error-handler';
import { loginSchema } from '../model/schema';

const REMEMBER_ME_KEY = 'auth_remembered_email';

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: localStorage.getItem(REMEMBER_ME_KEY) || '',
    password: '',
    rememberMe: !!localStorage.getItem(REMEMBER_ME_KEY),
  },
});

const [email, emailProps] = defineField('email', {
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: false,
});

const [password, passwordProps] = defineField('password', {
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: false,
});

const [rememberMe] = defineField('rememberMe', {
  validateOnBlur: false,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const emailModel = computed({
  get: () => email.value || '',
  set: (v) => email.value = v
});

const passwordModel = computed({
  get: () => password.value || '',
  set: (v) => password.value = v
});

const rememberMeModel = computed({
  get: () => !!rememberMe.value,
  set: (v) => rememberMe.value = v
});

const userStore = useUserStore();
const router = useRouter();
const isSubmitting = ref(false);
const serverError = ref<string | null>(null);

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  serverError.value = null;
  
  try {
    const response = await authApi.login(values.email, values.password);
    
    
    // Remember Me logic
    if (values.rememberMe) {
      localStorage.setItem(REMEMBER_ME_KEY, values.email);
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY);
    }

    // Store user and token in userStore
    userStore.setAuth(response.user, response.token);
    
    // Success redirect
    await router.push('/');
  } catch (error: any) {
    const appError = handleApiError(error);
    serverError.value = appError.message;
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-3">
    <div v-if="serverError" class="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
      {{ serverError }}
    </div>

    <AppInput
      v-model="emailModel"
      label="E-mail"
      placeholder="Введите e-mail"
      :error="errors.email"
      v-bind="emailProps"
      class="w-full"
    />

    <AppInput
      v-model="passwordModel"
      type="password"
      label="Пароль"
      placeholder="Введите пароль"
      :error="errors.password"
      v-bind="passwordProps"
      class="w-full"
    />

    <div class="flex items-center justify-between pb-1">
      <AppCheckbox v-model="rememberMeModel" label="Запомнить" />
    </div>

    <AppButton
      type="submit"
      variant="primary"
      class="w-full"
      :loading="isSubmitting"
    >
      Вход
    </AppButton>
  </form>
</template>
