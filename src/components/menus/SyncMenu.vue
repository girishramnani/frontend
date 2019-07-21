<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <div>
      <div class="side-bar__info">
        <menu-entry @click.native="requestSync">
          <icon-sync slot="icon"></icon-sync>
          <div>Synchronize now</div>
          <span>Download / upload file changes.</span>
        </menu-entry>
        <menu-entry @click.native="manageSync">
          <icon-view-list slot="icon"></icon-view-list>
          <div><div class="menu-entry__label menu-entry__label--count"></div> File synchronization</div>
          <span>Manage synchronized path for {{currentFileName}}.</span>
        </menu-entry>
      </div>
      <hr>
      <hr>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MenuEntry from './common/MenuEntry';
import syncSvc from '../../services/syncSvc';
import store from '../../store';


export default {
  components: {
    MenuEntry,
  },
  computed: {
    ...mapState('queue', [
      'isSyncRequested',
    ]),
    ...mapGetters('workspace', [
      'syncToken',
    ]),
    ...mapGetters('file', [
      'isCurrentTemp',
    ]),
    ...mapGetters('syncLocation', {
      syncLocations: 'currentWithWorkspaceSyncLocation',
    }),
    locationCount() {
      return Object.keys(this.syncLocations).length;
    },
    currentFileName() {
      return `"${store.getters['file/current'].name}"`;
    },
  },
  methods: {
    requestSync() {
      if (!this.isSyncRequested) {
        syncSvc.requestSync(true);
      }
    },
    async manageSync() {
      try {
        await store.dispatch('modal/open', 'syncManagement');
      } catch (e) { /* cancel */ }
    },
  },
};
</script>
