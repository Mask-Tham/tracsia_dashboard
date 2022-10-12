<template>
  <div>
    <v-card>
      <v-form ref="form" v-model="valid">
        <v-card-title> TracBOT Device Registration </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="infoDevice.location"
                outlined
                dense
                :rules="[validators.required]"
                label="Location Name"
                placeholder="Location Name"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="infoDevice.id"
                outlined
                dense
                :rules="[validators.required]"
                label="Device ID"
                placeholder="Device ID"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea outlined v-model="infoDevice.des" label="Description" hide-details></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <div style="width:100%;height:300px;">
            <!-- <span>{{infoDevice}}</span> -->
            <map-pick-center v-model="infoDevice.latLong"></map-pick-center>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" @click="add"> Add </v-btn>
          <v-btn @click="clear"> Clear </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { required } from '@core/utils/validation'
import MapPickCenter from '@/views/components/map/MapPickCenter.vue'

export default {
  components: { MapPickCenter },
  data() {
    return {
      infoDevice: {
        location: '',
        id: '',
        des: '',
        latLong: [13.8088364,100.5532687],
      },
      valid: false,
      validators: { required },
    }
  },
  methods: {
    add(){
        this.$refs.form.validate()
        try {
            if (this.valid) {
             this.$router.push('/tracbot/dashboard')   
            }
        } catch (error) {
            console.error(error);
        }
    },
    clear() {
      this.infoDevice = {
        location: '',
        id: '',
        des: '',
        latLong: [],
      }
    },
  },
}
</script>

<style></style>
