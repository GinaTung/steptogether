<template>
  <div class="container mx-auto md:h-screen flex justify-center items-center">
    <div class="flex flex-col md:flex-row gap-4 bg-[rgba(208,214,221,0.15)] p-2 rounded-xl">
      <Card class="md:basis-1/2 flex-sm-hide">
        <template #header>
          <h2 class="font-black p-4 text-2xl">StepTogether</h2>
        </template>
        <template #content>
          <img class="object-cover w-7/8 mx-auto" style="max-height: 850px"
            src="/src/assets/images/login-social-img.jpg" alt="user header" />
        </template>
      </Card>
      <Card class="md:basis-1/2 flex justify-center p-2">
        <template #header>
          <h2 class="font-black p-4 text-2xl text-center md:hidden">StepTogether</h2>
          <img class="object-cover w-1/2 mx-auto socialImg" style="max-height: 250px"
            src="/src/assets/images/login-social-img.jpg" alt="user header" />
        </template>
        <template #title>
          <h1 class="font-black text-center text-3xl p-4 mb-0 mb-md-5">Create your free account</h1>
        </template>
        <template #content>
          <div class="card flex justify-center">
            <Toast class="custom-toast5" />
            <div v-if="isLoading" class="fixed inset-0 z-50 flex justify-center items-center"
              style="background: hsl(0deg 0% 100% / 50%)">
              <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" />
            </div>
            <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit"
              class="flex flex-col gap-4 w-full sm:w-80">
              <!-- <Button
              type="submit"
              class="cursor-pointer rounded-lg text-black py-2 text-xl bg-white border-2 border-black transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-[#272F43] hover:text-white"
              unstyled
            >
              <i class="pi pi-google me-2"></i>Google
            </Button>
            <div class="flex items-center gap-2">
                <span class="flex-1 border-t border-gray-300"></span>
                <span class="text-gray-500">Or login with</span>
                <span class="flex-1 border-t border-gray-300"></span>
              </div> -->
              <div class="flex flex-col gap-1">
                <InputText name="email" type="text" placeholder="Email" fluid class="p-2 border border-black rounded" />
                <Message v-if="$form.email?.invalid" severity="error" type="email" size="small" variant="simple"
                  style="height: 14px">{{ $form.email.error?.message }}</Message>
              </div>
              <div class="flex flex-col gap-1 relative">
                <InputText name="password" :type="passwordVisible ? 'text' : 'password'" placeholder="Password" fluid
                  class="p-2 border border-black rounded" />
                <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2"
                  @click="togglePasswordVisibility" :class="{ 'pb-2': $form.password?.invalid }">
                  <i :class="passwordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                </button>
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple"
                  style="height: 14px">{{ $form.password.error?.message }}</Message>
              </div>
              <div class="flex flex-col gap-1">
                <InputText name="fullname" type="text" placeholder="Fullname" fluid
                  class="p-2 border border-black rounded" />
                <Message v-if="$form.fullname?.invalid" severity="error" size="small" variant="simple"
                  style="height: 14px">{{ $form.fullname.error?.message }}</Message>
              </div>
              <div class="flex flex-col gap-1">
                <InputText name="username" type="text" placeholder="Username" fluid
                  class="p-2 border border-black rounded" />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple"
                  style="height: 14px">{{ $form.username.error?.message }}</Message>
              </div>
              <div class="flex flex-col gap-1">
                <InputText name="birthday" type="text" placeholder="西元年月日 Ex:2025-03-11" fluid
                  class="p-2 border border-black rounded" />
                <Message v-if="$form.birthday?.invalid" severity="error" type="date" size="small" variant="simple"
                  style="height: 14px">{{ $form.birthday.error?.message }}</Message>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex justify-between flex-wrap md:flex-nowrap">
                  <RadioButtonGroup name="ingredient" class="flex flex-wrap gap-4 me-2">
                    <div class="flex items-center gap-2">
                      <RadioButton inputId="remember" value="Remember me" />
                      <label for="remember">I agree to Term amd Privacy Policy.</label>
                    </div>
                  </RadioButtonGroup>
                </div>
                <Message v-if="$form.ingredient?.invalid" severity="error" size="small" variant="simple">{{
                  $form.ingredient.error?.message }}</Message>
              </div>
              <Button type="submit"
                class="cursor-pointer rounded-lg text-white py-2 text-xl bg-[#DF4927] border-2 border-transparent hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300"
                label="Sign me up !" unstyled />
            </Form>
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
import { useSigninStore } from "@/stores/signinStore"; // <-- 應該是 signinStore，不是 useHomeStore
import ProgressSpinner from 'primevue/progressspinner';
const isLoading = ref(false);
const signinStore = useSigninStore();
// const { signinList } = storeToRefs(signinStore); // ✅ 這是 ref，要用 storeToRefs
const { getSigninData } = signinStore; // ✅ 這是方法，直接取即可

