<template>
  <v-card>
    <v-card-title class="pa-3 pb-0"> {{$tc('healthcare.location',2)}} </v-card-title>
    <v-card-text class="pa-3">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" />
        <l-feature-group >
        <l-circle  :lat-lng="circle.center" :radius="circle.radius" :color="circle.color" :key="'a'">
        </l-circle>
        <l-tooltip>
          <div style="background: #407;color:#fff">

          Hello!
          </div>
          </l-tooltip>
        </l-feature-group>
        <!-- <l-feature-group > -->

        <l-circle  :lat-lng="[13.8558954, 100.5545989]" :radius="circle.radius" :color="circle.color" :key="'b'">
        </l-circle>
        <!-- </l-feature-group> -->
      </l-map>
    </v-card-text>
  </v-card>
</template>

<script>
import { LMap, LTileLayer, LCircle,LCircleMarker,LTooltip,LFeatureGroup } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    LMap,
    LTileLayer,
    LCircle,
    LCircleMarker,
    LTooltip,
    LFeatureGroup,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [13.8069954, 100.5545989],
      circle: {
        center: [13.8069954, 100.5545989],
        radius: 200,
        color: '#EA5455',
      },
    }
  },
}
</script>

<style lang="scss">
.vue2leaflet-map {
  &.leaflet-container {
    height: 350px;
  }
}
</style>
