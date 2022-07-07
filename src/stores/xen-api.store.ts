import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";
import { useLocalStorage } from "@vueuse/core";
import type { XenApiRecord } from "@/libs/xen-api";
import XenApi from "@/libs/xen-api";
import { useConsoleStore } from "@/stores/console.store";
import { useHostMetricsStore } from "@/stores/host-metrics.store";
import { useHostStore } from "@/stores/host.store";
import { usePoolStore } from "@/stores/pool.store";
import { useRecordsStore } from "@/stores/records.store";
import { useVmGuestMetricsStore } from "@/stores/vm-guest-metrics.store";
import { useVmMetricsStore } from "@/stores/vm-metrics.store";
import { useVmStore } from "@/stores/vm.store";

export const useXenApiStore = defineStore("xen-api", () => {
  const xenApi = new XenApi(import.meta.env.VITE_XO_HOST);
  const currentSessionId = useLocalStorage<string | null>("sessionId", null);
  xenApi.sessionId = currentSessionId.value ?? undefined;
  const isConnected = computed(() => currentSessionId.value !== null);
  const isConnecting = ref(false);

  async function getXapi() {
    if (!currentSessionId.value) {
      throw new Error("Not connected to xapi");
    }

    return xenApi;
  }

  async function init() {
    const poolStore = usePoolStore();
    await poolStore.init();

    const xapi = await getXapi();

    watchEffect(async () => {
      if (!poolStore.poolOpaqueRef) {
        return;
      }

      await xapi.injectWatchEvent(poolStore.poolOpaqueRef);

      xapi.registerWatchCallBack((results) => {
        const recordsStore = useRecordsStore();
        results.forEach((result) => {
          if (result.operation === "del") {
            recordsStore.removeRecord(result.class, result.ref);
          } else {
            recordsStore.addOrReplaceRecord(
              result.class,
              result.ref,
              result.snapshot as XenApiRecord
            );
          }
        });
      });
      xapi.startWatch();
    });

    const hostStore = useHostStore();
    const vmStore = useVmStore();

    await Promise.all([hostStore.init(), vmStore.init()]);

    const hostMetricsStore = useHostMetricsStore();
    const vmMetricsStore = useVmMetricsStore();
    const vmGuestMetricsStore = useVmGuestMetricsStore();

    await Promise.all([
      hostMetricsStore.init(),
      vmMetricsStore.init(),
      vmGuestMetricsStore.init(),
    ]);

    const consoleStore = useConsoleStore();
    consoleStore.init();
  }

  async function connect(login: string, password: string) {
    isConnecting.value = true;
    currentSessionId.value = await xenApi.connect(login, password);
    isConnecting.value = false;
  }

  function disconnect() {
    currentSessionId.value = null;
    xenApi.sessionId = undefined;
    xenApi.stopWatch();
  }

  return {
    isConnected,
    isConnecting,
    connect,
    disconnect,
    init,
    getXapi,
    currentSessionId,
  };
});
