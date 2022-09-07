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
        <br />
        <!-- {{ sl_type }} -->
        <!-- {{ rt_device }} -->
        <!-- {{ type_from_sensor }} -->
        <!-- {{ filteredList }} -->

        <div v-if="['home'].includes(nav_mode)">
          <div
            class="ma-2 justify-center align-center d-flex flex-wrap"
            v-for="(n, index) in filteredList"
            :key="index"
          >
            <v-progress-circular
              id="progress-st"
              :value="parseFloat(n.temp)"
              :rotate="-90"
              :size="260"
              :width="5"
              color="primary"
            >
              <ul align="center">
                <li>
                  <h1>°C</h1>
                </li>
                <li>
                  <h1>{{ n.temp }}</h1>
                </li>
                <li>
                  <h1>
                    <v-icon>{{ icons.mdiWaterPercent }}</v-icon
                    >{{ n.humid }} %
                  </h1>
                </li>
              </ul>
            </v-progress-circular>

            <div class="mt-3" style="width: 100%">
              <ul>
                <li v-for="(item, index) in list_detail" :key="index">
                  <h5 class="font-weight-light text-truncate" style="max-width: 300px">
                    {{ item.name }}: <span class="text-primary"> {{ n[item.key] }} </span>
                  </h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="['graph'].includes(nav_mode)">graph page</div>

        <v-card-text v-show="hidden" style="position: fixed; bottom: 63px">
          <v-fab-transition>
            <v-btn color="pink" @click="hidden = !hidden" dark absolute top right fab>
              <v-icon>{{ icons.mdiArrowUp }}</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>

        <v-card-text v-show="!hidden" style="height: 250px; position: fixed; bottom: 63px">
          <v-fab-transition>
            <v-btn color="pink" @click="hidden = !hidden" dark absolute top right fab>
              <v-icon>{{ icons.mdiArrowDown }}</v-icon>
            </v-btn>
          </v-fab-transition>
          <v-card class="pa-2" style="height: 100%">
            <v-list dense>
              <v-subheader>Monthly Expense</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in items2" :key="i">
                  <v-list-item-icon>
                    <v-icon color="#FFB44E">{{ icons.mdiArrowTopRightThinCircleOutline }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                    <v-list-item-subtitle>13% more from Feb</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action> <v-list-item-action-text>26°C 34%</v-list-item-action-text></v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list></v-card
          >
        </v-card-text>
      </v-container>
    </div>

    <v-bottom-navigation
      color="primary"
      v-model="value"
      background-color="white"
      grow
      app
      v-if="$vuetify.breakpoint.width <= 1024"
    >
      <v-btn min-height="56" text>
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn min-height="56" text>
        <span>Graph</span>
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
} from '@mdi/js'
export default {
  data: () => ({
    value: 0,
    model: null,
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
    },
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
    list_detail: [
      { name: 'Device Name', key: 'device_name' },
      { name: 'Device MAC Address', key: 'mac_address' },
      { name: 'Temperature', key: 'temp' },
      { name: 'Humidity', key: 'humid' },
      { name: 'Battery', key: 'battery' },
    ],
    items_device: [
      {
        id: 1,
        type: 'TypeDoor',
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
        id: 8,
        type: 'TypeGateway',
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
    ],
    items2: [
      { text: 'March 2022', icon: 'mdiArrowTopRightThinCircleOutline' },
      { text: 'March 2022', icon: 'mdiArrowTopRightThinCircleOutline' },
      { text: 'March 2022', icon: 'mdiArrowTopRightThinCircleOutline' },
    ],
    sl_type: '',
    type_from_sensor: [],
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
      this.sl_type = this.type_from_sensor[item].type
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
    // rt_device() {
    //   return this.type_from_sensor[this.model]
    // },
    filteredList() {
      return this.items_device.filter(post => {
        return post.type.toString().toLowerCase().includes(this.sl_type.toLowerCase())
      })
    },
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
</style>
