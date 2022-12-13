<template>
  <div
    class="auth-wrapper auth-v2"
    style="position: fixed"
    :style="{ background: $vuetify.theme.dark ? '#312d4b' : '#fff' }"
  >
    <div class="auth-inner">
      <!-- brand logo -->
      <!-- <router-link to="/" class="brand-logo d-flex align-center">
        <v-img :src="appLogo" max-height="30px" max-width="30px" alt="logo" contain class="me-3"></v-img>

        <h2 class="text--primary">
          {{ appName }}
        </h2>
      </router-link> -->
      <!--/ brand logo -->

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
        <v-col lg="7" class="d-none d-lg-flex justify-lg-center overflow-hidden pa-0">
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

        <v-col lg="4" class="d-flex align-center auth-bg pa-10 pb-0">
          <v-row>
            <v-col cols="12" sm="8" md="6" lg="12" class="mx-auto">
              <div
                class="shadow-green"
                style="z-index: 1; position: relative"
                :style="{ background: $vuetify.theme.dark ? '#312d4b' : '#fff' }"
              >
                <v-card flat>
                  <v-card-text>
                    <p class="text-2xl font-weight-semibold text--primary mb-2">Login to your Account</p>
                    <p class="mb-2">Please sign-in to your account and start the adventure</p>
                  </v-card-text>

                  <!-- <v-card-text>
                  <v-alert
                    text
                    color="primary"
                  >
                    <small class="d-block mb-1">
                      Admin Email: <strong>admin@materio.com</strong> / Pass: <strong>admin</strong>
                    </small>
                    <small>
                      Client Email: <strong>client@materio.com</strong> / Pass: <strong>client</strong>
                    </small>
                  </v-alert>
                </v-card-text> -->
                  <v-card-text>
                    <alert :isShow="alert" :message="error"></alert>
                  </v-card-text>

                  <!-- login form -->
                  <v-card-text>
                    <v-form ref="loginForm">
                      <v-text-field
                        v-model="username"
                        outlined
                        label="Username"
                        :error-messages="errorMessages.email"
                        :rules="[validators.required]"
                        hide-details="auto"
                        class="mb-6"
                      ></v-text-field>
                      <!-- placeholder="email" -->

                      <v-text-field
                        v-model="password"
                        outlined
                        :type="isPasswordVisible ? 'text' : 'password'"
                        label="Password"
                        :error-messages="errorMessages.password"
                        :rules="[validators.required]"
                        hide-details="auto"
                        class="mb-2"
                      ></v-text-field>
                      <!-- placeholder="Password" -->
                      <div class="d-flex align-center justify-space-between flex-wrap">
                        <!-- <v-checkbox hide-details label="Remember Me" class="mt-0"> </v-checkbox> -->
                        <div></div>
                        <!-- forget link -->
                        <router-link :to="{ name: 'auth-forgot-password' }" class="ms-3">
                          Forgot Password?
                        </router-link>
                      </div>

                      <v-btn block color="primary" type="submit" class="mt-6" @click="login"> Login </v-btn>
                    </v-form>
                  </v-card-text>

                  <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
                    <p class="mb-0 me-2">Don’t have an account ?</p>
                    <router-link :to="{ name: 'auth-register' }"> Sign up </router-link>
                  </v-card-text>

                  <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
                    <p class="mb-0 me-2">By clicking "Sign In" you agree to Tracsia's</p>
                    <router-link :to="{ path: '' }"> Terms Of Service </router-link>
                    <p class="mb-0 me-2">and</p>
                    <router-link :to="{ path: '' }"> Privacy Policy </router-link>
                  </v-card-text>

                  <!-- create new account  -->
                  <!-- <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
                    <p class="mb-0 me-2">New on our platform?</p>
                    <router-link :to="{ name: 'auth-register' }"> Create an account </router-link>
                  </v-card-text> -->

                  <!-- divider -->
                  <!-- <v-card-text class="d-flex align-center mt-2">
                    <v-divider></v-divider>
                    <span class="mx-5">or</span>
                    <v-divider></v-divider>
                  </v-card-text> -->

                  <!-- socail links -->
                  <!-- <v-card-actions class="d-flex justify-center">
                    <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
                      <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
                        {{ link.icon }}
                      </v-icon>
                    </v-btn>
                  </v-card-actions> -->
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
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import axios from '@axios'
import { emailValidator, required } from '@core/utils/validation'
import { mdiEyeOffOutline, mdiEyeOutline, mdiFacebook, mdiGithub, mdiGoogle, mdiTwitter } from '@mdi/js'
import { getCurrentInstance, ref } from '@vue/composition-api'
// import axios from 'axios'
import Alert from '@/utils/Alert.vue'
import { useRouter } from '@core/utils'
import themeConfig from '@themeConfig'
import { abilityKeytoArrayObj } from './ability_list'

