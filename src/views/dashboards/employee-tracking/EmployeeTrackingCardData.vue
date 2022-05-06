<template>
  <v-card>
    <v-card-title>
      <slot name="title">
        <div class="text-capitalize">
          {{ $tc(`employee_tracking.${item.title}`) }} 
        </div>
      </slot>
    </v-card-title>
    <v-card-text>
      <slot name="value">
        <div class="d-flex align-end" style="gap: 5px">
          <div class="text-h5 font-weight-bold">
            {{ item.data }}
          </div>
          <div class="d-flex align-center" style="font-size: 0.8rem;" :style="{color:item.trend == 'up'? '#67ED90':'#FFD65C'}">
            <div>
              <span v-if="item.trend == 'down'" class="material-icons" style="font-size: 0.9rem;">south_east</span> 
              <span v-if="item.trend == 'up'" class="material-icons" style="font-size: 0.9rem;">north_east</span>   

            </div>
            <div>
              {{ item.trend_data }} %
            </div>
          </div>
        </div>
      </slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object,
  },
}
</script>

<style></style>
