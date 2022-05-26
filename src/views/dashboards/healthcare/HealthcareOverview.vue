<template>
  <div>
    <v-row>
      
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="pa-3 pb-0"> {{ $tc('healthcare.location', 2) }} </v-card-title>
              <v-card-text class="pa-3">
                <l-map style="height: 200px;z-index:0" :zoom="zoom" :center="center">
                  <l-tile-layer :url="url"></l-tile-layer>
                  <!-- <l-marker :lat-lng="markerLatLng"></l-marker> -->
                  <l-circle-marker :lat-lng="markerLatLng" :radius="10" :color="'#f00'" />
                </l-map>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="pa-3 pb-0"> {{ $tc('healthcare.fever trend', 2) }}</v-card-title>
              <v-card-text>
                <div style="position: relative; height: min-content">
                  <div
                    v-for="(item, item_i) in patients"
                    :key="item_i"
                    style="position: absolute; display:flex;align-items: center;justify-content: center;}"
                    :style="{
                      top: 19 + Math.floor(item.bed / 6) * 55 + '%',
                      left: 17 + ((item.bed - 1) % 6) * 10.5 + '%',
                    }"
                  >
                    <v-avatar :style="{ border: '1px solid #0ff' }" @click="goto(item)">
                      <img :src="require(`@/assets/images/avatars/${item_i + 1}.png`)" alt="avatar" />
                    </v-avatar>
                  </div>
                  <img src="@/assets/images/healthcare/bed.png" width="100%" alt="" />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="pa-3 pb-0 d-flex justify-space-between">
                <div>{{ $tc('healthcare.fever trend', 2) }}</div>
                <div>
                  <v-select
                    v-model="select"
                    :items="items"
                    item-text="text"
                    item-value="value"
                    label="Solo field"
                    solo
                    dense
                    hide-details
                    style="width:200px"
                    @change="genDataChart"
                  ></v-select>
                </div>
              </v-card-title>
              <v-card-text>
                <chartjs-component-line-chart :data="chartData" :options="chartOptions" :height="200" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <healthcare-overall />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HealthcareOverall from './HealthcareOverall.vue'
import ChartjsComponentLineChart from '@/views/charts-and-maps/charts/chartjs/charts-components/ChartjsComponentLineChart.vue'

import { LMap, LTileLayer, LCircle, LCircleMarker, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    HealthcareOverall,
    LMap,
    LTileLayer,
    LCircle,
    LCircleMarker,
    LMarker,
    ChartjsComponentLineChart,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [13.8069954, 100.5545989],
      markerLatLng: [13.8069954, 100.5545989],
      circle: {
        center: [13.8069954, 100.5545989],
        radius: 200,
        color: '#EA5455',
      },
      patients: [
        {
          name: '',
          id: '001',
          status: 0,
          bed: 1,
        },
        {
          name: '',
          id: '002',
          status: 1,
          bed: 3,
        },
        {
          name: '',
          id: '003',
          status: 0,
          bed: 5,
        },
        {
          name: '',
          id: '004',
          status: 0,
          bed: 7,
        },
      ],
      chartData: {
        labels: ['0', '1', '2'],
        datasets: [{ label: 'Data One', backgroundColor: '#f87979', data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
      select: '5',
      items: [
        { text: '5', value: '5' },
        { text: '10', value: '10' },
        { text: '15', value: '15' },
      ],
    }
  },
  methods: {
    goto(item) {
      this.$router.push(`/dashboards/healthcare/${item.id}`)
    },
    genDataChart(){
      console.log('changdata');
      let labels = []
      let data = []
      console.log(this.select);
      for (let i = 0; i < this.select; i++) {
        labels.push(i.toString())
        data.push(Math.floor(Math.random() * 10))
      }
      console.log(labels);
      this.chartData.labels = labels
      this.chartData.datasets[0].data = data
    }
  },
  mounted() {
    this.genDataChart()
  },
}
</script>

<style></style>
