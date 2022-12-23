<template>
  <v-card :style="{ background: item.color, color: '#fff  !important', }">
    <v-row class="ma-0" style="height:100%">
      <v-col cols="4" class="d-flex align-center">
        <img width="70" :src="require(`@/assets/images/dashboard/device/${item.img}`)">
        <!-- <div style="font-size: 1.5rem;font-weight: bold;">
              {{item.value}}
              </div> -->
      </v-col>
      <v-col cols="8" class="d-flex align-center">
        <ul class="tw-list-none tw-w-full" style="padding-left: 0px;">
          <li style="font-size: 1.1rem;">
            {{ item.title }}
          </li>
          <li style="font-size: 1.1rem;">
            {{ item.value }} <span v-if="item.title != 'Alert'">/{{ item.total }}</span>
          </li>
          <li v-if="item.title != 'Alert'">
            <v-progress-linear rounded background-color="#DEDEDE" color="#78E0FF" height="10"
              :value="percentage(item.value,item.total)"></v-progress-linear>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  props: {
    item: Object,
  },
  methods: {
    percentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    }
  }
}
</script>

<style>

</style>