import { makeAutoObservable } from "mobx";

export class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}
