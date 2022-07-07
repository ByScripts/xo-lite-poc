<template>
  <div>
    <AppHeader />

    <div style="display: flex">
      <nav class="nav">
        <InfraPoolList />
      </nav>
      <main class="main">
        <form class="form" style="width:40rem; margin: 0 auto">

          <label class="form-control ">
            <span>Aimez-vous les petits pois ?</span>
            <FontAwesomeIcon :icon="faServer" class="prepend" />
            <input type="text" name="petits_pois">
            <FontAwesomeIcon :icon="faPlay" class="append" />
          </label>


          <label class="form-control ">
            <span>Aimez-vous les petits pois ?</span>
            <input type="text" name="petits_pois">
            <FontAwesomeIcon :icon="faMoon" class="append" />
          </label>

          <label class="form-control ">
            <span>Aimez-vous les petits pois ?</span>
            <FontAwesomeIcon :icon="faDisplay" class="prepend" />
            <input type="text" name="petits_pois">
          </label>
          <label class="form-control ">
            <span>Aimez-vous les petits pois ?</span>
            <input type="text" name="petits_pois">
          </label>

          <label class="form-control inline">
            <input type="checkbox" name="checkbox" />
            <span>Checkbox</span>
          </label>

          <label class="form-control inline">
            <span>Checkbox</span>
            <input type="checkbox" name="checkbox" />
          </label>

          <label class="form-control inline">
            <input type="checkbox" name="checkbox-checked" checked />
            <span>Checkbox checked </span>
          </label>

          <label class="form-control">
            <span>Aimez-vous les petits pois ?</span>
            <select>
              <option value="1">un</option>
              <option value="2">deux</option>
              <option value="3">trois</option>
              <option value="4">quatre</option>

            </select>
          </label>
          <label class="form-control inline">
            <span>Combien de petits pois ?</span>
            <select>
              <option value="1">un</option>
              <option value="2">deux</option>
              <option value="3">trois</option>
              <option value="4">quatre</option>

            </select>
          </label>

          <label class="form-control inline">
            <span>Aimez-vous les petits pois en ligne </span>
            <input type="text" name="petits_pois">
            <FontAwesomeIcon :icon="faMoon" class="append" />
          </label>
          <label class="form-control">
            <span>Décrivez votre amour des petits pois </span>
            <textarea></textarea>
          </label>

          <input type="submit" value="submit " class="form-control" />
          <button class="form-control">button</button>
          <button class="form-control inverse">button</button>

        </form>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import AppHeader from '@/components/AppHeader.vue';
  import InfraPoolList from '@/components/infra/InfraPoolList.vue';
  import { useXenApiStore } from '@/stores/xen-api.store';
  import { faDisplay,faMoon, faPlay,  faServer } from '@fortawesome/free-solid-svg-icons';

  const xenApiStore = useXenApiStore();
  xenApiStore.init();

</script>

<style lang="postcss">
  @import '@/assets/base.css';
  @import '@/assets/form.postcss';

  .nav {
    overflow: auto;
    width: 37rem;
    max-width: 37rem;
    height: calc(100vh - 8rem);
    padding: 0.5rem;
    background-color: var(--background-color-primary);
    border-right: 1px solid var(--color-blue-scale-400);
  }

  .main {
    flex: 1;
    background-color: var(--background-color-secondary);
  }
</style>
