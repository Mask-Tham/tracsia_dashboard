<script>
// import { Doughnut } from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs/legacy'

export default {
  extends: Doughnut,
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
