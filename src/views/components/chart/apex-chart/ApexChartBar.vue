<template>
  <vue-apex-charts
    type="bar"
    height="350"
    :options="options"
    :series="series"
  />
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  props: {
    series: { type: Array, default: [] },
    options: { type: Object, default: {} },
  },
  components: {
    VueApexCharts,
  },
  setup() {
    return {  }
  },
}
</script>
