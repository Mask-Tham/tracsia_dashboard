<script>
// import { Scatter } from 'vue-chartjs'
import { Scatter } from 'vue-chartjs/legacy'

export default {
  extends: Scatter,
  props: {
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    plugins: {
      type: Array,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.data, this.options, this.plugins)
  },
}
</script>
