<template>
  <UiCard class="pool-vms-view">
    <VmsActionsBar :selected-refs="selectedVmsRefs" />
    <CollectionTable
      :available-filters="filters"
      :collection="vms"
      v-model="selectedVmsRefs"
    >
      <template #header>
        <th>
          <FontAwesomeIcon :icon="faPowerOff" />
        </th>
        <th>Name</th>
      </template>
      <template #row="{ item: vm }">
        <td>
          <PowerStateIcon :state="vm.power_state" />
        </td>
        <td>{{ vm.name_label }}</td>
      </template>
    </CollectionTable>
  </UiCard>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import type { Filters } from "@/types/filter";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import CollectionTable from "@/components/CollectionTable.vue";
import PowerStateIcon from "@/components/PowerStateIcon.vue";
import UiCard from "@/components/ui/UiCard.vue";
import VmsActionsBar from "@/components/vm/VmsActionsBar.vue";
import type { XenApiVm } from "@/libs/xen-api";
import { useVmStore } from "@/stores/vm.store";

const vmStore = useVmStore();
const { allRecords: vms } = storeToRefs(vmStore);

const filters: Filters<XenApiVm> = {
  name_label: { title: "VM Name", type: "string" },
  power_state: {
    title: "VM State",
    icon: faPowerOff,
    type: "enum",
    choices: ["Running", "Halted", "Paused"],
  },
};

const selectedVmsRefs = ref([]);
</script>

<style scoped></style>
