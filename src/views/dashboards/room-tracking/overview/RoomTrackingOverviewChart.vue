<template>
  <v-card>
    <v-card-title class="">
      <p>Meeting Room Visualization</p>
      <v-spacer></v-spacer>
      <div style="max-width: 120px">
        <v-select
          v-model="select"
          :items="items"
          label=""
          item-text="state"
          item-value="abbr"
          hide-details
          dense
          outlined
        ></v-select>
      </div>
    </v-card-title>
    <v-card-text>
      <apex-chart-bar :series="series" :options="chartOptions"></apex-chart-bar>
    </v-card-text>
  </v-card>
</template>

<script>
import ApexChartBar from '@/views/components/chart/apex-chart/ApexChartBar.vue'
export default {
  components: { ApexChartBar },
  data() {
    return {
      select: { state: 'Day', abbr: 'Day' },
      items: [
        { state: 'Day', abbr: 'Day' },
        { state: 'Month', abbr: 'Month' },
        { state: 'Year', abbr: 'Year' },
      ],
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
          title: {
            text: '$ (thousands)',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands'
            },
          },
        },
      },
    }
  },
}
</script>

<style></style>
