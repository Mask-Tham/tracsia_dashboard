<template>
  <v-card style="width: 100%">
    <v-card-title>
      <v-row>
        <v-col class="tw-uppercase">{{ items.name }}</v-col>
        <v-col class="d-flex justify-end" style="gap: 10px">
          <div
            :style="{ background: '#6DD981', color: '#fff !important', 'border-radius': '5px' }"
            style="display: flex; gap: 5px"
            class="pa-1"
          >
            <v-icon size="20" :style="{ color: '#fff  !important' }">
              {{ icons.mdiAccountOutline }}
            </v-icon>
            <span>{{ items.workers.length }}</span>
          </div>
          <div
            :style="{ background: '#6DD981', color: '#fff !important', 'border-radius': '5px' }"
            style="display: flex; gap: 5px"
            class="pa-1"
          >
            <v-icon size="20" :style="{ color: '#fff  !important' }">
              {{ icons.mdiInboxMultipleOutline }}
            </v-icon>
            <span>{{ items.pallets.length }}</span>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <div class="pa-2">
      <v-row class="ma-0">
        <div class="d-flex flex-column align-center justify-center ma-1" v-for="(item, i) in items.workers" :key="i">
          <v-icon size="30">
            {{ icons.mdiAccountOutline }}
          </v-icon>
          <span>{{ item.name }}</span>
        </div>
      </v-row>
      <br v-if="items.workers>0">
      <v-row class="ma-0">
        <div class="d-flex flex-column align-center justify-center ma-1" v-for="(item, i) in items.pallets" :key="i">
          <v-icon size="30">
            {{ icons.mdiInboxMultipleOutline }}
          </v-icon>
          <span>{{ item.name }}</span>
        </div>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiInboxMultipleOutline } from '@mdi/js';
export default {
  props: {
    items: Object,
  },
  data() {
    return {
      icons: {
        mdiAccountOutline,
        mdiInboxMultipleOutline,
      },
    }
  },
}
</script>

<style></style>
