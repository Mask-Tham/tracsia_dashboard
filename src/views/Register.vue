<template>
  <div
    class="auth-wrapper auth-v2"
    style="position: fixed"
    :style="{ background: $vuetify.theme.dark ? '#312d4b' : '#fff' }"
  >
    <div class="auth-inner">
      <div
        style="
          width: 356px;
          height: 341px;
          background-color: #3abb6d;
          border-radius: 50%;
          position: absolute;
          top: -206px;
          left: -178px;
        "
      ></div>
      <div
        style="
          width: 677px;
          height: 650px;
          background-color: #3abb6d;
          border-radius: 50%;
          position: absolute;
          top: 500px;
          left: -54px;
        "
      ></div>

      <v-row class="auth-row ma-0">
        <v-col lg="4" class="d-none d-lg-flex justify-lg-center overflow-hidden pa-0">
          <div class="d-lg-flex flex-column align-center justify-lg-center" style="width: 100%">
            <div style="width: 500px">
              <v-img
                :src="
                  $vuetify.theme.dark
                    ? require('@/assets/images/svg/nav-logo-dark.png')
                    : require('@/assets/images/svg/nav-logo-light.png')
                "
                width="400"
                class="mb-10"
              ></v-img>
              <p class="text-2xl font-weight-semibold text--primary mb-2">
                The most flexible IoT integration and management platform.
              </p>
              <v-carousel :show-arrows="false" hide-delimiter-background cycle height="400">
                <v-carousel-item
                  v-for="(item, i) in items"
                  :key="i"
                  :src="item.src"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </div>
          </div>
        </v-col>

        <v-col lg="8" class="d-flex align-center auth-bg pa-10 pb-0">
          <v-row>
            <v-col cols="12" sm="8" md="6" lg="12" class="mx-auto">
              <div
                class="shadow-green"
                style="z-index: 1; position: relative"
                :style="{ background: $vuetify.theme.dark ? '#312d4b' : '#fff' }"
              >
                <v-card flat max-width="none">
                  <v-card-text>
                    <p class="text-2xl font-weight-semibold text--primary mb-2">Register new Account</p>
                    <p class="mb-2">Please fill out the information below.</p>
                  </v-card-text>

                  <v-card-text>
                    <alert :isShow="alert" :message="error"></alert>
                  </v-card-text>

                  <!-- login form -->
                  <v-card-text>
                    <v-form ref="registerForm" @submit="register">
                      <v-row>
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
                        <v-col>
                          <v-text-field
                            v-model="formSigup.password"
                            outlined
                            :type="isPasswordVisible ? 'text' : 'password'"
                            label="Password"
                            :error-messages="errorMessages.password"
                            placeholder="Password"
                            :rules="[validators.required, validators.passwordValidator2]"
                            :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                            hide-details="auto"
                            class=""
                            @click:append="isPasswordVisible = !isPasswordVisible"
                          ></v-text-field>
                        </v-col>
                      </v-row>
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
                            :error-messages="errorMessages.email"
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
                              <v-btn text color="primary" @click="$refs.dialogDate.save(formSigup.birthdate)">
                                OK
                              </v-btn>
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

                      <v-btn block color="primary" type="submit" class="mt-6 mb-6"> Register </v-btn>
                    </v-form>

                    <v-card-actions class="d-flex justify-center align-center">
                      <router-link :to="{ name: 'auth-login' }" class="d-flex align-center text-sm">
                        <v-icon size="24" color="primary">
                          {{ icons.mdiChevronLeft }}
                        </v-icon>
                        <span>Back to login</span>
                      </router-link>
                    </v-card-actions>
                  </v-card-text>
                </v-card>
                <v-overlay :value="overlay" absolute>
                  <v-progress-circular indeterminate size="64"></v-progress-circular>
                </v-overlay>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="dialogOTP" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Enter your OTP </v-card-title>

        <v-card-text>
          <v-alert dense outlined :value="alert_otp" type="error">
            <v-row align="center">
              <v-col>
                {{ error_otp }}
              </v-col>
            </v-row>
          </v-alert>
        </v-card-text>

        <v-card-text>
          <p>Please check this email {{ email }}</p>
          <v-otp-input v-model="otp" length="6" @finish="confirmOTP"></v-otp-input>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="resetOTP"> reset OTP </v-btn>
          <v-btn color="green darken-1" text @click="confirmOTP"> confirm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiChevronLeft, mdiEyeOutline, mdiEyeOffOutline, mdiCalendar } from '@mdi/js'
