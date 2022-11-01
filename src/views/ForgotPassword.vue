<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner">
      <!-- brand logo -->
      <router-link to="/" class="brand-logo d-flex align-center">
        <v-img :src="appLogo" max-height="30px" max-width="30px" alt="logo" contain class="me-3"></v-img>

        <h2 class="text--primary">
          {{ appName }}
        </h2>
      </router-link>
      <!--/ brand logo -->

      <v-row class="auth-row ma-0">
        <v-col lg="8" class="d-none d-lg-block position-relative overflow-hidden pa-0">
          <div class="auth-illustrator-wrapper">
            <!-- triangle bg -->
            <img
              height="362"
              class="auth-mask-bg"
              :src="require(`@/assets/images/misc/mask-v2-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
            />

            <!-- tree -->
            <v-img height="226" width="300" class="auth-tree" src="@/assets/images/misc/tree-4.png"></v-img>

            <!-- 3d character -->
            <div class="d-flex align-center h-full pa-16 pe-0">
              <v-img
                contain
                max-width="100%"
                height="692"
                class="auth-3d-group"
                :src="
                  require(`@/assets/images/3d-characters/illustration-forgot-password-${
                    $vuetify.theme.dark ? 'dark' : 'light'
                  }.png`)
                "
              ></v-img>
            </div>
          </div>
        </v-col>

        <v-col lg="4" class="d-flex align-center auth-bg pa-10 pb-0">
          <v-row>
            <v-col cols="12" sm="8" md="6" lg="12" class="mx-auto">
              <v-card flat>
                <v-card-text>
                  <p class="text-2xl font-weight-semibold text--primary mb-2">Forgot Password? 🔒</p>
                  <p class="mb-2">Enter your User Name and we'll send you instructions to reset your password</p>
                </v-card-text>

                <!-- login form -->
                <v-card-text>
                  <v-form>
                    <!-- <v-text-field
                      v-model="email"
                      outlined
                      label="Email"
                      placeholder="john@example.com"
                      hide-details
                      class="mb-4"
                    ></v-text-field> -->
                    <v-text-field
                      v-model="username"
                      outlined
                      label="User Name"
                      hide-details
                      class="mb-4"
                    ></v-text-field>

                    <v-btn block color="primary" @click="sendForgotPass"> Send reset link </v-btn>
                  </v-form>
                </v-card-text>

                <v-card-actions class="d-flex justify-center align-center">
                  <router-link :to="{ name: 'auth-login' }" class="d-flex align-center text-sm">
                    <v-icon size="24" color="primary">
                      {{ icons.mdiChevronLeft }}
                    </v-icon>
                    <span>Back to login</span>
                  </router-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Enter your OTP </v-card-title>

        <v-card-text>
          <alert :isShow="alert" :message="error"></alert>
        </v-card-text>

        <v-card-text>
          <p>Please check this email {{ email }}</p>
          <v-otp-input v-model="otp" length="6"></v-otp-input>
          <p>Enter New Password</p>
          <v-form v-model="valid">
            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              :rules="[rules.required, rules.uperCase, rules.lowerCase, rules.number, rules.lengthMore8]"
              hide-details="auto"
              class="mb-2"
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="sendChangePass"> Confirm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiChevronLeft, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import themeConfig from '@themeConfig'
import Alert from '@/utils/Alert.vue'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')

    return {
      isPasswordVisible,
      // email,

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      icons: {
        mdiChevronLeft,
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  components: { Alert },
  data() {
    return {
      username: 'Tracsia',
      dialog: false,
      valid: true,
      otp: '',
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        // password: value => {
        //   const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        //   return (
        //     pattern.test(value) ||
        //     "Min. 8 characters with at least one capital letter, a number and a special character."
        //   );
        // },
        uperCase: val => {
          const pattern = /[A-Z]/g
          return pattern.test(val) || 'A uppercase letter'
        },
        lowerCase: val => {
          const pattern = /[a-z]/g
          return pattern.test(val) || 'A lowercase letter'
        },
        number: val => {
          const pattern = /[0-9]/g
          return pattern.test(val) || 'A Number'
        },
        lengthMore8: val => {
          return val.length >= 8 || 'Minimun 8 characters'
        },
      },
      error: '',
      alert: false,
    }
  },
  methods: {
    async sendForgotPass() {
      try {
        let body = {
          username: this.username,
        }
        let res = await this.$http.post('user/api/forgotpassword', body)
        console.log(res)
        if (res.data.type == 'success') {
          this.email = res.data.data.CodeDeliveryDetails.Destination
          this.dialog = true
        }
      } catch (error) {}
    },
    async sendChangePass() {
      try {
        if (this.otp.length == 6 && this.valid) {
          let body = {
            username: this.username,
            otp: this.otp,
            password: this.password,
          }
          let res = await this.$http.post('user/api/confirmforgotpassword', body)
          console.log(res)

          this.dialog = false
        }
      } catch (error) {
        console.error(error)
        this.error = error.data.message
        this.alert = true
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/pages/auth.scss';
</style>
