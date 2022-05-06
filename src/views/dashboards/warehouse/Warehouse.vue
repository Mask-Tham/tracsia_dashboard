<template>
  <div>
    <v-row>
      <v-col>
        <h3>{{ $tc('warehouse.dashboard', 3) }}</h3>
      </v-col>
      <v-col cols="12" lg="7" md="8" sm="12">
        <v-row class="d-flex justify-end">
          <v-col cols="auto">
            <span>{{ $tc('warehouse.search by', 2) }}</span>
          </v-col>
          <v-col class="pa-1" cols="6" sm="2">
            <v-text-field
              solo
              :placeholder="$tc('warehouse.order number', 2)"
              :append-icon="icons.mdiMagnify"
              class=""
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col class="pa-1" cols="6" sm="2">
            <v-text-field
              solo
              :placeholder="$tc('warehouse.cadbury', 1)"
              :append-icon="icons.mdiMagnify"
              class=""
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col class="pa-1" cols="6" sm="2">
            <v-text-field
              solo
              :placeholder="$tc('warehouse.product type', 1)"
              :append-icon="icons.mdiMagnify"
              class=""
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col class="pa-1" cols="6" sm="2">
            <v-text-field
              solo
              :placeholder="$tc('warehouse.uid number', 2)"
              :append-icon="icons.mdiMagnify"
              class=""
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col class="pa-1" cols="auto">
            <v-btn depressed color="accent"> {{ $tc('warehouse.search', 3) }} </v-btn>
          </v-col>
        </v-row>
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
      <!-- <v-col cols="auto" class="d-flex flex-column align-center justify-center"> 
        <v-icon size="50">
          {{ workers[0].icon }}
        </v-icon>
        <span>workers</span>
      </v-col> -->
      <v-col v-for="(item, i) in workers" :key="i" class="pa-2">
        <warehouse-card-pallet :item="item" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" sm="6" v-for="(item, i) in zone" :key="i" class="pa-2 d-flex">
        <warehouse-card-zone :item="item"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiMagnify, mdiAccountDetails } from '@mdi/js'
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
          title: 'total pallet',
          value: 59,
          color: '#6DD981',
        },
        {
          title: 'pallets in plan',
          value: 56,
          color: '#31C5AB',
        },
        {
          title: 'pallets in trasit',
          value: 25,
          color: '#7DA5EA',
        },
        {
          title: 'pallets @ customer location',
          value: 130,
          color: '#8B68FC',
        },
        {
          title: 'pallets at wrong location',
          value: '02',
          color: '#FF4040',
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
    }
  },
}
</script>

<style></style>
