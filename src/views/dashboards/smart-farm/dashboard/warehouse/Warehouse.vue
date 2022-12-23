<template>
  <div>
    <v-row>
      <v-col>
        <h3>{{ $tc('warehouse.dashboard', 3) }}</h3>
      </v-col>
    </v-row>
    <v-row class="match-height">
      <!-- <v-col cols="auto" class="d-flex flex-column align-center justify-center"> 
        <v-icon size="50">
          {{ icons.mdiAccountDetails }}
        </v-icon>
        <span>workers</span>
      </v-col> -->
      <v-col v-for="(item, i) in pallets" :key="i" class="pa-2">
        <warehouse-card-pallet :item="item" />
      </v-col>
    </v-row>
    <v-row class="match-height">
    </v-row>
    <v-row>
      <v-col cols="12" md="3" sm="6" v-for="(item, i) in zone" :key="i" class="pa-2 d-flex">
        <warehouse-card-zone :items="item"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiAccountDetails, mdiMagnify } from '@mdi/js'
import WarehouseCardPallet from './WarehouseCardPallet.vue'
import WarehouseCardZone from './WarehouseCardZone.vue'
export default {
  components: { WarehouseCardPallet, WarehouseCardZone },
  data() {
    return {
      icons: {
        mdiMagnify,
        mdiAccountDetails,
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
          title: 'Total Active Tag',
          value: 56,
          total: 100,
          color: '#977DF9',
          img: 'Tag.png'
        },
        {
          title: 'Total Active Asset',
          value: 25,
          total: 80,
          color: '#E482EE',
          img: 'Asset.png'
        },
        {
          title: 'Total Active Sensor',
          value: 390,
          total: 400,
          color: '#FE7FA2',
          img: 'Sensor.png'
        },
        {
          title: 'Alert',
          value: '2',
          color: '#FF6363',
          img: 'Alert.png'
        },
      ],
      workers: [
        {
          title: 'on active duty',
          value: '29/36',
          color: '#6DD981',
          icon: mdiAccountDetails,
        },
        {
          title: 'missing on work place',
          value: '03',
          color: '#FCC165',
          icon: mdiAccountDetails,
        },
        {
          title: 'worker on leave',
          value: '07',
          color: '#78AFFF',
          icon: mdiAccountDetails,
        },
        {
          title: 'entered at hazards zone',
          value: '4/29',
          color: '#FF5B00',
          icon: mdiAccountDetails,
        },
        {
          title: 'social distancing incidents',
          value: '02',
          color: '#FF4040',
          icon: mdiAccountDetails,
        },
      ],
      zone: [
        {
          name:'a',
          workers:Math.floor(Math.random()*10),
          pallets:Math.floor(Math.random()*10)
        },
        {
          name:'b',
          workers:Math.floor(Math.random()*10),
          pallets:Math.floor(Math.random()*10)
        },
        {
          name:'c',
          workers:Math.floor(Math.random()*10),
          pallets:Math.floor(Math.random()*10)
        },
        {
          name:'d',
          workers:Math.floor(Math.random()*10),
          pallets:Math.floor(Math.random()*10)
        },
        {
          name:'e',
          workers:Math.floor(Math.random()*10),
          pallets:Math.floor(Math.random()*10)
        },
      ],
      userData:null,
      interval:null,
    }
  },
  beforeDestroy(){
    clearInterval(this.interval)
  },
  mounted(){
    this.userData = this.$cookies.get('userData')
    this.interval = setInterval(()=>{
      this.getData()
    },1000*60)
  },
  methods:{
    async getData(){
      try {
       let res = await this.$http.get(`/v1/custumer-sensor/list-by-location?custumerID=${this.userData.custumerID}`)
       console.log(res);
       let zone = []
       for (const key in res.data?.data) {
          const el = res.data?.data[key];

          console.log(el);
          let assets = []
          let tag = []
          el.forEach((item)=>{
            if (item.type === 'Asset') {
              assets.push(item)
            }else if (item.type === 'Tag') {
              tag.push(item)
            }
          })

          zone.push({
            name:key,
            workers:[...tag],
            pallets:[...assets],
          })
        
       }

       this.zone = [...zone]
      } catch (error) {
        
      }
    },
  }
}
</script>

<style></style>
