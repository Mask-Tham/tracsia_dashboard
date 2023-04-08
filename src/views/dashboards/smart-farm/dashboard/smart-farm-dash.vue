<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h3 class="ma-3">Smart Farm Dashboard</h3>
        <v-tabs v-model="tab" fixed-tabs align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item style="background-color: #F4F5FA;" v-for="(i, item) in items" :key="item">

            <v-col cols="12" class="bg-image">
              <v-card-text>
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
                      <h1 style="position: absolute; bottom: 0; left: 70px; font-size: 40px;">{{ temp }} <sup
                          style="font-size: 25px;">°C</sup></h1>
                      <h1 style="position: absolute; bottom: 0; color: #3F8FA8; right: 20px; font-size: 25px;"><img
                          width="27" src="@/assets/images/dashboard/water-outline.png" alt=""> {{ gender[1].total }}%</h1>
                    </div>

                  </v-col>
                  <v-col cols="12" md="3" sm="6" xs="12" class="d-flex align-center">
                    <div class="d-flex"
                      style="width: 100%; position: relative;  align-items: center; padding: 15px; border-radius: 15px;">
                      <h1 class=" font-weight-semibold" style="font-size: 25px;">
                         {{ time_1 }}
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
                    <div class="map card-div pa-4">
                      <!-- <h2 style="padding: 15px">Live Machine Status</h2> -->
                      <div align="center">
                        <img style="width: 550px;" :src="require(`@/assets/images/dashboard/farm-plant.png`)" alt="">
                      </div>

                    </div>
                    <div class="temp card-div d-flex">
                      <v-row>
                        <v-col v-for="data in gender" :key="data.title" cols="12" md="4" sm="6" xs="12"
                          class="d-flex align-center">
                          <div class="d-flex" style="width: 100%; align-items: center; padding: 5px; ">
                            <lottie-animation ref="anim" style="width: 100px;" :loop="true"
                              :animationData="require(`@/assets/lottie/${data.imgmap}`)" />
                            <div class="ms-3">
                              <p class="text-xs mb-0">
                                {{ data.title }}
                              </p>
                              <h3 class="text-xl font-weight-semibold">
                                {{ data.total }} <span class="text-xs">{{ data.unit }}</span>
                              </h3>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                    <div class="vibration card-div">
                      <br>
                      <div class="tabs-custom">

                        <input id="tab1" type="radio" name="tabsA" checked>
                        <label for="tab1"> <img width="27" src="@/assets/images/dashboard/i4.png" alt=""> Graph</label>

                        <input id="tab2" type="radio" name="tabsA">
                        <label for="tab2"><img width="27" src="@/assets/images/dashboard/i3.png" alt=""> Location
                          2</label>

                        <section id="content1">
                          <vue-apex-charts style="width: 100%; height: 100%;" type="line" :options="options"
                            :series="series"></vue-apex-charts>
                        </section>

                        <section id="content2">
                          Material
                          <p>
                            Bacon ipsum dolor sit amet landjaeger sausage brisket, jerky drumstick fatback boudin ball
                            tip turducken. Pork belly meatball t-bone bresaola tail filet mignon kevin turkey ribeye
                            shank flank doner cow kielbasa shankle. Pig swine chicken hamburger, tenderloin turkey rump
                            ball tip sirloin frankfurter meatloaf boudin brisket ham hock. Hamburger venison brisket
                            tri-tip andouille pork belly ball tip short ribs biltong meatball chuck. Pork chop ribeye
                            tail short ribs, beef hamburger meatball kielbasa rump corned beef porchetta landjaeger
                            flank. Doner rump frankfurter meatball meatloaf, cow kevin pork pork loin venison fatback
                            spare ribs salami beef ribs.
                          </p>
                          <p>
                            Jerky jowl pork chop tongue, kielbasa shank venison. Capicola shank pig ribeye leberkas
                            filet mignon brisket beef kevin tenderloin porchetta. Capicola fatback venison shank
                            kielbasa, drumstick ribeye landjaeger beef kevin tail meatball pastrami prosciutto pancetta.
                            Tail kevin spare ribs ground round ham ham hock brisket shoulder. Corned beef tri-tip
                            leberkas flank sausage ham hock filet mignon beef ribs pancetta turkey.
                          </p>
                        </section>

                      </div>
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
import { mdiOverscan } from '@mdi/js'
import LottieAnimation from 'lottie-web-vue'
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    LottieAnimation,
    VueApexCharts
  },
  data() {
    return {
      icons: {
        mdiOverscan
      },
      tab: null,
      items: ['PLANT A', 'PLANT B', 'PLANT C', 'PLANT D', 'PLANT E', 'PLANT F',],
      text: 'Lorem ipsum dolor sit amet,',
      options: {
        chart: {
          id: 'vuechart-example'
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
      userTable: [],
      temp: "",
      items_temp: [],
      searchTable: '',
      statusFilter: null,
      statusOptions: [
        { title: 'on', value: 'true' },
        { title: 'off', value: 'false' },
      ],
      selectedRows: [],
      loadingTable: false,
      time_1: "",
      gender: [
        { title: 'Light Sensor', total: "", unit: 'lux', img: 'i1.png', imgmap: 'sun.json', color: '#0095FF' },
        { title: 'Moisture', total: "", unit: '%', img: 'i2.png', imgmap: 'humidly.json', color: '#01C282' },
        { title: 'Conductivity', total: "", unit: 'µS/cm', img: 'i3.png', imgmap: 'plant.json', color: '#884DFF' },
        //   { title: 'Power Volume', total: 193.86 ,unit: 'kWh', img: 'i4.png', imgmap: 'map_Industry.png', color: '#FF708D' },
      ],
      interval:null,
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
  beforeDestroy(){
    clearInterval(this.interval)
  },
  mounted() {
    this.fetchData();
    this.toLocaleTime();
    this.realTime();
  },
  methods: {
    async fetchData() {
      let res = await this.$http.get(`v1/custumer-sensor/by-group-poge/?customerID=tracsia&pageOptionID=POT20221219075517485`)
      console.log(res.data.data[0]) //temperature
      this.gender[0].total = res.data.data[0].illuminance
      this.gender[1].total = res.data.data[0].moisture
      this.gender[2].total = res.data.data[0].conductivity
      this.temp = res.data.data[0].temperature

    },
    openFullscreen(id) {
      var elem = document.getElementById(id);
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    },
    toLocaleTime() {
      // setInterval(function () {
    this.time_1 = this.$moment().format('lll')
      // }, 1000);
    },
    realTime() {
     this.interval = setInterval(() => {
        this.fetchData();
        this.toLocaleTime();
      }, 10000);
    }
  }
}
</script>
  
<style slang="scss" scoped>
.container_grid {
  display: grid;
  width: 100%;
  padding: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 15px 15px;
  grid-auto-flow: row;
  grid-template-areas:
    "map map map temp temp temp"
    "map map map vibration vibration vibration"
    "map map map vibration vibration vibration"
    "map map map vibration vibration vibration"
    "map map map vibration vibration vibration"
  ;
}

.graph_below {
  grid-area: graph_below;
}

.map {
  grid-area: map;
  display: grid;
  align-items: center;
  justify-items: center;
}

.temp {
  grid-area: temp;
}

.vibration {
  grid-area: vibration;

}

.h-tab {
  height: calc(100% - 16.8px);
}

.card-div {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 19px;
}

.p-0 {
  padding: 0;
}

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
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.tabs-custom {
  padding: 10px;
  height: 100%;
}

.tabs-custom section {
  display: none;
  padding: 20px;
  border: none
}

.tabs-custom input {
  display: none;
}

.tabs-custom label {
  display: inline-block;
  margin: 0 10px 0 0;
  padding: 5px 10px;
  font-weight: 600;
  text-align: center;
  color: #555;
  /* background:#FFF; */
  border: none;
}

.tabs-custom label:before {
  font-family: fontawesome;
  font-weight: normal;
  margin-right: 10px;
}


.tabs-custom label:hover {
  color: var(--v-anchor-base);
  cursor: pointer;
}

.tabs-custom input:checked+label {
  /* background: rgb(205, 215, 226); */
  color: var(--v-anchor-base);
  border-bottom-color: var(--v-anchor-base);
  border-bottom: 2px solid;
}

.tabs-custom #tab1:checked~#content1,
.tabs-custom #tab2:checked~#content2,
.tabs-custom #tab3:checked~#content3,
.tabs-custom #tab4:checked~#content4 {
  display: block;
}
</style>
  