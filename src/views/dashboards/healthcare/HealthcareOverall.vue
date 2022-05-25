<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-row class="ma-0">
          <v-col class="text-center" style="color: var(--v-error-base)">
            <div class="text-capitalize">{{ $tc('healthcare.at risk') }}</div>
            <div class="text-h5 font-weight-bold">6</div>
            <div></div>
          </v-col>
          <v-col class="text-center" style="color: var(--v-error-base)">
            <div class="text-capitalize">{{ $tc('healthcare.with fever') }}</div>
            <div class="text-h5 font-weight-bold">6</div>
            <div>+10</div>
          </v-col>
          <v-col class="text-center">
            <div class="text-capitalize">{{ $tc('healthcare.active') }}</div>
            <div class="text-h5 font-weight-bold">6</div>
            <div style="color: var(--v-info-base)">+5</div>
          </v-col>
          <v-col class="text-center" style="color: var(--v-third-base)">
            <div class="text-capitalize">{{ $tc('healthcare.inactive') }}</div>
            <div class="text-h5 font-weight-bold">6</div>
            <div></div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title class="text-capitalize">{{ $tc('healthcare.fever cases') }}</v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1">
            <template v-slot:item.temp="{ item }">
              <div :style="{ color: item.temp < 38 ? '#16B1FF' : '#FF4C51' }">{{ item.temp }} °C</div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title class="text-capitalize">{{ $tc('healthcare.higher fever') }}</v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1">
            <template v-slot:item.temp="{ item }">
              <div :style="{ color: item.temp < 38 ? '#16B1FF' : '#FF4C51' }">{{ item.temp }} °C</div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: this.$tc('healthcare.name', 2),
          align: 'start',
          value: 'name',
        },
        { text: this.$tc('healthcare.temperature', 2), value: 'temp' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          temp: 39,
        },
        {
          name: 'Ice cream sandwich',
          temp: 37,
        },
        {
          name: 'Eclair',
          temp: 42.1,
        },
        {
          name: 'Cupcake',
          temp: 36.5,
        },
        {
          name: 'Gingerbread',
          temp: 35.6,
        },
        {
          name: 'Jelly bean',
          temp: 37.5,
        },
        {
          name: 'Lollipop',
          temp: 39.2,
        },
        {
          name: 'Honeycomb',
          temp: 40.8,
        },
        {
          name: 'Donut',
          temp: 41.2,
        },
        {
          name: 'KitKat',
          temp: 38,
        },
      ],
    }
  },
}
</script>

<style></style>
