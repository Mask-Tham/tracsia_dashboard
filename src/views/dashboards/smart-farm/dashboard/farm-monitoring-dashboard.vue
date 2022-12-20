<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card-title> Farm Monitoring Dashboard </v-card-title>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item style="background-color: #F4F5FA;" v-for="(i, item) in items" :key="item">
            <v-col cols="12" class="bg-image">
              <v-card-text>
                <!-- <v-row>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" class="mr-3" @click="openFullscreen('mysl' + i)">Full Screen</v-btn>
                </v-row> -->
                <v-row :id="'mysl' + i">
                  <v-col cols="12" md="6" sm="6" xs="12" class="d-flex align-center">
                    <div class="d-flex"
                      style="width: 100%; background: rgb(118, 210, 80, 0.6); border-radius: 75px;  align-items: center; padding: 15px; ">
                      <v-row style="height: 100%;">
                        <v-col class="p-0" cols="4" md="4" sm="6" xs="12">
                          <img style="width: 100px;" :src="require(`@/assets/images/Face/aqi_l1.png`)" alt="">
                        </v-col>
                        <v-col class="p-0" style="display: flex; align-items: center; justify-content: center;" cols="4"
                          md="4" sm="6" xs="12">

                          <h1 style="white-space: nowrap;">
                            FARM QUALITY
                          </h1>

                        </v-col>
                        <v-col class="p-0" style="display: flex; justify-content: center; align-items: center;" cols="4"
                          md="4" sm="6" xs="12">

                          <h1 style="white-space: nowrap; font-size: 45px; color: #22600C;">
                            GOOD
                          </h1>

                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-col cols="12" md="3" sm="6" xs="12" class="d-flex align-center">
                    <div style=" width: 100%; height: 100%;  position: relative;">

                      <lottie-animation ref="anim" style="width: 100px; position: absolute; left: 0; top: 0;"
                        :loop="true" :animationData="require(`@/assets/lottie/sun.json`)" />
                      <h1 style="position: absolute; bottom: 0; left: 70px; font-size: 40px;">43 <sup
                          style="font-size: 25px;">°C</sup></h1>
                      <h1 style="position: absolute; bottom: 0; color: #3F8FA8; right: 20px; font-size: 25px;"><img
                          width="27" src="@/assets/images/dashboard/water-outline.png" alt=""> 83%</h1>
                    </div>

                  </v-col>
                  <v-col cols="12" md="3" sm="6" xs="12" class="d-flex align-center">
                    <div class="d-flex"
                      style="width: 100%; position: relative;  align-items: center; padding: 15px; border-radius: 15px;">
                      <h1 class=" font-weight-semibold" style="font-size: 25px;">
                        23 JUN Monday, 14:23
                      </h1>
                      <v-btn style="position: absolute; right: 5px; top: -20px;" fab dark small color="primary"
                        @click="openFullscreen('mysl' + i)">
                        <v-icon size="17">
                          {{ icons.mdiOverscan }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                  <div class="container_grid">
                    <div class="graph_below card-div-g">
                      <h2 style="padding: 15px">Current Status</h2>
                      <div style="display: flex;">
                        <div style="width: 50%; padding: 10px;">
                          <div>
                            <div style="display: flex; background: #F3F6F9; width: 100%;">
                              <div align="center" style="width: 50%; padding: 5px;">Machine</div>
                              <div align="center" style="width: 50%; padding: 5px;">Status</div>
                            </div>
                            <div style="display: flex; width: 100%;">
                              <div style="width: 50%; padding: 5px;">
                                <div style="display: flex; width: 100%;">
                                  <div align="center" style="width: 150px; "> <img width="50"
                                      :src="require(`@/assets/images/dashboard/miling-machine.png`)" alt=""></div>
                                  <div style="width: calc(100% - 150px); ">
                                    <h4>DMG Mori</h4>
                                    <p>Vending Machine</p>
                                  </div>
                                </div>

                              </div>
                              <div align="center" style="width: 50%; padding: 5px;">
                                <div>02:56</div>
                                <div class="btn-run">Running</div>
                              </div>
                            </div>
                          </div>
                          <h4>Machine Uptime - DMG Mori</h4>
                          <vue-apex-charts type="bar" height="150" :options="apexChatData.barChart.chartOptions"
                            :series="apexChatData.barChart.series" />
                        </div>
                        <div style="width: 50%; padding: 5px;">
                          <h3>Download Pareto - Today</h3>
                          <vue-apex-charts type="bar" height="250" :options="apexChatData.columnChart.chartOptions"
                            :series="apexChatData.columnChart.series" />
                        </div>
                      </div>
                    </div>
                    <div class="map card-div" style="position: relative;">
                      <h2 style="padding: 15px; position: absolute; top: 10px; left: 10px;">Live Machine Status</h2>
                      <div style="height: 100%; width: 100%; display: grid; align-items: center; justify-items: center;">
                        <img style="width: 470px;" :src="require(`@/assets/images/dashboard/farm-plant.png`)" alt="">
                      </div>

                    </div>
                    <div class="temp card-div tw-grid tw-grid-cols-3 tw-gap-4">
                      <div class="tw-p-2 tw-flex" v-for="i in grid_items">
                        <div style="width: 60px;" align="center">
                          <img style="height: auto;" :width="i.w_img"
                            :src="require(`@/assets/images/dashboard/icon_dash_morni/${i.imgmap}`)" alt="">
                        </div>
                        <div  style="width: calc(100% - 60px);">
                          <h3>{{ i.title }}</h3>
                          <h3>0.3 {{ i.unit }}</h3>
                        </div>
                      </div>
                    </div>
                    <div class="vibration card-div">

                      <vue-apex-charts style="width: 100%;padding: 15px " height="280" type="line" :options="options"
                        :series="series"></vue-apex-charts>

                    </div>
                  </div>
                </v-row>
              </v-card-text>
            </v-col>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiExportVariant, mdiOverscan } from '@mdi/js'
