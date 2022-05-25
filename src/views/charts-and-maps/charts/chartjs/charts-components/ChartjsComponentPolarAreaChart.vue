<script>
// import { PolarArea } from 'vue-chartjs'
import { PolarArea } from 'vue-chartjs/legacy'

export default {
  extends: PolarArea,
  props: {
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
}
</script>
