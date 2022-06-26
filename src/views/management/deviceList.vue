<template>
  <div>
    <!-- <pre>{{ model }}</pre> -->

    <div v-if="errorStr">Sorry, but the following error occurred: {{ errorStr }}</div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>

    <div v-if="location">Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude }}</div>
    <v-row>
      <v-col cols="12" md="3" sm="6" order="1" class="align-self-end">
        <statistics-card-with-images
          :avatar="ratingsOptions.avatar"
          :avatar-width="ratingsOptions.avatarWidth"
          :change="ratingsOptions.change"
          :chip-color="ratingsOptions.chipColor"
          :chip-text="ratingsOptions.chipText"
          :statistics="ratingsOptions.statistics"
          :stat-title="ratingsOptions.statTitle"
        ></statistics-card-with-images>
      </v-col>

      <v-col cols="12" md="3" sm="6" order="2" class="align-self-end">
        <statistics-card-with-images
          :avatar="sessionsOptions.avatar"
          :avatar-width="sessionsOptions.avatarWidth"
          :change="sessionsOptions.change"
          :chip-color="sessionsOptions.chipColor"
          :chip-text="sessionsOptions.chipText"
          :statistics="sessionsOptions.statistics"
          :stat-title="sessionsOptions.statTitle"
        ></statistics-card-with-images>
      </v-col>

      <v-col cols="12" md="3" sm="6" order="1" class="align-self-end">
        <statistics-card-with-images
          :avatar="ratingsOptions.avatar"
          :avatar-width="ratingsOptions.avatarWidth"
          :change="ratingsOptions.change"
          :chip-color="ratingsOptions.chipColor"
          :chip-text="ratingsOptions.chipText"
          :statistics="ratingsOptions.statistics"
          :stat-title="ratingsOptions.statTitle"
        ></statistics-card-with-images>
      </v-col>

      <v-col cols="12" md="3" sm="6" order="2" class="align-self-end">
        <statistics-card-with-images
          :avatar="sessionsOptions.avatar"
          :avatar-width="sessionsOptions.avatarWidth"
          :change="sessionsOptions.change"
          :chip-color="sessionsOptions.chipColor"
          :chip-text="sessionsOptions.chipText"
          :statistics="sessionsOptions.statistics"
          :stat-title="sessionsOptions.statTitle"
        ></statistics-card-with-images>
      </v-col>

      <v-col cols="12" md="12" sm="12" order="12" order-md="4">
        <v-tabs v-model="tab" grow show-arrows>
          <v-tab v-for="(i, index) in tab_list" :key="index" :href="'#tab-' + i.id">{{ i.name }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(i, index) in tab_list" :key="index" :value="'tab-' + i.id">
            <v-card :style="{ background: isDark ? '#28243d' : '#F4F5FA' }">
              <v-row class="match-height ma-0">
                <v-col v-for="(b, index) in i.list_device.length" :key="index" cols="12" md="3" sm="6" order-md="5">
                  <carddevice :device_value="i.list_device[index]"></carddevice>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>

      <v-col cols="12" md="3" sm="6" order="4" order-md="5">
        <!-- <crm-revenue-report></crm-revenue-report> -->
      </v-col>

      <v-col cols="12" md="6" sm="12" order="6">
        <!-- <crm-sales-overview></crm-sales-overview> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StatisticsCardVertical from '@/@core/components/statistics-card/StatisticsCardVertical.vue'
import carddevice from '@/views/management/components/card_device.vue'
import StatisticsCardAreaChart from '@core/components/statistics-card/StatisticsCardAreaChart.vue'
import StatisticsCardWithImages from '@core/components/statistics-card/StatisticsCardWithImages.vue'
import * as mqtt from 'mqtt'
// icons

import useAppConfig from '@core/@app-config/useAppConfig'
export default {
  components: {
    StatisticsCardWithImages,
    StatisticsCardAreaChart,
    StatisticsCardVertical,
    useAppConfig,
    carddevice,
  },
  data() {
    return {
      model: [
        //   'K23',
        'S1',
        //   'M1',
        'S4',
        'P1',
        'MBS01',
        //   'MSP01',
        'MSV01',
        'B7',
        'B8',
        'S2',
        'i10',
        //   'F1',
        //   'i10',
        //   'W7',
        //   'W59',
        //   'K6',
        //   'K68',
        //   'K9P',
        //   'KG01',
        //   'KG02',
        //   'MKGW-mini',
        //   'MKGW1',
        'B10',
      ],
      tab: null,
      tab_list: [
        {
          id: 1,
          name: 'All',
          username: 'Bret',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
        {
          id: 2,
          name: 'Indoor Gateway',
          username: 'Antonette',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
        {
          id: 3,
          name: 'Outdoor Gateway',
          username: 'Samantha',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
        {
          id: 4,
          name: 'Plug Gateway',
          username: 'Karianne',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
        {
          id: 5,
          name: 'Sensor Tag',
          username: 'Kamren',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
        {
          id: 6,
          name: 'Wearable Tag',
          username: 'Leopoldo_Corkery',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
        {
          id: 7,
          name: 'Small Tag',
          username: 'Elwyn.Skiles',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
        {
          id: 8,
          name: 'Bluetooth Tag',
          username: 'Maxime_Nienow',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
        {
          id: 9,
          name: 'Long Range Tag',
          username: 'Delphine',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
        {
          id: 10,
          name: 'Water Proof Tag',
          username: 'Delphine',
          avatar: require('@/assets/images/avatars/device/G1-2.png'),
          list_device: [],
        },
      ],
      connection: {
        host: 'broker.mqttdashboard.com',
        port: 1883,
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 4000,
        clientId: 'clientId-9OBFdv3nLClolpl',
      },
      subscription: {
        topic: 'k23',
        qos: 0,
      },
      publish: {
        topic: 'k23',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },
      receiveNews: '',
      client: {
        connected: false,
      },
      data_a: {},
      location: null,
      gettingLocation: false,
      errorStr: null,
    }
  },
  setup() {
    // card with images
    const ratingsOptions = {
      statTitle: 'Ratings',
      statistics: '13k',
      change: '+38%',
      chipText: 'Year of 2021',
      chipColor: 'primary',
      avatar: require('@/assets/images/avatars/9.png'),
      avatarWidth: '111',
    }
    const sessionsOptions = {
      statTitle: 'Sessions',
      statistics: '24.5k',
      change: '-22%',
      chipText: 'Last Week',
      chipColor: 'secondary',
      avatar: require('@/assets/images/avatars/10.png'),
      avatarWidth: '86',
    }
    const ratingsGateway = {
      statTitle: 'Ratings',
      statistics: '13k',
      change: '+38%',
      chipText: 'Year of 2021',
      chipColor: 'primary',
      avatar: require('@/assets/images/avatars/device/G1-2.png'),
      avatarWidth: '200',
    }
    const { isDark } = useAppConfig()
    return {
      ratingsOptions,
      sessionsOptions,
      ratingsGateway,
      isDark,
    }
  },
  methods: {
    success_long() {
      //do we support geolocation
      if (!('geolocation' in navigator)) {
        this.errorStr = 'Geolocation is not available.'
        return
      }

      this.gettingLocation = true
      // get position
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.gettingLocation = false
          this.location = pos
        },
        err => {
          this.gettingLocation = false
          this.errorStr = err.message
        },
      )
    },

    doSubscribe() {
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, qos, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    },
  },
  mounted() {
    const { host, port, endpoint, ...options } = this.connection
    const connectUrl = `ws://52.77.38.225:8083`
    console.log(connectUrl)
    console.log(mqtt)
    try {
      this.client = mqtt.connect(connectUrl)
    } catch (error) {
      console.log('mqtt.connect error', error)
    }
    this.client.on('connect', () => {
      console.log('Connection succeeded!')
      this.doSubscribe()
    })
    this.client.on('error', error => {
      console.log('Connection failed', error)
    })
    this.client.on('message', (topic, message) => {
      console.log(message)
      this.model = []
      let temp = { All: [], IG: [], OG: [], PG: [], ST: [], WT: [], SMT: [], BT: [], LT: [], WP: [] }
      this.receiveNews = this.receiveNews.concat(message)
      this.data_a = JSON.parse(message)
      Object.keys(this.data_a).forEach(element => {
        Object.keys(temp).forEach((key, index) => {
          console.log(this.data_a[element].Model)
          if (key == this.data_a[element].Type) {
            temp[key].push(this.data_a[element])
            temp['All'].push(this.data_a[element])
            this.tab_list[index].list_device = temp[key]
            this.tab_list[0].list_device = temp['All']
          }
        })
      })
    })
    this.success_long()
  },
}
</script>
<style scoped lang="scss"></style>
