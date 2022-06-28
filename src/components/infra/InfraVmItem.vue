<template>
  <li class="infra-vm-item">
    <InfraItemLabel
      :icon="faDisplay"
      :route="{ name: 'vm.console', params: { ref: vmRef} }"
    >
      {{ vm.name_label }}
      <template #actions>
        <InfraAction :class="powerStateClass" :icon="powerStateIcon" />
      </template>
    </InfraItemLabel>
  </li>
</template>

<script lang="ts" setup>
  import InfraAction from '@/components/infra/InfraAction.vue';
  import InfraItemLabel from '@/components/infra/InfraItemLabel.vue';
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { faDisplay, faMoon, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
  import { computed } from 'vue';

  const props = defineProps<{
    vmRef: string
  }>();

  const xenApiStore = useXenApiStore();

  const vm = computed(() => xenApiStore.vmByRef(props.vmRef));

  const powerStateIcon = computed(() => {
    switch (vm.value?.power_state) {
      case 'Running':
        return faPlay;
      case 'Paused':
        return faPause;
      case 'Suspended':
        return faMoon;
      default:
        return faStop;
    }
  });

  const powerStateClass = computed(() => vm.value?.power_state.toLocaleLowerCase());
</script>

<style lang="scss" scoped>
  .infra-action {
    color: var(--color-extra-blue-d60);

    &.running {
      color: var(--color-green-infra-base);
    }

    &.paused {
      color: var(--color-blue-scale-300);
    }

    &.suspended {
      color: var(--color-extra-blue-d20);
    }
  }
</style>