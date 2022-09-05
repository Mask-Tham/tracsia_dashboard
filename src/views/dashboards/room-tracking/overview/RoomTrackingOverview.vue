<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <analytics-congratulation-john></analytics-congratulation-john>
      </v-col>
      <v-col cols="12" md="8">
        <analytics-statistics-card></analytics-statistics-card>
      </v-col>
      <v-col cols="12">
        <room-tracking-overview-chart></room-tracking-overview-chart>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title> Booking Status </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab v-for="item in items_tab" :key="item.text">
                <v-icon left> {{ item.icon }} </v-icon>
                {{ item.text }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <room-tracking-overview-booking-general></room-tracking-overview-booking-general>
              </v-tab-item>
              <v-tab-item>
                <room-tracking-overview-booking-log></room-tracking-overview-booking-log>
              </v-tab-item>
              <!-- <v-tab-item>
                <v-card flat>
                  <v-card-text> test </v-card-text>
                </v-card>
              </v-tab-item> -->
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiServer, mdiFormatListBulleted, mdiAlert } from '@mdi/js'
import AnalyticsCongratulationJohn from './AnalyticsCongratulationJohn.vue'
import AnalyticsStatisticsCard from './AnalyticsStatisticsCard.vue'
import RoomTrackingOverviewChart from './RoomTrackingOverviewChart.vue'
import RoomTrackingOverviewBookingGeneral from './RoomTrackingOverviewBookingGeneral.vue'
import RoomTrackingOverviewBookingLog from './RoomTrackingOverviewBookingLog.vue'

export default {
  components: {
    AnalyticsCongratulationJohn,
    AnalyticsStatisticsCard,
    RoomTrackingOverviewChart,
    RoomTrackingOverviewBookingGeneral,
    RoomTrackingOverviewBookingLog,
  },
  data() {
    return {
      tab: 1,
      items_tab: [
        {
          text: 'ganeral',
          icon: mdiServer,
        },
        {
          text: 'activity log',
          icon: mdiFormatListBulleted,
        },
        // {
        //   text: 'alert',
        //   icon: mdiAlert,
        // },
      ],
    }
  },
}
</script>

<style></style>
