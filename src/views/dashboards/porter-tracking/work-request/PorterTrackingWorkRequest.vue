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
            v-model="formData.subject"
            outlined
            dense
            :rules="[validators.required]"
            label="Device ID"
            placeholder="Device ID"
            hide-details="auto"
            class="mb-6"
            disabled
          ></v-text-field>

          <v-text-field
            v-model="formData.admin"
            outlined
            dense
            :rules="[validators.required]"
            label="Admin"
            placeholder="Admin"
            hide-details="auto"
            class="mb-6"
            disabled
          ></v-text-field>

          <v-text-field
            v-model="formData.pickUpLocation"
            outlined
            dense
            :rules="[validators.required]"
            label="Pick-up Location"
            placeholder="Pick-up Location"
            hide-details="auto"
            class="mb-6"
            disabled
          ></v-text-field>

          <v-select
            v-model="formData.targetLocation"
            :items="customerData"
            item-text="admin"
            item-value="admin"
            label="Target Location"
            :rules="[validators.required]"
            single-line
            outlined
            dense
            hide-details="auto"
            class="mb-6"
            :disabled="propFormData != undefined"
          ></v-select>

          <v-text-field
            v-model="formData.duration"
            outlined
            dense
            :rules="[validators.required]"
            label="Target Duration Time"
            placeholder="Target Duration Time"
            hide-details="auto"
            class="mb-6"
            disabled
          ></v-text-field>

          <v-textarea
            v-model="formData.description"
            outlined
            dense
            label="Description"
            placeholder="Description"
            hide-details="auto"
            class="mb-6"
          ></v-textarea>

          <v-btn color="primary" class="me-3" type="submit" @click="createRole"> Add </v-btn>
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
    customerData: {
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
      formData: {
        subject: '',
        admin: '',
        patientID: '',
        pickUpLocation: '',
        targetLocation: '',
        duration: '',
        description: '',
      },
      error: '',
      alert: false,
      valid: false,
    }
  },
  methods: {
    async createRole(e) {
      e.preventDefault()
      this.$refs.form.validate()
      try {
        console.log(this.valid)
        console.log(this.formData)
        if (this.valid) {
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
    propFormData: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal == undefined) {
          this.formData = {
            roleID: '',
            description: '',
            custumerID: '',
            isUse: true,
          }
        } else {
          this.formData = newVal
        }
      },
      deep: true,
    },
  },
}
</script>
