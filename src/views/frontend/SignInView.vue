<template>
  <div class="container mx-auto md:h-screen flex justify-center items-center">
    <div class="flex flex-col md:flex-row gap-4 bg-[rgba(208,214,221,0.15)] p-2 rounded-xl">
      <Card class="md:basis-1/2 flex-sm-hide">
        <template #header>
          <h2 class="font-black p-4 text-2xl">StepTogether</h2>
        </template>
        <template #content>
          <img class="object-cover w-7/8 mx-auto" style="max-height: 850px"
            src="/src/assets/images/login-social-img.jpg" alt="signin-social-img" />
        </template>
      </Card>
      <Card class="md:basis-1/2 flex justify-center p-2">
        <template #header>
          <h2 class="font-black p-4 text-2xl text-center md:hidden">StepTogether</h2>
          <img class="object-cover w-1/2 mx-auto socialImg" style="max-height: 250px"
            src="/src/assets/images/login-social-img.jpg" alt="signin-social-img" />
        </template>
        <template #title>
          <h1 class="font-black text-center text-3xl p-4 mb-0 mb-md-5">Sign in</h1>
        </template>
        <template #content>
          <div class="card flex justify-center">
            <Toast />
            <div v-if="isLoading" class="fixed inset-0 z-50 flex justify-center items-center"
              style="background: hsl(0deg 0% 100% / 50%)">
              <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" />
            </div>
            <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
              class="flex flex-col gap-4 w-full sm:w-80">
              <div class="flex flex-col gap-1">
                <InputText name="email" type="text" placeholder="Email" fluid class="p-2 border border-black rounded" />
                <Message v-if="$form.email?.invalid" severity="error" type="email" size="small" variant="simple"
                  style="height: 20px">{{ $form.email.error?.message }}</Message>
              </div>
              <div class="flex flex-col gap-1">
                <!-- 將 InputText + 按鈕 放進 relative 容器中 -->
                <div class="relative pb-1">
                  <InputText name="password" :type="passwordVisible ? 'text' : 'password'" placeholder="Password"
                    class="p-2 border border-black rounded w-full" />
                  <!-- 按鈕固定在最左側中間 -->
                  <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2"
                    @click="togglePasswordVisibility">
                    <i :class="passwordVisible ? 'pi pi-eye' : 'pi pi-eye-slash'"></i>
                  </button>
                </div>

                <!-- 錯誤訊息放在下面 -->
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple"
                  style="height: 20px">
                  {{ $form.password.error?.message }}
                </Message>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between flex-wrap md:flex-nowrap">
                  <RadioButtonGroup name="ingredient" v-model="ingredient" class="flex flex-wrap gap-4 me-2">
                    <div class="flex items-center gap-2">
                      <RadioButton inputId="remember" value="Remember me" />
                      <label for="remember">Remember me</label>
                    </div>
                  </RadioButtonGroup>
                  <a href="#" class="hover:underline hover:text-[#000]/50 ml-auto mt-2 sm:mt-auto">
                    Forget Password?
                  </a>
                </div>
                <Message v-if="$form.ingredient?.invalid" severity="error" size="small" variant="simple">{{
                  $form.ingredient.error?.message }}</Message>
              </div>
              <Button type="submit"
                class="rounded-lg text-white py-2 text-xl bg-[#DF4927] border-2 border-transparent hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300 w-80"
                label="Sign in" unstyled />
              <div class="flex items-center gap-2">
                <span class="flex-1 border-t border-gray-300"></span>
                <span class="text-gray-500">Or signin with</span>
                <span class="flex-1 border-t border-gray-300"></span>
              </div>
              <Button type="submit"
                class="rounded-lg text-black py-2 text-xl bg-white border-2 border-black transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-[#272F43] hover:text-white"
                unstyled>
                <i class="pi pi-google me-2"></i>Google
              </Button>
              <div class="flex flex-wrap md:flex-nowrap">
                <span class="me-2">Don’t have an account?</span>
                <router-link to="/signUp"
                  class="font-black text-[#DF4927] hover:underline hover:text-[#272F43] ml-auto mt-2 sm:mt-auto">
                  Sign Up now
                </router-link>
              </div>
            </Form>
            <div class="hidden lg:flex justify-center absolute right-20 bottom-8">
              <router-link to="/adminLogin" class="font-black text-[#DF4927] hover:underline hover:text-[#272F43]">
                管理者登入
              </router-link>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Form } from "@primevue/forms";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useSigninStore } from "@/stores/signinStore";
const router = useRouter();
const signinStore = useSigninStore();
const { getSigninData } = signinStore;
const toast = useToast();
const isLoading = ref(false);
const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
// 這裡設置 ingredient 的預設值為 "Remember me"
const ingredient = ref('Remember me');

const initialValues = reactive({
  email: "",
  password: "",
  ingredient: ingredient.value, // 更新初始值
});

const resolver = ({ values }) => {
  const errors = {};

  // Username validation
  if (!values.email) {
    errors.email = [{ message: "Email is required." }];
  }

  // Password validation
  if (!values.password) {
    errors.password = [{ message: "Password is required." }];
  } else {
    const password = values.password;

    // Check for password length
    if (password.length < 8) {
      errors.password = [{ message: "Password must be at least 8 characters long." }];
    }

    // Check for at least one uppercase letter
    else if (!/[A-Z]/.test(password)) {
      errors.password = [{ message: "Password must contain at least one uppercase letter." }];
    }

    // Check for at least one lowercase letter
    else if (!/[a-z]/.test(password)) {
      errors.password = [{ message: "Password must contain at least one lowercase letter." }];
    }

    // Check for at least one number
    else if (!/[0-9]/.test(password)) {
      errors.password = [{ message: "Password must contain at least one number." }];
    }

    // Check for at least one special character
    // else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   errors.password = [{ message: "Password must contain at least one special character." }];
    // }
  }
  if (!values.ingredient) {
    errors.ingredient = [{ message: "Ingredient is required." }];
  }

  return {
    values,
    errors,
  };
};

const onFormSubmit = async ({ valid, values }) => {
  isLoading.value = true; // 顯示 loading
  if (valid) {
    const payload = {
      email: values.email,
      password: values.password
    };

    const { error, data } = await getSigninData(payload)
    const token = data.data.token;
    localStorage.setItem('token', token);          // 儲存 token
    localStorage.setItem('isLoggedIn', 'true');

    isLoading.value = false; // 隱藏 loading
    if (error) {
      toast.add({
        severity: "error",
        summary: "登入失敗",
        detail: data.data.message,
        life: 3000,
      });
    } else {
      toast.add({
        severity: "success",
        summary: "登入成功",
        life: 3000,
      });
      // ✅ 清空表單資料
      Object.assign(initialValues, {
        email: "",
        password: "",
        ingredient: "",
      });


      // 延遲導航，讓 Toast 有時間顯示
      setTimeout(() => {
        router.push("/"); // 跳轉到頁面
        console.log("目前路徑:", router.currentRoute.value.fullPath);
      }, 1500);
    }
  } else {
    isLoading.value = false; // 隱藏 loading
  }
};
</script>
<style scoped>
.flex-sm-hide {
  display: none;
}

@media(min-width: 768px) {
  .flex-sm-hide {
    display: block;
  }
}

.socialImg {
  display: block;
}

@media(min-width: 768px) {
  .socialImg {
    display: none !important;
  }
}

::v-deep(.p-radiobutton-box) {
  border: 1px solid rgba(0, 0, 0, 0.5);
}

::v-deep(.p-radiobutton-box.p-highlight) {
  border-color: rgba(0, 0, 0, 0.5) !important;
}
</style>