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

export interface Address {
  fullName: string;
  street: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postal: string;
}

export interface Profile {
  username: string;
  addresses: Array<Address>;
}

export const profile = storeLocal(
  "focusProfile",
  ref({
    addresses: [{} as Address],
  } as Profile)
);

export const isMobile = ref(false);

export const showSidebar = ref(false);
