<template>
  <div>
    <v-card>
      <v-card-title class="text-capitalize"> porter managemant </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3" lg="2" v-for="(item, item_i) in listPorterC" :key="item_i">
            <porter-tracking-card-porter :item="item"></porter-tracking-card-porter>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PorterTrackingCardPorter from './PorterTrackingCardPorter.vue'
export default {
  components: { PorterTrackingCardPorter },
  data() {
    return {
      listPorter: [
        { img: '', name: 'Name', lastLocation: 'location', lastTimestamp: 'timestamp', status: false },
        { img: '', name: 'Name', lastLocation: 'location', lastTimestamp: 'timestamp', status: false },
        { img: '', name: 'Name', lastLocation: 'location', lastTimestamp: 'timestamp', status: false },
        { img: '', name: 'Name', lastLocation: 'location', lastTimestamp: 'timestamp', status: false },
        { img: '', name: 'Name', lastLocation: 'location', lastTimestamp: 'timestamp', status: false },
        { img: '', name: 'Name', lastLocation: 'location', lastTimestamp: 'timestamp', status: false },
      ],
    }
  },
  computed: {
    listPorterC() {
      return this.listPorter
    },
  },
}
</script>

<style></style>
