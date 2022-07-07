import { defineStore } from "pinia";
import { ref } from "vue";

export const useUiStore = defineStore("ui", () => {
  const currentHostOpaqueRef = ref();
  const dropdownDepth = ref(0);

  return {
    currentHostOpaqueRef,
    dropdownDepth,
  };
});
