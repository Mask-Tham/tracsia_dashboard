<template>
  <div>
    <v-row class="match-height">
      <v-col v-for="(item, item_i) in listCardCount" :key="item_i" cols="12" :md="sizeCard(item_i)">
       <tracle-count-card :item="item"></tracle-count-card>
      </v-col>
    </v-row>
    <v-row class="match-height">
      <v-col cols="12" md="3" sm="6" v-for="(item, item_i) in zone" :key="item_i" class="pa-2 d-flex">
        <tracle-zone-card :item="item"></tracle-zone-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TracleZoneCard from '@/components/dashboard/tracle/TracleZoneCard.vue'
import TracleCountCard from '@/components/dashboard/tracle/TracleCountCard.vue'
export default {
  components: {  TracleZoneCard, TracleCountCard },
  data() {
    return {
      listCardCount: [
        {
          title: 'total active gateway',
          count: 1,
          total: 1,
          img: require('@/assets/images/device/MKGW1.png'),
          color: 'blueSky',
        },
        { title: 'total active gateway', count: 1, total: 2, img: '', color: 'levender' },
        { title: 'total active gateway', count: 0, total: 1, img: '', color: 'pink' },
        { title: 'total active gateway', count: 0, total: 1, img: '', color: 'teaRose' },
        { title: 'total active gateway', count: 0, img: '', color: 'red' },
      ],
      zone: [
        {
          name: 'a',
          workers: Math.floor(Math.random() * 10),
          pallets: Math.floor(Math.random() * 10),
        },
        {
          name: 'b',
          workers: Math.floor(Math.random() * 10),
          pallets: Math.floor(Math.random() * 10),
        },
        {
          name: 'c',
          workers: Math.floor(Math.random() * 10),
          pallets: Math.floor(Math.random() * 10),
        },
        {
          name: 'd',
          workers: Math.floor(Math.random() * 10),
          pallets: Math.floor(Math.random() * 10),
        },
        {
          name: 'e',
          workers: Math.floor(Math.random() * 10),
          pallets: Math.floor(Math.random() * 10),
        },
      ],
    }
  },
  methods: {
    sizeCard(index) {
      return index >= this.listCardCount.length - 3 ? 2 : 3
    },
  },
}
</script>

<style></style>
