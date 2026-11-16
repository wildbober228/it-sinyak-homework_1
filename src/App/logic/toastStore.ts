import { makeAutoObservable } from "mobx";

import { MAX_TOASTS } from "~/App/constants";
import type { ToastEntry, ToastMessage } from "~/App/types";

class ToastStore {
  toasts: ToastEntry[] = [];

  private lastId = 0;

  constructor() {
    makeAutoObservable<this, "lastId">(this, { lastId: false });
  }

  push(message: ToastMessage) {
    this.lastId += 1;
    this.toasts = [...this.toasts, { ...message, id: this.lastId }].slice(
      -MAX_TOASTS,
    );
  }

  remove(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }
}

export const toastStore = new ToastStore();
