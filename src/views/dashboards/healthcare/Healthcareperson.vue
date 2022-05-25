<template>
  <div>
    <v-row>
      <v-col cols="12" md="2">
        <healthcare-card-bio-panal />
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="12">
            <healthcare-card-location />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="7" class="pa-0">
            <v-col>
              <v-card><healthcare-card-today :dataTable="today" /></v-card>
            </v-col>
            <v-col>
              <v-card>
                <!-- <healthcare-card-today :dataTable="path7days" /> -->
                <healthcare-card-part :dataTable="path7days" />
              </v-card>
            </v-col>
          </v-col>
          <v-col cols="12" md="5"  class="pa-0">
            <v-col>
              <healthcare-card-accessory />
            </v-col>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4"><healthcare-overall/></v-col>
    </v-row>
  </div>
</template>

<script>
import HealthcareCardAccessory from './HealthcarepersonCardAccessory.vue'
import HealthcareCardBioPanal from './HealthcarepersonCardBioPanal.vue'
import HealthcareCardLocation from './HealthcarepersonCardLocation.vue'
import HealthcareCardPart from './HealthcarepersonCardPart.vue'
import HealthcareCardToday from './HealthcarepersonCardToday.vue'
import HealthcareOverall from './HealthcareOverall.vue'
export default {
  components: {
    HealthcareCardBioPanal,
    HealthcareCardToday,
    HealthcareCardLocation,
    HealthcareCardPart,
    HealthcareCardAccessory,
    HealthcareOverall,
  },
  data() {
    return {
      today: [],
      path7days: [],
    }
  },
  mounted() {
    console.log(this.$moment().format('H:mm'))
    for (let i = 0; i < 3; i++) {
      let time = new Date().getTime() - 1000 * 60 * 30 * i
      this.today.push({
        date: 'Today ' + this.$moment(time).format('H:mm'),
        temp: Math.floor((Math.random() * (42 - 36) + 36) * 10) / 10,
        location: 'Chatuchak, Bangkok',
      })
    }
    for (let i = 0; i < 7; i++) {
      let time = new Date().getTime() - 1000 * 60 * 60 * 24 * i
      this.path7days.push({
        date: this.$moment(time).format('MMM DD, YYYY'),
        temp: Math.floor((Math.random() * (42 - 36) + 36) * 10) / 10,
        location: 'Chatuchak, Bangkok',
      })
    }
  },
}
</script>

<style></style>
