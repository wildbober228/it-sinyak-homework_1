import { makeAutoObservable } from "mobx";

import type { ServerStatus, TaskResult } from "~/App/types";

class ServerStore {
  status: ServerStatus = "idle";
  connectingSince = 0;
  connection: Promise<TaskResult> | null = null;

  constructor() {
    makeAutoObservable(this, { connection: false });
  }

  connect(connection: Promise<TaskResult>) {
    this.connection = connection;
    this.connectingSince = Date.now();
    this.status = "connecting";

    return connection;
  }

  setStatus(status: ServerStatus) {
    this.status = status;
  }

  disconnect() {
    this.connection = null;
    this.status = "down";
  }
}

export const serverStore = new ServerStore();