import LottieAnimation from 'lottie-web-vue'
import VueApexCharts from 'vue-apexcharts'
import apexChatData from './chart/apexChartData'
export default {
  components: {
    VueApexCharts,
    LottieAnimation
  },
  data() {
    return {
      icons: {
        mdiExportVariant,mdiOverscan
      },
      tab: null,
      items: ['PLANT A', 'PLANT B', 'PLANT C', 'PLANT D', 'PLANT E',],
      text: 'Lorem ipsum dolor sit amet,',
      hearderTable: [
        { text: 'username', value: 'username' },
        { text: 'name', value: 'name' },
        { text: 'email', value: 'email' },
        { text: 'phone number', value: 'phone_number' },
        { text: 'position', value: 'position' },
        { text: 'roleID', value: 'roleID' },
        { text: 'Customer ID', value: 'custumerID' },
        {
          text: 'STATUS',
          value: 'isUse',
          align: 'center',
        },
        {
          text: 'ability',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
      options: {
        chart: {
          id: 'vuechart-example',
          // height: 150
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "Series A",
          data: [14, 2, 25, 15, 25, 28, 38, 46]
        },
        {
          name: "Series C",
          data: [84, 20, 25, 18, 76, 38, 38, 55]
        },
        {
          name: "Series B",
          data: [20, 29, 37, 36, 44, 45, 50, 58]
        }
      ],
      userTable: [],
      searchTable: '',
      statusFilter: null,
      statusOptions: [
        { title: 'on', value: 'true' },
        { title: 'off', value: 'false' },
      ],
      selectedRows: [],
      loadingTable: false,
      grid_items: [
        { title: 'Light Sensor', total: 193.86, unit: 'lux', w_img: 55, imgmap: '1.png', color: '#0095FF' },
        { title: 'VPD Volume', total: 193.86, unit: 'RH', w_img: 55, imgmap: '2.png', color: '#01C282' },
        { title: 'Rain Volume', total: 193.86, unit: 'RH', w_img: 55, imgmap: '3.png', color: '#884DFF' },
        { title: 'Soil Humid', total: 193.86, unit: '%', w_img: 55, imgmap: '4.png', color: '#FF708D' },
        { title: 'CO2 Volume', total: 193.86, unit: 'ppm', w_img: 55, imgmap: '5.png', color: '#01C282' },
        { title: 'BC Volume', total: 193.86, unit: 'PPFD', w_img: 55, imgmap: '6.png', color: '#884DFF' },
        { title: 'PH Volume', total: 193.86, unit: 'pH', w_img: 35, imgmap: '7.png', color: '#FF708D' },
      ],
      gender: [
        { title: 'Power Volume', total: 193.86, unit: 'kWh', img: 'i1.png', imgmap: 'map_Industry.png', color: '#0095FF' },
        { title: 'Power Volume', total: 193.86, unit: 'kWh', img: 'i2.png', imgmap: 'map_Industry.png', color: '#01C282' },
        { title: 'Power Volume', total: 193.86, unit: 'kWh', img: 'i3.png', imgmap: 'map_Industry.png', color: '#884DFF' },
        { title: 'Power Volume', total: 193.86, unit: 'kWh', img: 'i4.png', imgmap: 'map_Industry.png', color: '#FF708D' },
      ],
    }
  },
  setup() {
    return {
      apexChatData,
    }
  },
  computed: {
    userTableC() {
      console.log(this.statusFilter)
      let statusFilter = this.statusFilter == null ? '' : this.statusFilter
      let customerFilter = this.userData == null ? undefined : this.userData.custumerID

      return this.userTable.filter(el => {
        return el.isUse.toString().includes(statusFilter) && el.custumerID.includes(customerFilter)
      })
    },
  },
  methods: {
    openFullscreen(id) {
      var elem = document.getElementById(id);
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    }
  }
}
</script>

<style slang="scss" scoped>
.bg-image {
  background-image: url("../../../../assets/farm/background.png");
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
:fullscreen {
  background-image: url("../../../../assets/farm/background.png");
  /* Full height */
  height: 100%;
  overflow-y: scroll;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.container_grid {
  display: grid;
  width: 100%;
  padding: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 15px 15px;
  grid-auto-flow: row;
  grid-template-areas:
    "map map  temp temp"
    "map map  vibration vibration"
    "graph_below  graph_below graph_below graph_below";
}

.graph_below {
  grid-area: graph_below;
}

.map {
  grid-area: map;
}

.temp {
  grid-area: temp;
}

.vibration {
  grid-area: vibration;
}

.card-div {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 19px;
}

.card-div-g {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 19px;
}

.p-0 {
  padding: 0;
}

.btn-run {
  border-radius: 19px;
  color: #ffffff;
  background: #2EC094;
  width: 100px;
}
</style>
