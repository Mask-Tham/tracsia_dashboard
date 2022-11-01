<template>
  <v-card>
    <v-card-title class="justify-center flex-column pb-2">
      <v-avatar
        :color="item.picture ? '' : 'primary'"
        :class="item.picture ? '' : 'v-avatar-light-bg primary--text'"
        size="120"
        rounded
        class="mb-4"
      >
        <v-img v-if="item.picture" :src="require(`@/assets/images/avatars/${item.picture}`)"></v-img>
        <span v-else class="font-weight-semibold text-5xl">{{ avatarText(item.name) }}</span>
      </v-avatar>

      <span class="mb-0 text-subtitle-1">{{ item.name }}</span>
    </v-card-title>
    <v-card-text class="d-flex flex-column">
      <span class="text-Caption">last location : {{ item.lastLocation }}</span>
      <span class="text-Caption">last timestamp : {{ item.lastTimestamp }}</span>
    </v-card-text>

    <v-card-text class="d-flex justify-center">
      <v-chip class="ma-2 text-capitalize" :color="item.status ? 'primary':'nvm ls'">
        {{ item.status ? 'available' : 'bussy' }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
import { avatarText, kFormatter } from '@core/utils/filter'
export default {
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    avatarText: avatarText,
  },
}
</script>

<style></style>
