<script>
// import { Radar } from 'vue-chartjs'
import { Radar } from 'vue-chartjs/legacy'

export default {
  extends: Radar,
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