const router = useRouter();
const toast = useToast();
const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
const initialValues = reactive({
  email: "",
  password: "",
  username: "",
  fullname: "",
  birthday: "",
  ingredient: "",
});
const resolver = ({ values }) => {
  const errors = {};

  // Username validation
  if (!values.username) {
    errors.username = [{ message: "Username 必填" }];
  }
  if (!values.fullname) {
    errors.fullname = [{ message: "Fullname 必填" }];
  }
if (!values.email) {
  errors.email = [{ message: "Email 必填" }];
} else {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(values.email)) {
    errors.email = [{ message: "Email格式錯誤" }];
  }
}

if (!values.birthday) {
  errors.birthday = [{ message: "Birthday 必填" }];
} else {
  const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!birthdayRegex.test(values.birthday)) {
    errors.birthday = [{ message: "請輸入生日格式 YYYY-MM-DD" }];
  }
}
  // Password validation
  if (!values.password) {
    errors.password = [{ message: "Password 必填" }];
  } else {
    const password = values.password;

    // Check for password length
    if (password.length < 8) {
      errors.password = [{ message: "請輸入至少8字元的長度" }];
    }
    // Check for at least one uppercase letter
    else if (!/[A-Z]/.test(password)) {
      errors.password = [{ message: "請至少輸入一個大寫字母" }];
    }
    // Check for at least one lowercase letter
    else if (!/[a-z]/.test(password)) {
      errors.password = [{ message: "請至少輸入一個小寫字母" }];
    }
    // Check for at least one number
    else if (!/[0-9]/.test(password)) {
      errors.password = [{ message: "請至少輸入一個數值" }];
    }
    // Check for at least one special character
    // else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   errors.password = [{ message: "Password must contain at least one special character." }];
    // }
  }
  if (!values.ingredient) {
    errors.ingredient = [{ message: "Ingredient 必填" }];
  }

  return {
    values,
    errors,
  };
};

const onFormSubmit = async ({ valid, values }) => {
  isLoading.value = true; // 顯示 loading

  if (valid) {
    // 把表單值轉為正確格式再傳入 API
    const payload = {
      email: values.email,
      password: values.password,
      username: values.username,
      fullName: values.fullname,
      birthday: values.birthday // 如果需要，可以用 new Date(values.birthday).toISOString()
    };
    console.log(payload);

    const { error, message } = await getSigninData(payload); // ✅ 呼叫 API 傳值
    isLoading.value = false; // 隱藏 loading
    if (error) {
      toast.add({
        severity: "error",
        summary: "註冊失敗",
        detail: message,
        life: 3000,
      });
    } else {
      toast.add({
        severity: "success",
        summary: "註冊成功",
        life: 3000,
      });
      // ✅ 清空表單資料
      Object.assign(initialValues, {
        email: "",
        password: "",
        username: "",
        fullname: "",
        birthday: "",
        ingredient: "",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    }
  }else{
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