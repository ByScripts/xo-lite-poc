import { defineStore } from "pinia";
import type { XenApiHostCpu } from "@/libs/xen-api";
import { createRecordContext } from "@/stores/index";

export const useHostCpuStore = defineStore("host-cpu", () =>
  createRecordContext<XenApiHostCpu>("host_cpu")
);
