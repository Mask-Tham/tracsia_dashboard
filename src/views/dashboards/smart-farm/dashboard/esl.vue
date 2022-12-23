<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-row class="match-height mb-3">
                    <v-col v-for="(item, i) in pallets" :key="i" class="pa-2">
                        <warehouse-card-pallet :item="item" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title class="pa-3 pb-0"> {{ $tc('healthcare.location', 2) }} </v-card-title>
                            <v-card-text class="pa-3">
                                <l-map style="height: 300px;z-index:0" :zoom="zoom" :center="center">
                                    <l-tile-layer :url="url"></l-tile-layer>
                                    <!-- <l-marker :lat-lng="markerLatLng"></l-marker> -->
                                    <l-circle-marker :lat-lng="markerLatLng" :radius="10" :color="'#f00'" />
                                </l-map>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12">
                        <dataTable />
                    </v-col>
                </v-row>
            </v-col>

        </v-row>
    </div>
</template>
  
<script>
//   import HealthcareOverall from './HealthcareOverall.vue'
import ChartjsComponentLineChart from '@/views/charts-and-maps/charts/chartjs/charts-components/ChartjsComponentLineChart.vue'

import 'leaflet/dist/leaflet.css'
import { LCircle, LCircleMarker, LMap, LMarker, LTileLayer } from 'vue2-leaflet'
import dataTable from './esl/table.vue'
import WarehouseCardPallet from './esl/WarehouseCardPallet.vue'
export default {
    components: {
        //   HealthcareOverall,
        LMap,
        LTileLayer,
        LCircle,
        LCircleMarker,
        LMarker,
        ChartjsComponentLineChart,
        WarehouseCardPallet,
        dataTable
    },
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 17,
            center: [13.68528740559085, 100.6113370260246],
            markerLatLng: [13.68528740559085, 100.6113370260246],
            circle: {
                center: [13.68528740559085, 100.6113370260246],
                radius: 200,
                color: '#EA5455',
            },
            pallets: [
                {
                    title: 'Total Active Gateway',
                    value: 5,
                    total: 10,
                    color: '#36ACE4',
                    img: 'Gateway.png'
                },
                {
                    title: 'Total ESL Active',
                    value: 56,
                    total: 100,
                    color: '#977DF9',
                    img: 'Tag.png'
                },
                {
                    title: 'Total Product',
                    value: 25,
                    total: 80,
                    color: '#E482EE',
                    img: 'Asset.png'
                }
            ],
            patients: [
                {
                    name: '',
                    id: '001',
                    status: 0,
                    bed: 1,
                },
                {
                    name: '',
                    id: '002',
                    status: 1,
                    bed: 3,
                },
                {
                    name: '',
                    id: '003',
                    status: 0,
                    bed: 5,
                },
                {
                    name: '',
                    id: '004',
                    status: 0,
                    bed: 7,
                },
            ],
            chartData: {
                labels: ['0', '1', '2'],
                datasets: [{ label: 'Data One', backgroundColor: '#f87979', data: [40, 20, 12] }],
            },
            chartOptions: {
                responsive: true,
            },
            select: '5',
            items: [
                { text: '5', value: '5' },
                { text: '10', value: '10' },
                { text: '15', value: '15' },
            ],
        }
    },
    methods: {
        goto(item) {
            this.$router.push(`/dashboards/healthcare/${item.id}`)
        },
        genDataChart() {
            console.log('changdata');
            let labels = []
            let data = []
            console.log(this.select);
            for (let i = 0; i < this.select; i++) {
                labels.push(i.toString())
                data.push(Math.floor(Math.random() * 10))
            }
            console.log(labels);
            this.chartData.labels = labels
            this.chartData.datasets[0].data = data
        }
    },
    mounted() {
        this.genDataChart()
    },
}
</script>
  
<style>

</style>
  