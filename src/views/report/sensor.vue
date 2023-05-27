<template>
<div style="padding: 10px;">
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template v-slot:item.name="{ item }">
      <v-icon :color="'#84E0BE'" size="20">{{ icons.mdiSignal}}</v-icon> Lora Sensor {{ item.id }}
    </template>
    <template v-slot:item.carbs="{ item }">
      <v-icon :color="'#84E0BE'" size="20">{{ icons.mdiBattery}}</v-icon>
    </template>
  </v-data-table>
</div>
</template>

<script>
import { mdiBattery, mdiCheckCircle, mdiCloseCircle, mdiSignal } from '@mdi/js'
export default {
  data() {
    return {
      headers: [
        {
          text: 'Sensor Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Sensor Type', value: 'type' },
        { text: 'Reading Data', value: 'fat' },
        { text: 'Battery', value: 'carbs' },
        { text: 'Timestamp', value: 'protein' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          type: 'Lora',
          fat: 'rssi: -55',
          carbs: 24,
          protein: '2022-02-23 16:34:20',
          id: 1,
        },
        {
          name: 'Ice cream sandwich',
          type: 'Lora',
          fat: 'humiditySensor: 9.0%',
          carbs: 37,
          protein: '2022-02-27 18:34:41',
          id: 2,
        },
        {
          name: 'Eclair',
          type: 'Lora',
          protein: '2022-02-27 18:34:41',
          carbs: 23,
          fat: 'humiditySensor: 7.0%',
          id: 3,
        },
        {
          name: 'Cupcake',
          type: 'Lora',
          fat: 'rssi: 3.7',
          carbs: 67,
          protein: '2022-02-28 11:12:08',
          id: 4,
        },
        {
          name: 'Gingerbread',
          type: 'Lora',
          fat: 'temperatureSensor: 31.0°C',
          carbs: 49,
          protein: '2022-02-28 18:34:39',
          id: 16,
        },
        {
          name: 'Jelly bean',
          type: 'Lora',
          fat: 'temperatureSensor: 36.0°C',
          carbs: 94,
          protein: '2022-02-28 18:34:39',
          id: 70,
        },
        {
          name: 'Lollipop',
          type: 'Lora',
          fat: 'humiditySensor: 9.0%',
          carbs: 98,
          protein: '2022-02-28 18:34:39',
          id: 2,
        },
        {
          name: 'Honeycomb',
          type: 'Lora',
          fat: 'temperatureSensor: 36.0°C',
          carbs: 87,
          protein: '2022-02-28 18:34:39',
          id: 45,
        },
        {
          name: 'Donut',
          type: 'Lora',
          fat: 'temperatureSensor: 36.0°C',
          carbs: 51,
          protein: '2022-03-30 18:34:39',
          id: 22,
        },
        {
          name: 'KitKat',
          type: 'Lora',
          fat: 'rssi: -35',
          carbs: 65,
          protein: '2022-03-30 18:34:39',
          id: 6,
        },
      ],
      icons: {
        mdiSignal,
        mdiBattery,
        mdiCheckCircle,
        mdiCloseCircle,
      },
    }
  },
  methods: {
    getColor(calories) {
      if (calories > 400) return 'red'
      else if (calories > 200) return 'orange'
      else return 'green'
    },
  },
}
</script>
<style  scoped>
</style>
