<template>
    <div>
      <v-row>
        <v-col cols="12">
            <v-card-title> Machine Performance Dashboard </v-card-title>
              <v-tabs v-model="tab" fixed-tabs align-with-title>
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab v-for="item in items" :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>
              <v-tabs-items  v-model="tab" >
                <v-tab-item style="background-color: #F4F5FA;" v-for="(i,item) in items" :key="item">
                  <v-col cols="12">
                  <v-card-text>
                    <!-- <v-row>
                      <v-spacer></v-spacer>
                    <v-btn  color="primary" class="mr-3" @click="openFullscreen('mysl'+i)">Full Screen</v-btn>
                    </v-row> -->
                    <v-row :id="'mysl'+i">
                      <v-col v-for="data in gender" :key="data.title" cols="12" md="3" sm="6" xs="12"  class="d-flex align-center">
                        <div class="d-flex" style="width: 100%; color: #fff; align-items: center; padding: 15px; border-radius: 15px;" :style="{background: data.color}">
                          <v-avatar size="64"  class="elevation-1">
                            <img  :src="require(`@/assets/images/dashboard/${data.img}`)" alt="">
                          </v-avatar>
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
                      <div class="container_grid">
                       
                        <div class="graph_below card-div">
                            <h2 style="padding: 15px">Current Status</h2>
                            <div  style="display: flex;">
                                <div style="width: 50%; padding: 10px;">
                               
                               <div >
                                   <div style="display: flex; background: #F3F6F9; width: 100%;">
                                       <div align="center" style="width: 50%; padding: 5px;">Machine</div>
                                       <div align="center" style="width: 50%; padding: 5px;">Status</div>
                                   </div>
                                   <div style="display: flex; width: 100%;">
                                       <div   style="width: 50%; padding: 5px;">
                                           <div style="display: flex; width: 100%;">
                                               <div align="center" style="width: 150px; "> <img  width="50" :src="require(`@/assets/images/dashboard/miling-machine.png`)" alt=""></div>
                                               <div  style="width: calc(100% - 150px); ">
                                                   <h4>DMG Mori</h4>
                                                   <p>Vending Machine</p>
                                               </div>
                                           </div>
                                          
                                       </div>
                                       <div  align="center" style="width: 50%; padding: 5px;">
                                               <div>02:56</div>
                                               <div class="btn-run">Running</div>
                                       </div>
                                   </div>
                               </div>
                               <h4>Machine Uptime - DMG Mori</h4>
                               <vue-apex-charts
                               type="bar"
                               height="150"
                               :options="apexChatData.barChart.chartOptions"
                               :series="apexChatData.barChart.series"
                               />
                           </div>
                           <div style="width: 50%; padding: 5px;">
                               <h3>Download Pareto - Today</h3>
                               <vue-apex-charts
                               type="bar"
                               height="250"
                               :options="apexChatData.columnChart.chartOptions"
                               :series="apexChatData.columnChart.series"
                               />
                           </div>
                            </div>
                        </div>
                        <div class="map card-div">
                          <h2 style="padding: 15px">Live Machine Status</h2>
                          <div align="center">
                            <img  style="width: 600px;" :src="require(`@/assets/images/dashboard/map_Industry.png`)" alt="">
                          </div>
                         
                        </div>
                        <div class="temp card-div">
                          <v-row style="height: 100%;">
                            <v-col class="p-0" cols="4" md="4" sm="6" xs="12">
                              <img  width="140" :src="require(`@/assets/images/dashboard/tempicon.png`)" alt="">
                            </v-col>
                            <v-col class="p-0" style="display: flex; align-items: center;"  cols="4" md="5" sm="6" xs="12">
                              <div align="center"  >
                                <h2 style="white-space: nowrap;">
                                  Surface Temperature
                                </h2>
                                <br>
                                <h1 style="font-size: 40px;">25.02 <sup style="font-size: 22px;">°C</sup></h1>
                              </div>
                            </v-col>
                            <v-col class="p-0 d-flex align-content-space-around flex-wrap" cols="4" md="3" sm="6" xs="12">
                              <div>
                                <h3>max 28.40 <sup>°C</sup></h3>
                                <h3>min 28.40 <sup>°C</sup></h3>
                              </div>
                              <div >
                                <h5>Date 2022-10-15</h5>
                                <h5>Time 22:40:27 </h5>
                              </div>
                            </v-col>
                          </v-row>
                        </div>
                        <div class="vibration card-div">
                          <v-row style="height: 100%;">
                            <v-col class="p-0" style="display: flex; align-items: center;flex-direction: column; justify-content: center;"  cols="4" md="5" sm="6" xs="12">
                              <h3 >Vibration Detection</h3>
                              <img  width="150" :src="require(`@/assets/images/dashboard/ball-mill-operation.png`)" alt="">
                            </v-col>
                            <v-col class="p-0" style="display: flex; align-items: center;"  cols="4" md="4" sm="6" xs="12">
                              <div align="center"  >
                                <h2 style="white-space: nowrap;">
                                  Status
                                </h2>
                                <h1  style="font-size: 40px;">Normal</h1>
                              </div>
                            </v-col>
                            <v-col class="p-0 d-flex align-content-space-around flex-wrap" cols="4" md="3" sm="6" xs="12">
                              <div>
                                <h3>max 28.40 <sup>°C</sup></h3>
                                <h3>min 28.40 <sup>°C</sup></h3>
                              </div>
                              <div >
                                <h5>Date 2022-10-15</h5>
                                <h5>Time 22:40:27 </h5>
                              </div>
                            </v-col>
                          </v-row>
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
import VueApexCharts from 'vue-apexcharts'
import apexChatData from './chart/apexChartData'
export default {
    components: {
      VueApexCharts,
      },
    data() {
      return {
        icons:{
          mdiExportVariant,
        },
        tab: null,
        items: ['PLANT A', 'PLANT B', 'PLANT C','PLANT D', 'PLANT E',],
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
          { title: 'Power Volume', total: 193.86 ,unit: 'kWh', img: 'i1.png', imgmap: 'map_Industry.png', color: '#0095FF' },
          { title: 'Power Volume', total: 193.86 ,unit: 'kWh', img: 'i2.png', imgmap: 'map_Industry.png', color: '#01C282' },
          { title: 'Power Volume', total: 193.86 ,unit: 'kWh', img: 'i3.png', imgmap: 'map_Industry.png', color:'#884DFF'  },
          { title: 'Power Volume', total: 193.86 ,unit: 'kWh', img: 'i4.png', imgmap: 'map_Industry.png', color: '#FF708D' },
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
  
  <style slang="sass" scoped>
  .container_grid {  
    display: grid;
    width: 100%;
    padding: 15px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr auto;
    gap: 15px 15px;
    grid-auto-flow: row;
    grid-template-areas:
      "map map map temp temp"
      "map map map vibration vibration"
      "graph_below graph_below graph_below graph_below graph_below";
  }
  
  .graph_below { grid-area: graph_below; }
  
  .map { grid-area: map; }
  
  .temp { grid-area: temp; }
  
  .vibration { grid-area: vibration; }
  .card-div{
    background: #ffffff;
    border-radius: 19px;
  }
  .p-0{
    padding: 0;
  }
  .btn-run{
    border-radius: 19px;
    color: #ffffff;
    background: #2EC094;
    width: 100px;
  }
  </style>
  