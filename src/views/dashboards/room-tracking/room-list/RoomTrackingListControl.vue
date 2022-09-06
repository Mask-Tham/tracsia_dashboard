<template>
  <v-card>
    <v-card-text>
      <v-img src="@/assets/images/map/room-list.png"></v-img>
    </v-card-text>
    <v-card-title class="ml-5 text-h5 font-weight-bold text-capitalize"> control </v-card-title>
    <v-card-text>
      <!-- <v-chip class="ma-2 font-weight-bold text-capitalize" color="primary" label x-large> control </v-chip> -->
      <v-row>
        <v-col v-for="(device, device_i) in devices" :key="device_i" cols="auto" >
          <room-tracking-list-card-device :device="device"></room-tracking-list-card-device>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import RoomTrackingListCardDevice from './RoomTrackingListCardDevice.vue'
import { mdiSpeaker, mdiTelevision, mdiLightbulbOn10,mdiLightbulb ,mdiCalendarWeek } from '@mdi/js'

export default {
  components: { RoomTrackingListCardDevice },
  data() {
    return {
      devices: [
        { icon: mdiSpeaker, name: 'name device1', status: true },
        { icon: mdiTelevision , name: 'name device2', status: true },
        { icon: mdiCalendarWeek , name: 'name device3', status: true },
      ],
    }
  },
}
</script>

<style></style>
