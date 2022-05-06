<template>
  <v-card :style="{background:item.color,color:'#fff  !important',}">
      <v-row class="ma-0" style="height:100%">
          <v-col cols="auto" class="d-flex align-center">
              <div style="font-size: 1.5rem;font-weight: bold;">
              {{item.value}}
              </div>
          </v-col>
          <v-col class="d-flex align-center">
              <!-- <div style="font-size: 1.1rem;">

              {{item.title}}
              </div> -->
              <div style="font-size: 1.1rem;">

              {{$tc(`warehouse.${item.title}`,2)}}
              </div>
          </v-col>
          <v-col cols="auto" class="d-flex align-center" v-if="item.icon != undefined">
             <v-icon size="40" :style="{color:'#fff  !important'}">
                {{ item.icon }}
              </v-icon>
          </v-col>
      </v-row>
  </v-card>
</template>

<script>

export default {
  props: {
    item: Object,
  },
}
</script>

<style>
</style>