<template>
  <div style="background: white; height: 100%; position: relative">
    <v-app-bar style="box-shadow: 0 0" app>
      <v-img max-height="100" max-width="100" src="@/assets/images/svg/nav-logo-light.png"></v-img>
    </v-app-bar>

    <div class="pa-0">
      <v-container class="pa-0">
        <v-sheet class="mx-auto justify-center d-flex" max-width="900">
          <v-slide-group v-model="model" @change="filterType(model)" class="pa-1 mt-1" mandatory show-arrows>
            <v-slide-item v-for="(n, index) in type_from_sensor" :key="index" v-slot="{ active, toggle }">
              <v-card
                :color="active ? '#E0F1DB' : 'grey lighten-1'"
                class="ma-2 justify-center align-center d-flex flex-wrap"
                height="50"
                width="50"
                @click="toggle"
              >
                <v-icon :color="active ? 'primary' : '#D6D5E3'" size="28">{{ icons[n.icon] }}</v-icon>
                <span class="h6-item-temp" :style="{ color: active ? 'var(--v-primary-base)' : '#D6D5E3' }">{{
                  n.name
                }}</span>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>

        <!-- {{ sl_type }} -->
        <!-- {{ rt_device }} -->

        <v-card :height="heighttablemain" v-if="['home'].includes(nav_mode)">
          <br />
          <div class="ma-2 justify-center align-center d-flex flex-wrap">
            <v-progress-circular
              id="progress-st"
              :value="sl_device.type === 'TypeDoor' ? '100' : parseFloat(sl_device.temp)"
              :rotate="-90"
              :size="260"
              :width="5"
              :color="sl_device.status === false ? '#ffb400' : 'primary'"
            >
              <ul v-if="['TypeDoor'].includes(sl_device.type)" align="center">
                <li>
                  <span class="font-weight-light text-h6 text-primary">{{ sl_type.name }}</span>
                </li>
                <li class="mt-3 mb-3">
                  <span class="text-h2 text-black">CLOSE</span>
                </li>
                <li>
                  <span class="text-h5 text-black">Installed</span>
                </li>
              </ul>
              <ul v-else align="center">
                <li>
                  <span class="font-weight-light text-h6 text-primary">{{ sl_type.name }}</span>
                </li>
                <li class="mt-3 mb-3">
                  <span class="text-h2 text-primary"
                    >{{ sl_device.temp }} <span class="text-h5 text-primary">°C</span></span
                  >
                </li>
                <li>
                  <span class="text-h4 text-blue"
                    ><v-icon size="34" color="#51B0F9">{{ icons.mdiWaterPercent }}</v-icon
                    >{{ sl_device.humid }} <span class="text-h5 text-blue">%</span></span
                  >
                </li>
              </ul>
            </v-progress-circular>

            <div style="width: 100%">
              <ul class="pa-2">
                <li v-for="(item, index) in list_detail1" :key="index">
                  <h5 class="font-weight-light text-truncate" style="max-width: 300px">
                    {{ item.name }}: <span class="text-primary"> {{ sl_device[item.key] }} </span>
                  </h5>
                </li>
              </ul>
              <!-- <v-card class="pa-2" style="border-radius: 30px"> -->
              <!-- <div class="text-darkblue font-weight-medium mt-2 mb-1">General information</div> -->
              <v-row no-gutters>
                <v-col v-for="(item, index) in list_detail2" :key="index" cols="4">
                  <div style="	border: 1px solid; border-color: #26e661; border-radius: 20px;" class="pa-2 ma-1">
                    <div>
                      <v-icon size="30" color="primary"> {{ icons[item.icon] }} </v-icon>
                    </div>
                    <div align="center" class="text-primary">{{ sl_device[item.key] }}{{ item.unit }}</div>
                    <div align="center">{{ item.name }}</div>
                  </div>
                </v-col>
              </v-row>
              <!-- </v-card> -->

              <!-- <ul>
                <li v-for="(item, index) in list_detail2" :key="index">
                  <h3 class="font-weight-medium mt-3 text-darkblue text-truncate" style="max-width: 300px">
                    {{ item.name }}: {{ sl_device[item.key] }}
                  </h3>
                </li>
              </ul> -->
            </div>
          </div>
        </v-card>
        <div v-if="['graph'].includes(nav_mode)">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="step === 1" color="primary" fab @click="step--">
              <v-icon primary> {{ icons.mdiChartLine }} </v-icon>
            </v-btn>
            <v-btn :disabled="step === 2" color="primary" fab @click="step++">
              <v-icon primary> {{ icons.mdiTableOfContents }} </v-icon>
            </v-btn>
          </v-card-actions>
          <v-window v-model="step">
            <v-window-item :value="1">
              <apex-chart-line :series="series" :heights="heighttable" :options="chartOptions"></apex-chart-line
            ></v-window-item>
            <v-window-item :value="2">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-card :height="heighttable" class="overflow-auto pa-2">
                <v-data-table fixed-header :headers="headers" :items="desserts" :search="search"></v-data-table></v-card
            ></v-window-item>
          </v-window>
        </div>

        <v-card-text v-show="hidden" style="position: fixed; left: 0; bottom: 63px">
          <v-fab-transition>
            <v-btn color="pink" @click="hidden = !hidden" dark absolute top right fab>
              <v-icon>{{ icons.mdiArrowUp }}</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>

        <v-card-text v-show="!hidden" style="height: 250px; left: 0; position: fixed; bottom: 63px">
          <v-fab-transition>
            <v-btn color="pink" @click="hidden = !hidden" dark absolute top right fab>
              <v-icon>{{ icons.mdiArrowDown }}</v-icon>
            </v-btn>
          </v-fab-transition>
          <v-card height="200" class="overflow-auto pa-2" style="height: 100%">
            <v-list dense>
              <v-subheader fixed>Monthly Expense</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in sl_device.items_log" :key="i">
                  <v-list-item-icon>
                    <v-icon color="#FFB44E">{{ icons.mdiArrowTopRightThinCircleOutline }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.timeStamp"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.detail"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text
                      >{{ item.temp }}°C {{ item.humid }}%</v-list-item-action-text
                    ></v-list-item-action
                  >
                </v-list-item>
              </v-list-item-group>
            </v-list></v-card
          >
        </v-card-text>
      </v-container>
    </div>

    <v-bottom-navigation color="primary" v-model="value" background-color="white" grow app>
      <v-btn min-height="56" text>
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn min-height="56" text>
        <span>Data</span>
        <v-icon> {{ icons.mdiChartBoxOutline }}</v-icon>
      </v-btn>

      <v-btn min-height="56" text to="/apps/user/view/3">
        <span>Profile</span>
        <v-icon>person</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import ApexChartLine from '@/views/components/chart/apex-chart/ApexChartLine.vue'
import {
  mdiChartBoxOutline,
  mdiDoorOpen,
  mdiGauge,
  mdiThermometer,
  mdiWaterPercent,
  mdiWatch,
  mdiArrowUp,
  mdiArrowDown,
  mdiArrowTopRightThinCircleOutline,
  mdiTableOfContents,
  mdiChartLine,
  mdiBattery,
} from '@mdi/js'
export default {
  components: { ApexChartLine },
  data: () => ({
    value: 0,
    model: null,
    step: 1,
    hidden: true,
    icons: {
      mdiChartBoxOutline,
      mdiDoorOpen,
      mdiGauge,
      mdiThermometer,
      mdiWaterPercent,
      mdiWatch,
      mdiArrowUp,
      mdiArrowDown,
      mdiArrowTopRightThinCircleOutline,
      mdiTableOfContents,
      mdiChartLine,
      mdiBattery,
    },
    series: [
      {
        name: 'Temperature',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: 'Humidity',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
    ],
    chartOptions: {
      chart: {
        type: 'line',
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
    search: '',
    headers: [
      {
        text: 'Timestamp',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Temperature', value: 'fat' },
      { text: 'Humidity', value: 'carbs' },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        fat: 6.0,
        carbs: 24,
      },
      {
        name: 'Ice cream sandwich',
        fat: 9.0,
        carbs: 37,
      },
      {
        name: 'Eclair',
        fat: 16.0,
        carbs: 23,
      },
      {
        name: 'Cupcake',
        fat: 3.7,
        carbs: 67,
      },
      {
        name: 'Gingerbread',
        fat: 16.0,
        carbs: 49,
      },
      {
        name: 'Jelly bean',
        fat: 0.0,
        carbs: 94,
      },
      {
        name: 'Lollipop',
        fat: 0.2,
        carbs: 98,
      },
      {
        name: 'Honeycomb',
        fat: 3.2,
        carbs: 87,
      },
      {
        name: 'Donut',
        fat: 25.0,
        carbs: 51,
      },
      {
        name: 'KitKat',
        fat: 26.0,
        carbs: 65,
      },
    ],

    device_type: [
      {
        id: 1,
        name: 'Door',
        type: 'TypeDoor',
        icon: 'mdiDoorOpen',
      },
      {
        id: 2,
        name: 'Temp',
        type: 'TypeTemp',
        icon: 'mdiThermometer',
      },
      {
        id: 3,
        name: 'Meter',
        type: 'TypeMeter',
        icon: 'mdiGauge',
      },
      {
        id: 4,
        name: 'Watch',
        type: 'TypeWatch',
        icon: 'mdiWatch',
      },
      {
        id: 5,
        name: 'Humid',
        type: 'TypeHumid',
        icon: 'mdiWaterPercent',
      },
      {
        id: 6,
        name: 'Gateway',
        type: 'TypeGateway',
        icon: 'mdiWaterPercent',
      },
    ],
    list_detail1: [
      { name: 'Device Name', key: 'device_name' },
      { name: 'Device MAC Address', key: 'mac_address' },
    ],
    list_detail2: [
      { name: 'Temperature', key: 'temp', unit: '%', icon: 'mdiThermometer' },
      { name: 'Humidity', key: 'humid', unit: '%', icon: 'mdiWaterPercent' },
      { name: 'Battery', key: 'battery', unit: '%', icon: 'mdiBattery' },
      { name: 'Temperature', key: 'temp', unit: '%', icon: 'mdiWaterPercent' },
      { name: 'Humidity', key: 'humid', unit: '%', icon: 'mdiWaterPercent' },
      // { name: 'Battery', key: 'battery' , unit: '%'},
    ],
    items_device: [
      {
        id: 1,
        type: 'TypeDoor',
        status: false,
        mac_address: 'AC23365485',
        device_name: 'DoorDemo01',
        temp: '90',
        humid: '22',
        battery: 80,
        items_log: [
          { timeStamp: 'March 2022', temp: '32', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '28', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '37', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
        ],
      },
      {
        id: 2,
        type: 'TypeTemp',
        mac_address: 'AC23265481',
        device_name: 'TempDemo01',
        temp: '27',
        humid: '22',
        battery: 100,
        items_log: [
          { timeStamp: 'March 2022', temp: '27', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
        ],
      },
      {
        id: 3,
        type: 'TypeMeter',
        mac_address: 'AC23265481',
        device_name: 'MeterDemo01',
        temp: '27',
        humid: '22',
        battery: 80,
        items_log: [
          { timeStamp: 'March 2022', temp: '27', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
        ],
      },
      {
        id: 4,
        type: 'TypeWatch',
        mac_address: 'AC23265481',
        device_name: 'WatchDemo01',
        temp: '27',
        humid: '22',
        battery: 82,
        items_log: [
          { timeStamp: 'March 2022', temp: '27', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
        ],
      },
      {
        id: 5,
        type: 'TypeTemp',
        mac_address: 'AC23265481',
        device_name: 'TempDemo01',
        temp: '27',
        humid: '22',
        battery: 20,
        items_log: [
          { timeStamp: 'March 2022', temp: '27', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
        ],
      },
      {
        id: 6,
        type: 'TypeMeter',
        mac_address: 'AC23265481',
        device_name: 'MeterDemo01',
        temp: '27',
        humid: '22',
        battery: 100,
        items_log: [
          { timeStamp: 'March 2022', temp: '27', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
        ],
      },
      {
        id: 7,
        type: 'TypeHumid',
        mac_address: 'AC23265481',
        device_name: 'MeterDemo01',
        temp: '24',
        humid: '22',
        battery: 100,
        items_log: [
          { timeStamp: 'March 2022', temp: '27', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
        ],
      },
      {
        id: 8,
        type: 'TypeGateway',
        mac_address: 'AC23265481',
        device_name: 'MeterDemo01',
        temp: '29',
        humid: '22',
        battery: 100,
        items_log: [
          { timeStamp: 'March 2022', temp: '27', humid: '34', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '27', humid: '38', detail: '13% more from Feb' },
          { timeStamp: 'March 2022', temp: '34', humid: '35', detail: '13% more from Feb' },
        ],
      },
    ],
    items2: [
      { text: 'March 2022', icon: 'mdiArrowTopRightThinCircleOutline' },
      { text: 'March 2022', icon: 'mdiArrowTopRightThinCircleOutline' },
      { text: 'March 2022', icon: 'mdiArrowTopRightThinCircleOutline' },
    ],
    sl_type: {},
    type_from_sensor: [],
    sl_device: {},
  }),
  mounted() {
    const list_types = []
    this.items_device.forEach(el => {
      if (!list_types.includes(el.type)) {
        list_types.push(el.type)
      }
    })
    list_types.forEach(el => {
      this.device_type.forEach(el2 => {
        if (el == el2.type) {
          // console.log(el2)
          this.type_from_sensor.push(el2)
        }
      })
    })
  },
  methods: {
    filterType(item) {
      this.sl_type = this.type_from_sensor[item]
      this.sl_device = this.items_device[item]
    },
  },
  computed: {
    nav_mode() {
      switch (this.value) {
        case 0:
          return 'home'
        case 1:
          return 'graph'
        default:
          return 'home'
      }
    },
    heighttable() {
      return this.$vuetify.breakpoint.height - 56 - 56 - 260
    },
    heighttablemain() {
      return this.$vuetify.breakpoint.height - 56 - 56 - 80
    },
    // filteredList() {
    //   return this.items_device.filter(post => {
    //     return post.type.toString().toLowerCase().includes(this.sl_type.toLowerCase())
    //   })
    // },
  },
}
</script>

<style lang="scss" scoped>
.h6-item-temp {
  font-size: 0.67em;
  // font-weight: bold;
}
.v-application ul,
.v-application ol {
  padding-left: 0;
  list-style: none;
}
.text-primary {
  color: var(--v-primary-base);
}
.text-blue {
  color: var(--v-info-base);
}
.text-black {
  color: var(--v-secondary-base);
}
.text-darkblue {
  color: #312d4b;
}
</style>