import { ref, getCurrentInstance } from '@vue/composition-api'
import {
  required,
  emailValidator,
  passwordValidator,
  passwordValidator2,
  alphaValidator,
  integerValidator,
  uperCaseValidator,
  lowerCaseValidator,
  lengthMore8Validator,
  numberValidator,
} from '@core/utils/validation'
import axios from '@axios'
// import axios from 'axios'
import { useRouter } from '@core/utils'
import themeConfig from '@themeConfig'
import ability_list from '@/views/ability_list'
import Alert from '@/utils/Alert.vue'

export default {
  setup() {
    // Template Ref

    return {
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiCalendar,
        mdiChevronLeft,
      },
      validators: {
        required,
        emailValidator,
        passwordValidator,
        passwordValidator2,
        alphaValidator,
        integerValidator,
      },

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      // Template Refs
    }
  },
  components: { Alert },
  data() {
    return {
      items: [
        {
          src: require('@/assets/images/gif/home.gif'),
        },
        {
          src: require('@/assets/images/gif/city.gif'),
        },
      ],
      overlay: false,
      formSigup: {
        username: 'Tracsia',
        password: 'Tra123456789',
        phone_number: '0968045684',
        email: 'tractracsia@gmail.com',
        name: 'Tracsia Tracsia',
        birthdate: '',
        gender: 'Male',
        position: 'หัวหน้า',
        picture: '',
        custumerID: 'tracsia',
        roleID:'',
        isUse: false,
        ability: [],
        shortname: '',
        homePage: '',
      },
      dialogDate: false,
      isPasswordVisible: false,
      genderOptions: ['Male', 'Female', 'LGBT', 'not specified'],
      errorMessages: {},
      dialogOTP: false,
      error: '',
      alert: false,
      abilityList: ability_list,

      // otp
      otp: '',
      email: '',
      error_otp: '',
      alert_otp: false,
    }
  },
  methods: {
    register(event) {
      event.preventDefault()
      this.$refs.registerForm.validate()
      // this.overlay = true
      // console.log(this.$http)
      let body = {
        ...this.formSigup,
      }
      body.phone_number = `+66${body.phone_number}`

      let shortname = body.name.split(' ').reduce((value, e) => {
        return value + e[0].toUpperCase()
      }, '')
      body.shortname = shortname

      this.email = body.email

      // let defaultAbility = this.abilityList.filter((e)=>e.isDefault)
      let defaultAbility = []
      this.abilityList.forEach(e => {
        if (e.isDefault) {
           defaultAbility.push(e.key)
        }
      })

      body.ability = defaultAbility

      console.log(body)
      this.$http
        .post('user/api/signup', body)
        .then(response => {
          console.log(response)
          const data = response.data.data
          this.overlay = false
          this.dialogOTP = true
        })
        .catch(e => {
          this.overlay = false
          this.error = e.data.message
          this.alert = true
        })
    },
    async confirmOTP() {
      try {
        let body = {
          username: this.formSigup.username,
          otp: this.otp,
        }
        let res = await this.$http.post('user/api/confirmotp', body)
        console.log(res)

        this.$router.push({ name: 'auth-login' })
      } catch (error) {
        this.error_otp = error.data.message
        this.alert_otp = true
      }
    },
    async resetOTP() {
      try {
        let body = {
          username: this.formSigup.username,
        }
        let res = await this.$http.post('user/api/resendotp', body)
        console.log(res)
      } catch (error) {
        console.error(error)
        this.error_otp = error.data.message
        this.alert_otp = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/preset/preset/pages/auth.scss';
</style>

<style lang="scss">
.shadow-green {
  box-shadow: 0px 0px 10px 0px #26e661;
  // width: auto;
  // background: #fff;
}
</style>
