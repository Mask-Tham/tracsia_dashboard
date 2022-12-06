<template>
    <div>
      <v-row>
        <v-col cols="12">
           <h3 class="ma-3">Smart Farm Dashboard</h3> 
              <v-tabs v-model="tab"  fixed-tabs align-with-title>
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab v-for="item in items" :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>
              <v-tabs-items  v-model="tab">
                <v-tab-item style="background-color: #F4F5FA;" v-for="(i,item) in items" :key="item">
                  <v-col cols="12" class="bg-image">
                    <v-card-text>->
                      <v-row :id="'mysl'+i">
                        <v-col  cols="12" md="6" sm="6" xs="12"  class="d-flex align-center">
                          <div class="d-flex" style="width: 100%; background: #76D250; border-radius: 75px;  align-items: center; padding: 15px; " >
                            <v-row style="height: 100%;">
                              <v-col class="p-0" cols="4" md="4" sm="6" xs="12">
                                <img  style="width: 100px;" :src="require(`@/assets/images/Face/aqi_l1.png`)" alt="">
                              </v-col>
                              <v-col class="p-0" style="display: flex; align-items: center; justify-content: center;"  cols="4" md="4" sm="6" xs="12">
                              
                                  <h1 style="white-space: nowrap;">
                                    FARM QUALITY
                                  </h1>
                              
                              </v-col>
                              <v-col class="p-0" style="display: flex; justify-content: center; align-items: center;"  cols="4" md="4" sm="6" xs="12">
                              
                                  <h1 style="white-space: nowrap;">
                                  GOOD
                                  </h1>
                              
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>
                        <v-col  cols="12" md="3" sm="6" xs="12"  class="d-flex align-center">
                          <div style=" width: 100%; height: 100%;  position: relative;">
                            
                            <lottie-animation  ref="anim" style="width: 100px; position: absolute; left: 0; top: 0;" :loop="true" :animationData="require(`@/assets/lottie/sun.json`)"/>
                            <h1 style="position: absolute; bottom: 0; left: 70px; font-size: 40px;" >43 <sup style="font-size: 25px;">°C</sup></h1>
                            <h1 style="position: absolute; bottom: 0; color: #3F8FA8; right: 20px; font-size: 25px;" >83%</h1>
                          </div>
                        
                        </v-col>
                        <v-col  cols="12" md="3" sm="6" xs="12"  class="d-flex align-center">
                          <div class="d-flex" style="width: 100%;  align-items: center; padding: 15px; border-radius: 15px;" >
                              <h1 class=" font-weight-semibold" style="font-size: 25px;">
                              23  JUN Monday, 14:23
                              </h1>
                          </div>
                        </v-col>
                        <div class="container_grid">
                          <div class="map card-div pa-4">
                            <!-- <h2 style="padding: 15px">Live Machine Status</h2> -->
                            <div align="center">
                              <img  style="width: 550px;" :src="require(`@/assets/images/dashboard/farm-plant.png`)" alt="">
                            </div>
                          
                          </div>
                          <div class="temp card-div d-flex">
                            <v-row >
                              <v-col v-for="data in gender" :key="data.title" cols="12" md="4" sm="6" xs="12"  class="d-flex align-center">
                                  <div class="d-flex" style="width: 100%; align-items: center; padding: 5px; ">
                                      <lottie-animation  ref="anim" style="width: 100px;" :loop="true" :animationData="require(`@/assets/lottie/${data.imgmap}`)"/>
                                      <div class="ms-3">
                                          <p class="text-xs mb-0">
                                          {{ data.title }}
                                          </p>
                                          <h3 class="text-xl font-weight-semibold">
                                          {{ data.total }} <span class="text-xs">{{data.unit}}</span>
                                          </h3>
                                      </div>
                                  </div>
                              </v-col>
                            </v-row>
                          </div>
                          <div class="vibration card-div">
                            <br>
                            <v-tabs 
                              class="h-tab" 
                              color="deep-purple accent-4"
                            >
                              <v-tab>Graph</v-tab>
                              <v-tab>Table</v-tab>

                              <v-tab-item
                                v-for="n in 2"
                                :key="n"
                              >
                                <v-container fluid>
                                  <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
                                </v-container>
                              </v-tab-item>
                            </v-tabs>
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
import { mdiExportVariant } from '@mdi/js'
// import LottieAnimation from 'lottie-web-vue'
  export default {
    components: {
    // LottieAnimation,
  },
    data() {
      return {
        icons:{
          mdiExportVariant
        },
        tab: null,
        items: ['PLANT A', 'PLANT B', 'PLANT C','PLANT D', 'PLANT E', 'PLANT F',],
        text: 'Lorem ipsum dolor sit amet,',
        options: {
        chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }],
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
        searchTable: '',
        statusFilter: null,
        statusOptions: [
          { title: 'on', value: 'true' },
          { title: 'off', value: 'false' },
        ],
        selectedRows: [],
        loadingTable: false,
        gender: [
          { title: 'Light Sensor', total: 0.3 ,unit: 'lux', img: 'i1.png', imgmap: 'sun.json', color: '#0095FF' },
          { title: 'Moisture', total: 14.3 ,unit: '%', img: 'i2.png', imgmap: 'humidly.json', color: '#01C282' },
          { title: 'Conductivity', total: 42 ,unit: 'µS/cm', img: 'i3.png', imgmap: 'plant.json', color:'#884DFF'  },
        //   { title: 'Power Volume', total: 193.86 ,unit: 'kWh', img: 'i4.png', imgmap: 'map_Industry.png', color: '#FF708D' },
        ],
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
    methods:{
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
  .container_grid {  
    display: grid;
    width: 100%;
    padding: 15px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr ;
    gap: 15px 15px;
    grid-auto-flow: row;
    grid-template-areas:
      "map map map temp temp temp"
      "map map map vibration vibration vibration"
      "map map map vibration vibration vibration"
      "map map map vibration vibration vibration"
      "map map map vibration vibration vibration"
      "map map map vibration vibration vibration";
  }
  
  .graph_below { grid-area: graph_below; }
  
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
  .h-tab{
      height: calc(100% - 16.8px);
    }
  .card-div{
    background: #ffffff;
    border-radius: 19px;
  }
  .p-0{
    padding: 0;
  }
  .bg-image{
    background-image: url("../../../../assets/farm/background.png");
     /* Full height */
     height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  </style>
  