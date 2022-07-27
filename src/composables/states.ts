import { ref, Ref, watch } from "vue";
import { Address, Order } from "@/interfaces";

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

export interface CartItem {
  id: string;
  name: string;
  image: string;
  choices: Record<string, string>;
  unitPrice: number;
  quantity: number;
}

export interface Measurements {
  height: string;
  weight: string;
  chest: string;
}

export const cart = storeLocal("focusCart", ref([] as Array<CartItem>));

export interface Profile {
  username: string;
  addresses: Array<Address>;
  measurements: Measurements;
  orders?: Array<Order>;
}

export const profile = storeLocal("focusProfile", ref({} as Profile));

if (!profile.value.measurements)
  profile.value.measurements = {} as Measurements;
if (!profile.value.addresses) profile.value.addresses = [{} as Address];

export const isMobile = ref(false);

export const showSidebar = ref(false);
