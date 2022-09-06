<template>
  <v-navigation-drawer
    :value="isAddNewUserSidebarActive"
    temporary
    touchless
    :right="!$vuetify.rtl"
    :width="$vuetify.breakpoint.smAndUp ? 350 : '100%'"
    app
    @input="val => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <v-card height="100%">
      <div class="drawer-header d-flex align-center mb-4">
        <span class="font-weight-semibold text-base text--primary">{{
          !propRoleData ? 'Add New Customer' : 'Edit Customer'
        }}</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="$emit('update:is-add-new-user-sidebar-active', false)">
          <v-icon size="22">
            {{ icons.mdiClose }}
          </v-icon>
        </v-btn>
      </div>

      <v-card-text>
        <v-alert dense outlined :value="alert" type="error">
          <v-row align="center">
            <v-col>
              {{ error }}
            </v-col>
          </v-row>
        </v-alert>
      </v-card-text>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="roleData.roleID"
            outlined
            dense
            :rules="[validators.required]"
            label="Role ID"
            placeholder="Role ID"
            hide-details="auto"
            class="mb-6"
            :disabled="propRoleData != undefined"
          ></v-text-field>

          <v-textarea
            v-model="roleData.description"
            outlined
            dense
            label="Description"
            placeholder="Description"
            hide-details="auto"
            class="mb-6"
          ></v-textarea>

          <v-text-field
            v-model="roleData.custumerID"
            outlined
            dense
            :rules="[validators.required]"
            label="Role ID"
            placeholder="Role ID"
            hide-details="auto"
            class="mb-6"
            :disabled="true"
          ></v-text-field>

          <v-switch v-model="roleData.isUse" :label="`is Open`"></v-switch>

          <v-btn v-if="!propRoleData" color="primary" class="me-3" type="submit" @click="createRole"> Add </v-btn>
          <v-btn v-else color="primary" class="me-3" type="submit" @click="editRole"> Edit </v-btn>
          <v-btn color="secondary" outlined type="reset"> Cancel </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { required, emailValidator } from '@core/utils/validation'

export default {
  model: {
    prop: 'isAddNewUserSidebarActive',
    event: 'update:is-add-new-user-sidebar-active',
  },
  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
    propRoleData: {
      type: Object,
    },
    customerData: {
      type: String,
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
  data() {
    return {
      roleData: {
        roleID: '',
        description: '',
        custumerID: '',
        isUse: true,
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
        console.log(this.roleData)
        if (this.valid) {
          let res = await this.$http.post('role/role', this.roleData)
          console.log(res)
          this.$refs.form.reset()
          this.$emit('refetch-data')
          this.$emit('update:is-add-new-user-sidebar-active', false)

          // refesh data
        }
      } catch (error) {
        console.error(error)
        this.error = error.data.message
        this.alert = true
      }
    },
    async editRole(e) {
      e.preventDefault()
      this.$refs.form.validate()
      try {
        console.log(this.valid)
        console.log(this.dateStart)
        if (this.valid) {
          let body = { ...this.roleData }
          let custumerID = body.custumerID
          let roleID = body.roleID
          delete body.custumerID
          delete body.roleID
          delete body.timeStamp

          console.log(body, custumerID, roleID)
          let res = await this.$http.put(`role/role/${roleID}/${custumerID}`, body)
          console.log(res)
          this.$refs.form.reset()
          this.$emit('refetch-data')
          this.$emit('update:is-add-new-user-sidebar-active', false)

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
    propRoleData: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal == undefined) {
          this.roleData = {
            roleID: '',
            description: '',
            custumerID: this.customerData,
            isUse: true,
          }
        } else {
          this.roleData = newVal
        }
      },
      deep: true,
    },
  },
}
</script>
