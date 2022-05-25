<template>
  <v-card>
    <v-card-title>{{$tc('healthcare.today',2)}}</v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-uppercase">{{$tc('healthcare.date')}}</th>
              <th class="text-center text-uppercase">{{$tc('healthcare.temperature')}}</th>
              <th class="text-center text-uppercase">{{$tc('healthcare.location')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in dataTable" :key="i">
              <td>{{ item.date }}</td>
              <td class="text-center">
                  <span :style="{color:item.temp<38?'#16B1FF':'#FF4C51'}">

                {{ item.temp }} °C
                  </span>
              </td>
              <td class="text-center">
                {{ item.location }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props:{
    dataTable:Array,
  },
  data() {
    return {
      today: [
        {
          date: 'Today 6:00',
          temp: 36.2,
          location: 'Chatuchak, Bangkok',
        },
        {
          date: 'Today 6:30',
          temp: 40.8,
          location: 'Chatuchak, Bangkok',
        },
        {
          date: 'Today 7:00',
          temp: 41.5,
          location: 'Chatuchak, Bangkok',
        },
      ],
    }
  },
}
</script>

<style></style>
