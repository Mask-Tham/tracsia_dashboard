<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :ref="'line-chart-' + chartId"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
// import { Line } from 'vue-chartjs'
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement)

export default {
  // extends: LineChartGenerator,
  name: 'line-chart',
  components: { LineChartGenerator },
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    // plugins: {
    //   type: Array,
    //   default: null,
    // },
    // styles: {
    //   type: Object,
    //   default: null,
    // },
  },
  computed: {
    chartData() {
      console.log(this.data);
      return this.data /* mutable chart data */
    },
    chartOptions() {
      return this.options /* mutable chart options */
    },
  },
  mounted() {
  },
  // watch: {
  //   'data.labels': {
  //     // watch it
  //     handler(newValue, oldValue) {
  //       // console.log('redraw chart',this.chartdata);
  //       console.log(newValue, oldValue);
  //       // this.render();
  //       this.$refs['line-chart-' + this.chartId].updateChart()

  //       // Note: `newValue` will be equal to `oldValue` here
  //       // on nested mutations as long as the object itself
  //       // hasn't been replaced.
  //     },
  //     deep: true,
  //   },
  //   options: {
  //     // watch it
  //     handler(newValue, oldValue) {
  //       // console.log('redraw chart',this.chartdata);
  //       // console.log(newValue, oldValue);
  //       // this.render();
  //       this.$data._chart.options = this.options
  //       this.$data._chart.update()

  //       // Note: `newValue` will be equal to `oldValue` here
  //       // on nested mutations as long as the object itself
  //       // hasn't been replaced.
  //     },
  //     deep: true,
  //   },
  // },
}
</script>
