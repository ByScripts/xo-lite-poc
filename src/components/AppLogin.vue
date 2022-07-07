<template>
  <div class="app-login form-container">
    <form @submit.prevent="handleSubmit">
      <img alt="XO Lite" src="../assets/logo.png" />
      <h1>Xen Orchestra Lite</h1>
      <input v-model="login" name="login" readonly type="text" />
      <input
        v-model="password"
        name="password"
        placeholder="Password"
        type="password"
      />
      <input type="submit" value="Login" @disabled="xenApiStore.isConnecting" />
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useXenApiStore } from "@/stores/xen-api.store";

const xenApiStore = useXenApiStore();
const login = ref("root");
const password = ref("");

async function handleSubmit() {
  await xenApiStore.connect(login.value, password.value);
}
</script>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  height: 100vh;
  background-color: var(--background-color-primary);
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 0 0 8.5rem 0;
  background-color: var(--background-color-secondary);
}

h1 {
  font-size: 900;
  font-size: 4.8rem;
  line-height: 7.2rem;
  margin-bottom: 4.2rem;
}

img {
  width: 60rem;
}

label {
  font-size: 120%;
  font-weight: bold;
  margin: 1.5rem 0 0.5rem 0;
}

input {
  width: 45rem;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  border: 1px solid var(--color-blue-scale-400);
  border-radius: 0.8rem;
  background-color: white;
}

input[type="submit"] {
  width: 10rem;
  margin: 2rem 0rem;
  margin: 0;
  color: var(--color-blue-scale-500);
  border: none;
  background-color: var(--color-extra-blue-base);
}
</style>
