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
        <span class="font-weight-semibold text-base text--primary">{{ 'Porter Add Device' }}</span>
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
            v-model="formData.deviceID"
            outlined
            dense
            :rules="[validators.required]"
            label="Device ID"
            placeholder="Device ID"
            hide-details="auto"
            class="mb-6"
            :disabled="disable"
          ></v-text-field>

          <v-autocomplete
            v-model="formData.responseAdmin"
            :items="allUserData"
            item-text="name"
            item-value="username"
            label="Admin"
            :rules="[validators.required]"
            single-line
            outlined
            hide-details="auto"
            class="mb-6"
          ></v-autocomplete>

          <!-- <v-textarea
            v-model="formData.description"
            outlined
            dense
            label="Description"
            placeholder="Description"
            hide-details="auto"
            class="mb-6"
          ></v-textarea> -->

          <v-btn color="primary" class="me-3" type="submit" @click="submitForm" v-if="!disable"> Add </v-btn>
          <v-btn color="primary" class="me-3" type="submit" @click="updateForm" v-else> update </v-btn>
          <v-btn color="secondary" outlined type="reset"> Cancel </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { required, emailValidator } from '@core/utils/validation'
import Alert from '@/utils/Alert.vue'

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
    allUserData: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    return {
      // validation
      validators: { required, emailValidator },
      icons: {
        mdiClose,
      },
    }
  },
  components: { Alert },
  data() {
    return {
      location: JSON.parse(localStorage.getItem('location')),
      formData: {
        custumerID: '',
        deviceID: '',
        locationID: '',
        locationName: '',
        responseAdmin: '',
        locationSort: '',
      },
      disable: false,
      error: '',
      alert: false,
      valid: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        console.log(this.location)
        let res = await this.$http.get(`/v1/location-device/list/?custumerID=${this.location.customerID}`)
        console.log(res)
        if (res.data.isSuccess) {
          let formData = res.data.data.find(el => el.locationSort === this.location.locationSort)
          if (formData) {
            delete formData.createdAt
            delete formData.updatedAt
            console.log(formData)
            this.disable = true
            this.formData = { ...formData }
          } else {
            this.disable = false
            this.formData = {
              custumerID: this.location.custumerID,
              deviceID: '',
              locationID: this.location.locationID,
              locationName: this.location.locationName,
              responseAdmin: '',
              locationSort: this.location.locationSort,
            }
          }
        } else {
          this.disable = false
          this.formData = {
            custumerID: this.location.custumerID,
            deviceID: '',
            locationID: this.location.locationID,
            locationName: this.location.locationName,
            responseAdmin: '',
            locationSort: this.location.locationSort,
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async submitForm(e) {
      e.preventDefault()
      this.$refs.form.validate()
      try {
        console.log(this.valid)
        console.log(this.propFormData)
        if (this.valid) {
          let body = {
            ...this.formData,
          }
          console.log(body)
          let res = await this.$http.post('v1/location-device/create', body)
          console.log(res)
          this.$emit('refetch-data')
          this.$emit('update:is-sidebar-active', false)
        }
      } catch (error) {
        console.error(error)
        this.error = error.data.message
        this.alert = true
      }
    },
    async updateForm(e) {
      e.preventDefault()
      this.$refs.form.validate()
      try {
        console.log(this.valid)
        console.log(this.propFormData)
        if (this.valid) {
          let body = {
            ...this.formData,
          }
          console.log(body)
          let res = await this.$http.put('v1/location-device/create', body)
          console.log(res)
          this.$emit('refetch-data')
          this.$emit('update:is-sidebar-active', false)
        }
      } catch (error) {
        console.error(error)
        this.error = error.data.message
        this.alert = true
      }
    },
  },
  watch: {
    propFormData: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal == undefined) {
          // this.formData = {
          //   custumerID: '',
          //   deviceID: '',
          //   locationID: '',
          //   locationName: '',
          //   responseAdmin: '',
          //   locationSort: '',
          // }
        } else {
          // this.formData = { ...newVal }
        }
        console.log(!!newVal.deviceID)
        // this.getData()
        if (!!newVal.deviceID) {
        }
      },
      deep: true,
    },
  },
}
</script>
