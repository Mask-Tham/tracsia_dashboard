<template>
  <v-dialog v-model="dialog" width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn tile icon v-bind="attrs" v-on="on">
        <v-icon left> {{ icons.mdiPencil }} </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Add </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-2"
        >
          <v-text-field v-model="form.name" :rules="[validate.required]" label="Name" disabled></v-text-field>
          <v-text-field v-model="form.barcode" label="barcode"></v-text-field>
          <v-text-field v-model="form.qrcode" label="qrcode"></v-text-field>
          <v-text-field v-model="form.label1" label="label1"></v-text-field>
          <v-text-field v-model="form.label2" label="label2"></v-text-field>
          <v-text-field v-model="form.label3" label="label3"></v-text-field>
          <v-text-field v-model="form.label4" label="label4"></v-text-field>
          <v-text-field v-model="form.label5" label="label5"></v-text-field>
          <v-text-field v-model="form.label6" label="label6"></v-text-field>
          <v-text-field v-model="form.label7" label="label7"></v-text-field>
          <v-text-field v-model="form.label8" label="label8"></v-text-field>
          <v-text-field v-model="form.label9" label="label9"></v-text-field>
          <v-text-field v-model="form.label10" label="label10"></v-text-field>
          <v-text-field v-model="form.label11" label="label11"></v-text-field>
          <v-text-field v-model="form.label12" label="label12"></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="addNew"> update </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { emailValidator, required } from '@core/utils/validation'
import { mdiPencil } from '@mdi/js'
import axios from 'axios'

export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      valid: false,
    //   form: {
    //     name: 'goods',
    //     barcode: 'goods',
    //     qrcode: 'http://minew.com',
    //     label1: '6901939721247',
    //     label2: 'http://minew.com',
    //     label3: '6901939721247',
    //     label4: 'Dyson HairD',
    //     label5: 'Dyson',
    //     label6: '5.80',
    //     label7: 'Nice',
    //     label8: '699',
    //     label9: 'A',
    //     label10: 'Pieces',
    //     label11: 'UK',
    //     label12: 'Great',
    //   },
      icons: {
        mdiPencil,
      },
      validate: {
        required,
      },
      userData: null,
    }
  },
  mounted() {
    this.userData = this.$cookies.get('userData')
  },
  methods: {
    async addNew() {
      try {
        var data = JSON.stringify({
          username: 'Test149',
          password: 'Swift149',
        })

        var config = {
          method: 'post',
          url: 'http://esl.minew.com:9191/V1/Login',
          headers: {
            'Content-Type': 'application/json',
            Cookie: 'JSESSIONID=277EF572A7AF921430170C1CF8D5B365',
          },
          data: data,
        }

        let minew = await axios(config)
        console.log(minew)
        let body = {
            ...this.form,
          customerID: this.userData.custumerID,
          token: minew.data.body.token,
        }
        delete body.createdAt
        delete body.updatedAt
        console.log(body)
        let res = await this.$http.put(`/v1/minew-api/update`, body)
        console.log(res)
        this.dialog = false
        this.$emit('refetch-data')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style></style>
