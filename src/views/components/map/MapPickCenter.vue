<template>
  <l-map
    style="height: 100%; width: 100%;z-index:0"
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
  <l-marker :lat-lng="center"></l-marker>
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
  </l-map>
</template>

<script>
import { LMap, LTileLayer,LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props:{
    centerProp:{
      type:Array,
      default:() => [13.8088364,100.5532687]
    }
  },
   model: {
      prop: 'center',
      event: 'blur'
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 13,
      center: this.centerProp,
      bounds: null,
    }
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = [center.lat,center.lng]
      this.$emit('blur', this.center)
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    },
  },
}
</script>

<style></style>
