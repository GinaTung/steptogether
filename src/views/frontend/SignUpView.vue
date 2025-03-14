<template>
  <div class="container mx-auto md:h-screen flex justify-center items-center">
    <div class="flex flex-col md:flex-row gap-4 bg-[rgba(208,214,221,0.15)] p-2 rounded-xl">
      <Card class="md:basis-1/2 flex-sm-hide">
        <template #header>
          <h2 class="font-black p-4 text-2xl">StepTogether</h2>
        </template>
        <template #content>
          <img
            class="object-cover w-7/8 mx-auto"
            style="max-height: 850px"
            src="/src/assets/images/login-social-img.jpg"
            alt="user header"
          />
        </template>
      </Card>
      <Card class="md:basis-1/2 flex justify-center">
        <template #header>
          <h2 class="font-black p-4 text-2xl text-center md:hidden">StepTogether</h2>
          <img
            class="object-cover w-1/2 mx-auto socialImg"
            style="max-height: 250px"
            src="/src/assets/images/login-social-img.jpg"
            alt="user header"
          />
        </template>
        <template #title>
          <h1 class="font-black text-center text-3xl mb-5">Create your free account</h1>
        </template>
        <template #content>
          <div class="card flex justify-center">
            <Toast />

            <Form
              v-slot="$form"
              :initialValues="initialValues"
              :resolver="resolver"
              @submit="onFormSubmit"
              class="flex flex-col gap-4 w-full sm:w-80"
            >
            <Button
              type="submit"
              class="rounded-lg text-black py-2 text-xl bg-white border-2 border-black transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-[#272F43] hover:text-white"
              unstyled
            >
              <i class="pi pi-google me-2"></i>Google
            </Button>
            <div class="flex items-center gap-2">
                <span class="flex-1 border-t border-gray-300"></span>
                <span class="text-gray-500">Or login with</span>
                <span class="flex-1 border-t border-gray-300"></span>
              </div>
              <div class="flex flex-col gap-1">
                <InputText name="email" type="text" placeholder="Email" fluid />
                <Message
                  v-if="$form.email?.invalid"
                  severity="error"
                  type="email"
                  size="small"
                  variant="simple"
                  style="height: 20px"
                  >{{ $form.email.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col gap-1 relative">
                <InputText
                  name="password"
                  :type="passwordVisible ? 'text' : 'password'"
                  placeholder="Password"
                  fluid
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2"
                  @click="togglePasswordVisibility"
                  :class="{ 'pb-2': $form.password?.invalid }"
                >
                  <i :class="passwordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                </button>
                <Message
                  v-if="$form.password?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  style="height: 20px"
                  >{{ $form.password.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col gap-1">
                <InputText name="fullname" type="text" placeholder="Fullname" fluid />
                <Message
                  v-if="$form.fullname?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  style="height: 20px"
                  >{{ $form.fullname.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col gap-1">
                <InputText name="username" type="text" placeholder="Username" fluid />
                <Message
                  v-if="$form.username?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  style="height: 20px"
                  >{{ $form.username.error?.message }}</Message
                >
              </div>
              <div class="flex flex-col gap-1">
                <InputText name="birthday" type="text" placeholder="西元年月日 Ex:20250311" fluid />
                <Message
                  v-if="$form.birthday?.invalid"
                  severity="error"
                  type="date"
                  size="small"
                  variant="simple"
                  style="height: 20px"
                  >{{ $form.birthday.error?.message }}</Message
                >
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
                <Message
                  v-if="$form.ingredient?.invalid"
                  severity="error"
                  size="small"
                  variant="simple"
                  >{{ $form.ingredient.error?.message }}</Message
                >
              </div>
              <Button
                type="submit"
                class="rounded-lg text-white py-2 text-xl bg-[#DF4927] border-2 border-transparent hover:bg-gradient-to-r hover:from-[#272F43] hover:to-[#1B2230] transition-all duration-300"
                label="Sign me up !"
                unstyled
              />
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

const router = useRouter();
const toast = useToast();
const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
const initialValues = reactive({
  email: "",
  password: "",
  username:"",
  fullname:"",
  birthday:"",
  ingredient: "",
});

const resolver = ({ values }) => {
  const errors = {};

  // Username validation
  if (!values.username) {
    errors.username = [{ message: "Username is required." }];
  }
  if (!values.fullname) {
    errors.fullname = [{ message: "Fullname is required." }];
  }
  if (!values.birthday) {
    errors.birthday = [{ message: "Birthday is required." }];
  }
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
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = [{ message: "Password must contain at least one special character." }];
    }
  }
  if (!values.ingredient) {
    errors.ingredient = [{ message: "Ingredient is required." }];
  }

  return {
    values,
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "註冊成功，將跳轉至登入頁面",
      life: 3000,
    });

    // 延遲導航，讓 Toast 有時間顯示
    setTimeout(() => {
      router.push("/login"); // 跳轉到登入頁面
    }, 1500);
  }
};
</script>
<style scoped>
  .flex-sm-hide{
    display: none;
  }
@media(min-width: 768px){
  .flex-sm-hide{
    display: block;
  }
}
.socialImg {
  display: block;
}
@media(min-width: 768px){
  .socialImg {
  display: none !important;
}
}
</style>