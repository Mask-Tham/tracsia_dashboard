<template>
  <v-row>
    <v-col cols="12"><span>name room</span></v-col>
    <v-col cols="12">
      <v-card>
        <v-card-text class="d-flex">
          <v-img src="@/assets/images/svg/25.png" max-width="100" max-height="100"></v-img>
          <div>
            <ul style="list-style-type: none">
              <li class="pa-1">
                <span class="text-capitalize mr-2">name</span>
                <span>name room</span>
              </li>
              <li class="pa-1">
                <span class="text-capitalize mr-2">priority level</span>
                <span>low priority</span>
              </li>
              <li class="pa-1">
                <span class="text-capitalize mr-2">environment status</span>
                <span>good</span>
              </li>
              <li class="pa-1">
                <span class="text-capitalize mr-2">total asset </span>
                <span>20 item</span>
              </li>
            </ul>
          </div>
        </v-card-text>
        <v-card-text class="pa-0">
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="(item, item_i) in items_tab" :key="item_i">
              <v-icon left> {{ item.icon }} </v-icon>
              {{ item.text }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <room-tracking-list-booking-tab-booking></room-tracking-list-booking-tab-booking>
            </v-tab-item>

            <v-tab-item> 2 </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiServer, mdiCalendarWeek } from '@mdi/js'
import RoomTrackingListBookingTabBooking from './RoomTrackingListBookingTabBooking.vue'

export default {
  components: { RoomTrackingListBookingTabBooking },
  data() {
    return {
      tab: null,
      items_tab: [
        {
          text: 'booking',
          icon: mdiServer,
        },
        // {
        //   text: 'consumption',
        //   icon: mdiCalendarWeek,
        // },
      ],
    }
  },
}
</script>

<style></style>
