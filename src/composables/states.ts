import { ref, Ref, watch } from "vue";

function storeLocal<T>(key: string, variable: Ref<T>) {
  const localStorageItem = localStorage.getItem(key);
  if (localStorageItem !== null) {
    variable.value = JSON.parse(localStorageItem);
  }

  watch(
    () => variable,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value.value));
    },
    { deep: true }
  );

  return variable;
}

export const cart = storeLocal("focusCart", ref([]));

export const isMobile = ref(false);

export const showSidebar = ref(false);
