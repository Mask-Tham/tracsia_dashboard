<template>
  <div>
    <v-row class="match-height">
      <v-col v-for="(item, item_i) in listCardCount" :key="item_i" cols="12" :md="sizeCard(item_i)" class="">
        <tracle-count-card :item="item"></tracle-count-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </div>
</template>

<script>
import TracleCountCard from '@/components/dashboard/tracle/TracleCountCard.vue'
export default {
  components: { TracleCountCard },
  data() {
    return {
      listCardCount: [
        { title: 'total active gateway', count: 1, total: 1, img: require('@/assets/images/device/MKGW1.png'),color:'blueSky' },
        { title: 'total active gateway', count: 1, total: 2, img: '',color:'levender' },
        { title: 'total active gateway', count: 0, total: 1, img: '',color:'pink' },
        { title: 'total active gateway', count: 0, total: 1, img: '',color:'teaRose' },
        { title: 'total active gateway', count: 0, img: '',color:'red' },
      ],
    }
  },
  computed:{
},
methods:{
      sizeCard(index){
        
        return index >= this.listCardCount.length - 3 ? 2 : 3
      }

  },
}
</script>

<style></style>
