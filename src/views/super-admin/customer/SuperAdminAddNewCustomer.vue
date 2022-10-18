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
          !propCustomerData ? 'Add New Customer' : 'Edit Customer'
        }}</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="$emit('update:is-add-new-user-sidebar-active', false)">
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
            v-model="customerData.custumerID"
            outlined
            dense
            :rules="[validators.required]"
            label="Custumer ID"
            placeholder="Custumer ID"
            hide-details="auto"
            class="mb-6"
            :disabled="propCustomerData != undefined"
          ></v-text-field>

          <v-textarea
            v-model="customerData.description"
            outlined
            dense
            label="Description"
            placeholder="Description"
            hide-details="auto"
            class="mb-6"
          ></v-textarea>

          <v-select
            v-model="customerData.ability"
            :items="ability_list"
            label="ability"
            item-text="text"
            item-value="key"
            multiple
            outlined
            chips
            hint="What content is accessible?"
            persistent-hint
            class="mb-6"
          ></v-select>

          <v-row>
            <v-col cols="12">Date Start</v-col>
            <v-col>
              <v-dialog
                ref="dialog_date_start"
                v-model="dialogDateStart"
                :return-value.sync="dateStart.date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateStart.date"
                    label="Picker Date"
                    :rules="[validators.required]"
                    readonly
                    outlined
                    hide-details
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateStart.date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialogDateStart = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog_date_start.save(dateStart.date)"> OK </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialog_time_start"
                v-model="dialogTimeStart"
                :return-value.sync="dateStart.time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateStart.time"
                    label="Picker Time"
                    :rules="[validators.required]"
                    readonly
                    outlined
                    hide-details
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="dialogTimeStart" format="24hr" v-model="dateStart.time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialogTimeStart = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog_time_start.save(dateStart.time)"> OK </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">Date End</v-col>
            <v-col>
              <v-dialog
                ref="dialog_date_end"
                v-model="dialogDateEnd"
                :return-value.sync="dateEnd.date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateEnd.date"
                    label="Picker Date"
                    :rules="[validators.required]"
                    readonly
                    hide-details
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateEnd.date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialogdateEnd = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog_date_end.save(dateEnd.date)"> OK </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialog_time_end"
                v-model="dialogTimeEnd"
                :return-value.sync="dateEnd.time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateEnd.time"
                    label="Picker Time"
                    :rules="[validators.required]"
                    readonly
                    hide-details
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="dialogTimeEnd" format="24hr" v-model="dateEnd.time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialogTimeEnd = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog_time_end.save(dateEnd.time)"> OK </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <v-switch v-model="customerData.isOpen" :label="`is Open`"></v-switch>

          <v-btn v-if="!propCustomerData" color="primary" class="me-3" type="submit" @click="createCustomer">
            Add
          </v-btn>
          <v-btn v-else color="primary" class="me-3" type="submit" @click="editCustomer"> Edit </v-btn>
          <v-btn color="secondary" outlined type="reset"> Cancel </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { required, emailValidator } from '@core/utils/validation'
import ability_list from '@/views/ability_list'
import Alert from '@/utils/Alert.vue'

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
    propCustomerData: {
      type: Object,
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
      customerData: {
        custumerID: '',
        description: '',
        dateStart: '',
        dateEnd: '',
        ability:[],
        isOpen: true,
      },
      dateStart: {
        date: '',
        time: '',
      },
      dateEnd: {
        date: '',
        time: '',
      },
      ability_list: ability_list,
      select_ability: [],
      dialogDateStart: false,
      dialogTimeStart: false,
      dialogDateEnd: false,
      dialogTimeEnd: false,
      error: '',
      alert: false,
      valid: false,
    }
  },
  methods: {
    async createCustomer(e) {
      e.preventDefault()
      this.$refs.form.validate()
      try {
        console.log(this.valid)
        console.log(this.dateStart)
        if (this.valid) {
          this.customerData.dateStart = `${this.dateStart.date} ${this.dateStart.time}:00`
          this.customerData.dateEnd = `${this.dateEnd.date} ${this.dateEnd.time}:00`
          let body = { ...this.customerData}
          console.log(body)

          let res = await this.$http.post('custumer/custumer', body)
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
    async editCustomer(e) {
      e.preventDefault()
      this.$refs.form.validate()
      try {
        console.log(this.valid)
        console.log(this.dateStart)
        if (this.valid) {
          this.customerData.dateStart = `${this.dateStart.date} ${this.dateStart.time}:00`
          this.customerData.dateEnd = `${this.dateEnd.date} ${this.dateEnd.time}:00`
          // console.log(this.customerData)
          let body = { ...this.customerData}
          let custumerID = body.custumerID
          delete body.custumerID
          console.log(body, custumerID)
          let res = await this.$http.put(`custumer/custumer/${custumerID}`, body)
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
    propCustomerData: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal == undefined) {
          this.customerData = {
            custumerID: '',
            description: '',
            dateStart: '',
            dateEnd: '',
        ability:[],
            isOpen: true,
          }
          this.dateStart = {
            date: '',
            time: '',
          }
          this.dateEnd = {
            date: '',
            time: '',
          }
        } else {
          this.customerData = newVal
          this.dateStart = {
            date: newVal.dateStart.split(' ')[0],
            time: newVal.dateStart.split(' ')[1].slice(0, 5),
          }
          this.dateEnd = {
            date: newVal.dateEnd.split(' ')[0],
            time: newVal.dateEnd.split(' ')[1].slice(0, 5),
          }
        }
      },
      deep: true,
    },
  },
}
</script>
