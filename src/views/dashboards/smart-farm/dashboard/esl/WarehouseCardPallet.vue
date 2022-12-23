<template>
  <v-card :style="{ background: item.color, color: '#fff  !important', }">
    <v-row class="ma-0" style="height:100%">
      <v-col cols="3" class="d-flex align-center">
        <img width="100" :src="require(`@/assets/images/dashboard/device/${item.img}`)">
        <!-- <div style="font-size: 1.5rem;font-weight: bold;">
              {{item.value}}
              </div> -->
      </v-col>
      <v-col cols="9" class="d-flex align-center">
        <ul class="tw-list-none tw-w-full" align="center" style="padding-left: 0px;">
          <li style="font-size: 2rem;">
            {{ item.title }}
          </li>
          <li style="font-size: 2rem;">
            {{ item.value }} /{{ item.total }}
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