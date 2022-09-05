<template>
  <v-card>
    <v-card-title>
      <v-icon>{{ icons.mdiHospitalBuilding }}</v-icon>
      <span class="ml-2">Name Building</span>
    </v-card-title>
    <v-card-text class="pl-0 pr-0">
      <v-list>
        <v-list-item-group v-model="model" mandatory color="indigo">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-img src="@/assets/images/svg/25.png" max-width="100" max-height="100"> </v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Name room</v-list-item-title>
              <v-list-item-title>
                <v-chip class="ma-2" color="#12B287" text-color="white" label> 4 Seat </v-chip>
                <span v-for="(device, device_i) in listDevice.slice(0, 2)" :key="device_i">
                  {{ device }}{{ device_i < listDevice.length - 1 ? ',' : '' }}
                </span>
                <span v-if="listDevice.length > 2">{{ listDevice.length - 2 }} more</span>
              </v-list-item-title>
              <v-list-item-title></v-list-item-title>
            </v-list-item-content>
            <v-btn
              class="ma-2 font-weight-bold text-capitalize"
              color="primary"
              text-color="white"
              label
              @click="gotoBooking"
            >
              booking
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiHospitalBuilding } from '@mdi/js'
export default {
  data() {
    return {
      icons: {
        mdiHospitalBuilding,
      },
      items: [
        {
          icon: 'mdi-wifi',
          text: 'Wifi',
        },
        {
          icon: 'mdi-bluetooth',
          text: 'Bluetooth',
        },
        {
          icon: 'mdi-chart-donut',
          text: 'Data Usage',
        },
      ],
      listDevice: ['TV', 'Projecter', 'a', 's', 'd'],
      model: 1,
    }
  },
  methods:{
    gotoBooking(){
      this.$router.push({name:'dashboard-room-tracking-list-booking'})
    },
  }
}
</script>

<style></style>
