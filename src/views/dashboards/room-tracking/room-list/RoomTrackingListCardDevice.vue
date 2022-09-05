<template>
  <v-card class="d-flex">
    <v-card-title>
      <!-- <v-icon>{{ icons[device.icon] }}</v-icon> -->
      <v-icon>{{ device.icon }}</v-icon>

    </v-card-title>
    <!-- <pre>{{icons}}</pre> -->
    <!-- <pre>{{device.icon}}</pre> -->
    <v-card-text class="pt-5 font-weight-bold text-capitalize"> {{ device.name }} </v-card-text>
    <v-card-text>
      <v-switch v-model="device.status" hide-details></v-switch>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiSpeaker, mdiTelevision, mdiLightbulbOn10,mdiLightbulb ,mdiCalendarWeek } from '@mdi/js'

export default {
  props: {
    device: Object,
  },
  setup() {
    return {
      icons: {
        mdiSpeaker,
        mdiTelevision,
        mdiCalendarWeek,
      },
    }
  },
  data() {
    return {
      // icons: {
      //   Speaker:mdiSpeaker,
      //   Television:mdiTelevision,
      //   CalendarWeek:mdiCalendarWeek,
      // },
    }
  },
}
</script>

<style></style>
