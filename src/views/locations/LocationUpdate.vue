<template>
  <v-navigation-drawer
    :value="isSidebarActive"
    temporary
    touchless
    :right="!$vuetify.rtl"
    :width="$vuetify.breakpoint.smAndUp ? 350 : '100%'"
    app
    @input="val => $emit('update:is-sidebar-active', val)"
  >
    <v-card height="100%">
      <div class="drawer-header d-flex align-center mb-4">
        <span class="font-weight-semibold text-base text--primary text-capitalize">{{ 'edit location' }}</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="$emit('update:is-sidebar-active', false)">
          <v-icon size="22">
            {{ icons.mdiClose }}
          </v-icon>
        </v-btn>
      </div>

      <v-card-text>
        <alert :isShow="alert" :message="error"></alert>
      </v-card-text>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="formData.locationName"
            outlined
            dense
            :rules="[validators.required, validators.locationValidator]"
            label="Location Name"
            placeholder="Location Name"
            hide-details="auto"
            class="mb-6"
            :disabled="propFormData != undefined"
          ></v-text-field>

          <!-- <v-select
            v-model="formData.admin"
            :items="customerData"
            item-text="admin"
            item-value="admin"
            label="Admin"
            :rules="[validators.required]"
            single-line
            outlined
            hide-details="auto"
            class="mb-6"
            :disabled="propFormData != undefined"
          ></v-select>

          <v-textarea
            v-model="formData.description"
            outlined
            dense
            label="Description"
            placeholder="Description"
            hide-details="auto"
            class="mb-6"
          ></v-textarea> -->

          <v-btn color="primary" class="me-3" type="submit" @click="sendCreate"> Add </v-btn>
          <v-btn color="secondary" outlined type="reset"> Cancel </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { required, emailValidator, locationValidator } from '@core/utils/validation'
import Alert from '@/utils/Alert.vue'
import axiosIns from '@/plugins/axios'

export default {
  model: {
    prop: 'isSidebarActive',
    event: 'update:is-sidebar-active',
  },
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    propFormData: {
      type: Object,
    },
    customerData: {
      type: Array,
    },
    nodeData: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    return {
      // validation
      validators: { required, emailValidator, locationValidator },
      icons: {
        mdiClose,
      },
    }
  },
  components: { Alert },
  data() {
    return {
      formData: {
        custumerID: '',
        locationID: '',
        locationName: '',
        locationSort: '',
        adminCreate: '',
        adminUpdate: '',
        image: '',
      },
      error: '',
      alert: false,
      valid: false,
    }
  },
  methods: {
    async sendCreate(e) {
      e.preventDefault()
      this.$refs.form.validate()
      try {
        console.log(this.valid)
        console.log(this.formData)
        if (this.valid) {
          const userData = this.$cookies.get('userData')
          console.log(userData)
          const axios = axiosIns
          const body = {
            locationName: this.formData.locationName,
            locationSort: `${this.nodeData.path || ''}${this.formData.locationName}#`,
            custumerID: `${userData.custumerID}`,
            adminCreate: '',
            adminUpdate: '',
            image: '',
          }
          console.log(body)

          let res = await this.$http.post('v1/location/create', body)
          console.log(res)
          // refesh data
        }
      } catch (error) {
        console.error(error)
        this.error = error.data.message
        this.alert = true
      }
    },
  },
  watch: {
    nodeData: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal == undefined) {
          //   this.formData = {
          //     roleID: '',
          //     description: '',
          //     custumerID: '',
          //     isUse: true,
          //   }
        } else {
          //   this.formData = newVal
        }
      },
      deep: true,
    },
  },
}
</script>