export default {
  components: { Alert },
  setup() {
    // Template Ref
    const loginForm = ref(null)

    const vm = getCurrentInstance().proxy
    const { router } = useRouter()

    const isPasswordVisible = ref(false)

    const email = ref('Tracsia')
    const username = ref('')
    const password = ref('')
    const errorMessages = ref([])
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    const handleFormSubmit = event => {
      const isFormValid = loginForm.value.validate()
      event.preventDefault()

      if (!isFormValid) return

      /*
        1. Make HTTP request to get accessToken
        2. Store received token in localStorage for future use
        3. Make another HTTP request for getting user information
        4. On successful response of user information redirect to home page

        ? We have use promise chaining to get user data from access token
        ? Promise Chaining: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining
      */

      axios
        .post('/auth/login', { email: email.value, password: password.value })
        .then(response => {
          const { accessToken } = response.data

          // ? Set access token in localStorage so axios interceptor can use it
          // Axios Interceptors: https://github.com/axios/axios#interceptors
          localStorage.setItem('accessToken', accessToken)

          return response
        })
        .then(() => {
          axios.get('/auth/me').then(response => {
            const { user } = response.data
            const { ability: userAbility } = user

            // Set user ability
            // ? https://casl.js.org/v5/en/guide/intro#update-rules
            vm.$ability.update(userAbility)
            console.log(userAbility)

            // Set user's ability in localStorage for Access Control
            localStorage.setItem('userAbility', JSON.stringify(userAbility))

            // We will store `userAbility` in localStorage separate from userData
            // Hence, we are just removing it from user object
            delete user.ability

            // Set user's data in localStorage for UI/Other purpose
            localStorage.setItem('userData', JSON.stringify(user))
            console.log(user)

            // On success redirect to home
            router.push('/')
          })
        })
        .catch(error => {
          // TODO: Next Update - Show notification
          console.error('Oops, Unable to login!')
          console.log('error :>> ', error.response)
          errorMessages.value = error.response.data.error
        })
    }

    return {
      handleFormSubmit,

      isPasswordVisible,
      email,
      password,
      username,
      errorMessages,
      socialLink,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      validators: {
        required,
        emailValidator,
      },

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      // Template Refs
      loginForm,
    }
  },
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
      error: '',
      alert: false,
    }
  },
  methods: {
    async login(event) {
      event.preventDefault()
      this.overlay = true
      let body = {
        username: this.username,
        password: this.password,
      }
      console.log(this)
      try {
        await this.$store.dispatch('auth/onLogin', body)
        this.overlay = false
        this.$router.push('/')
      } catch (error) {
        this.overlay = false
        this.error = error.data.message
        this.alert = true
      }
      // this.$http
      //   .post('user/api/signin', body)
      //   .then(response => {
      //     // const { accessToken } = response.data
      //     console.log(response)
      //     const data = response.data.data
      //     this.$cookies.set('idToken', data.idToken)
      //     this.$cookies.set('accessToken', data.accessToken)
      //     this.$cookies.set('refreshToken', data.refreshToken)

      //     let userAbility = abilityKeytoArrayObj(data.ability)
      //     // let userAbility = [{ action: 'manage', subject: 'all' }]
      //     // let userAbility = [
      //     //   {
      //     //     action: 'read',
      //     //     subject: 'ACL',
      //     //   },
      //     //   {
      //     //     action: 'read',
      //     //     subject: 'Demo',
      //     //   },
      //     //   {
      //     //     action: 'read',
      //     //     subject: 'Public',
      //     //   },
      //     // ]

      //     let userData = { ...data }
      //     delete userData.accessToken
      //     delete userData.refreshToken
      //     delete userData.ability
      //     userData.avatar = '@/assets/images/avatars/1.png'
      //     userData.role = userData.roleID
      //     userData.fullName = userData.name

      //     this.$ability.update(userAbility)
      //     // localStorage.setItem('userAbility', JSON.stringify(userAbility))
      //     // localStorage.setItem('userData', JSON.stringify(userData))

      //     this.$cookies.set('userData', userData)
      //     this.$cookies.set('userAbility', JSON.stringify(userAbility))

      //     this.overlay = false

      //     this.$router.push('/')

      //     // ? Set access token in localStorage so axios interceptor can use it
      //     // Axios Interceptors: https://github.com/axios/axios#interceptors
      //     // localStorage.setItem('accessToken', accessToken)

      //     // return response
      //   })
      //   .catch(error => {
      //     this.overlay = false
      //     this.error = error.data.message
      //     this.alert = true
      //   })
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
