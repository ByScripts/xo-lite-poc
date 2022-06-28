<template>
  <RouterLink v-slot="{ isActive, href, navigate }" :to="route" class="infra-item-label" custom>
    <div :class="{ current: isActive || $props.current }" class="infra-item-label" v-bind="$attrs">
      <a :href="href" class="link" @click="navigate">
        <FontAwesomeIcon :icon="icon" class="icon" />
        <div class="text">
          <slot />
        </div>
      </a>
      <div class="actions">
        <slot name="actions" />
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
  import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
  import type { RouteLocationRaw } from 'vue-router';

  defineProps<{
    icon: IconDefinition
    route: RouteLocationRaw
    current?: boolean
  }>();
</script>

<style lang="scss" scoped>
  .infra-item-label {
    display: flex;
    align-items: stretch;
    height: 6rem;
    margin-bottom: 0.2rem;
    color: var(--color-blue-scale-100);
    border-radius: 0.8rem;
    background-color: var(--background-color-primary);

    &:hover {
      color: var(--color-blue-scale-100);
      background-color: var(--background-color-secondary);
    }

    &:active {
      color: var(--color-extra-blue-base);
      background-color: var(--background-color-primary);
    }

    &.current {
      color: var(--color-blue-scale-100);
      background-color: var(--background-color-extra-blue);

      .icon {
        color: var(--color-extra-blue-base);
      }
    }
  }

  .link {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 1.5rem;
    text-decoration: none;
    color: inherit;
    gap: 1rem;
    min-width: 0;
  }

  .text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

    .actions {
      display: flex;
      align-items: center;
    }
</style>