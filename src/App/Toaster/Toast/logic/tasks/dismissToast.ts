import { toastStore } from "~/App/logic/toastStore";

export function dismissToast(id: number) {
  toastStore.remove(id);
}
