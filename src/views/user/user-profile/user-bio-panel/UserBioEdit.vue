<template>
  <!-- edit profile dialog -->
  <v-dialog v-model="isBioDialogOpen" max-width="650px" @click:outside="$emit('update:is-bio-dialog-open', false)">
    <v-card class="user-edit-info pa-sm-10 pa-3">
      <v-card-title class="justify-center text-h5"> Edit User Information </v-card-title>
      <v-card-text class="text-center mt-n2"> Updating user details will receive a privacy audit. </v-card-text>

      <v-card-text class="mt-5">
        <v-form ref="editProfileForm" v-model="valid" @submit="editProfile">
          <!-- <v-row>
            <v-col>
              <v-text-field
                v-model="formSigup.username"
                outlined
                label="User Name"
                :rules="[validators.required]"
                hide-details="auto"
                class=""
              ></v-text-field>
            </v-col>
          </v-row> -->
          <v-row>
            <v-col>
              <v-text-field
                v-model="formSigup.name"
                outlined
                label="Name"
                :rules="[validators.required]"
                hide-details="auto"
                class=""
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="formSigup.phone_number"
                outlined
                append="+66"
                label="Phone Number"
                :rules="[validators.required, validators.integerValidator]"
                hide-details="auto"
                class=""
              >
                <template #prepend>
                  <div>+66</div>
                </template></v-text-field
              >
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="formSigup.email"
                outlined
                label="Email"
                :rules="[validators.required, validators.emailValidator]"
                hide-details="auto"
                class=""
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                v-model="formSigup.gender"
                :items="genderOptions"
                label="Gender"
                outlined
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialogDate"
                v-model="dialogDate"
                :return-value.sync="formSigup.birthdate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formSigup.birthdate"
                    label="Birth Date"
                    :append-icon="icons.mdiCalendar"
                    readonly
                    outlined
                    hide-details="auto"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="formSigup.birthdate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialogDate = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.dialogDate.save(formSigup.birthdate)"> OK </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="formSigup.position"
                outlined
                label="Position"
                :rules="[validators.required]"
                hide-details="auto"
                class=""
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="formSigup.custumerID"
                outlined
                label="Customer ID"
                :rules="[validators.required]"
                hide-details="auto"
                class=""
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn block color="primary" type="submit" class="mt-6 mb-6"> Save </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import countries from '@/@fake-db/data/other/countries'
import {
  required,
  emailValidator,
  passwordValidator,
  passwordValidator2,
  alphaValidator,
  integerValidator,
} from '@core/utils/validation'
import { mdiChevronLeft, mdiEyeOutline, mdiEyeOffOutline, mdiCalendar } from '@mdi/js'

export default {
  props: {
    isBioDialogOpen: {
      type: Boolean,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },

  setup(props, { emit }) {
    const isBillingAddress = ref(true)

    const userDataLocal = ref({})
    userDataLocal.value = JSON.parse(JSON.stringify(props.userData))

    const statusOptions = [
      { title: 'Pending', value: 'pending' },
      { title: 'Active', value: 'active' },
      { title: 'Inactive', value: 'inactive' },
    ]
    const languageOptions = ['English', 'Spanish', 'Portuguese', 'Russian', 'French', 'German']

    // on form submit
    const onSubmit = () => {
      emit('update:is-bio-dialog-open', false)
    }

    watch(
      () => props.isBioDialogOpen,
      () => {
        userDataLocal.value = JSON.parse(JSON.stringify(props.userData))
      },
    )

    return {
      isBillingAddress,
      statusOptions,
      languageOptions,
      countries,
      userDataLocal,
      onSubmit,
      validators: {
        required,
        emailValidator,
        passwordValidator,
        passwordValidator2,
        alphaValidator,
        integerValidator,
      },
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiCalendar,
        mdiChevronLeft,
      },
    }
  },
  data() {
    return {
      formSigup: {
        username: '',
        password: '',
        phone_number: '',
        email: '',
        name: '',
        birthdate: '',
        gender: '',
        position: '',
        picture: '',
        custumerID: '',
        isUse: false,
        ability: [],
        shortname: '',
      },
      genderOptions: ['Male', 'Female', 'LGBT', 'not specified'],
      dialogDate: false,
      valid: false,
    }
  },
  mounted() {
  },
  methods: {
    editProfile(event) {
      event.preventDefault()
      this.$refs.editProfileForm.validate()
      // this.overlay = true
      // console.log(this.$http)
      if (this.valid) {
        let body = {
          ...this.formSigup,
        }
        body.phone_number = `+66${body.phone_number}`
        body.birthdate = `${body.birthdate}`
        let shortname = body.name.split(' ').reduce((value, e) => {
          return value + e[0].toUpperCase()
        }, '')
        console.log(shortname)
        body.shortname = shortname
        this.email = body.email
        let username = body.username
        delete body.ability
        delete body.password
        delete body.picture
        delete body.roleID
        delete body.isUse
        delete body.username


          console.log(body)


        this.$http
          .put(`/user/user/${username}`, body)
          .then(response => {
            console.log(response)
            const data = response.data.data
            this.overlay = false
            this.dialogOTP = true
            this.$emit('update:is-bio-dialog-open', false)
            this.$emit('refetch-data')

          })
          .catch(e => {
            this.overlay = false
            this.error = e.data.message
            this.alert = true
          })
      }
    },
  },
  watch:{
    userData:{
      handler(newVal, oldVal) {
        console.log(newVal)
        this.formSigup = {...newVal}
        if (this.formSigup.phone_number) {
          this.formSigup.phone_number = this.formSigup.phone_number.slice(3)
        }
      },
      deep: true,
    }
  }
}
</script>
