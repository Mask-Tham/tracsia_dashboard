<template>
  <vue-apex-charts type="line" :height="heights" :options="options" :series="series" />
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  props: {
    series: { type: Array, default: [] },
    options: { type: Object, default: {} },
    heights: { type: Number, default: 0 },
  },
  components: {
    VueApexCharts,
  },
  setup() {
    return {}
  },
}
</script>
