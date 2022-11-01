<template>
  <div>
    <v-menu
      offset-y
      left
      nudge-bottom="14"
      min-width="230"
      content-class="user-profile-menu-content"
      v-model="MenuMain"
      :close-on-content-click="closeOnContentClick"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
          <v-avatar size="40px" v-bind="attrs" color="primary" class="v-avatar-light-bg primary--text" v-on="on">
            <v-img v-if="userData.avatar" :src="require('@/assets/images/avatars/1.png')"></v-img>
            <v-icon v-else color="primary" size="28">
              {{ icons.mdiAccountOutline }}
            </v-icon>
          </v-avatar>
        </v-badge>
      </template>
      <v-list>
        <div class="pb-3 pt-2">
          <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
            <v-avatar size="40px" color="primary" class="v-avatar-light-bg primary--text">
              <v-img v-if="userData.avatar" src="@/assets/images/avatars/1.png"></v-img>
              <v-icon v-else color="primary" size="28">
                {{ icons.mdiAccountOutline }}
              </v-icon>
            </v-avatar>
          </v-badge>
          <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align: middle">
            <span class="text--primary font-weight-semibold mb-n1">
              {{ userData.fullName || userData.username }}
            </span>
            <small class="text--disabled text-capitalize">{{ userData.role }}</small>
          </div>
        </div>

        <v-divider></v-divider>

        <!-- Profile -->
        <v-list-item :to="{ name: 'user-profile' }">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiAccountOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Email -->
        <v-list-item :to="{ name: 'apps-email' }">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiEmailOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Inbox</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Chat -->
        <v-list-item :to="{ name: 'apps-chat' }">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiChatOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Chat</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-badge inline color="error" content="2"> </v-badge>
          </v-list-item-action>
        </v-list-item>

        <!-- Theme -->
        <v-list-item :key="isDark" @click="openMenuTheme">
          <!-- <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ isDark ? icons.mdiWeatherSunny : icons.mdiWeatherNight }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ isDark ? 'Light' : 'Dark' }}</v-list-item-title>
        </v-list-item-content> -->
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ !isDark ? icons.mdiWeatherSunny : icons.mdiWeatherNight }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ !isDark ? 'Light' : 'Dark' }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon size="22"> chevron_right </v-icon>
          </v-list-item-action>
        </v-list-item>

        <!-- I18n -->
        <v-list-item @click="openMenuLang">
          <v-list-item-icon class="me-2">
            <v-icon size="22"> translate </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>language : {{ locales.find(l => l.locale === $i18n.locale).title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon size="22"> chevron_right </v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <!-- Settings -->
        <v-list-item :to="{ name: 'user-settings' }">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiCogOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Pricing -->
        <v-list-item :to="{ name: 'page-pricing' }">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiCurrencyUsd }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pricing</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- FAQ -->
        <v-list-item :to="{ name: 'page-faq' }">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiHelpCircleOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>FAQ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <!-- Logout -->
        <v-list-item @click="logout">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiLogoutVariant }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Menu Select Theme -->
    <v-menu
      offset-y
      left
      nudge-bottom="14"
      min-width="230"
      content-class="user-profile-menu-content"
      v-model="MenuTheme"
    >
      <template v-slot:activator="{ on, attrs }">
        <div></div>
      </template>
      <v-list>
        <v-list-item @click="backMenuMain">
          <v-list-item-icon class="me-2">
            <v-icon size="22"> arrow_back </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Select Theme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item @click="isDark = false">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ isDark ? '' : 'done' }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Light</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="isDark = true">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ isDark ? 'done' : '' }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dark</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Menu Select Language -->
    <v-menu
      offset-y
      left
      nudge-bottom="14"
      min-width="230"
      content-class="user-profile-menu-content"
      v-model="MenuLang"
    >
      <template v-slot:activator="{ on, attrs }">
        <div></div>
      </template>
      <v-list>
        <v-list-item @click="backMenuMain">
          <v-list-item-icon class="me-2">
            <v-icon size="22"> arrow_back </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Select Theme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>
        <v-list-item-group :value="$i18n.locale" @change="updateActiveLocale">
          <v-list-item v-for="locale in locales" :key="locale.locale" :value="locale.locale">
            <v-img :src="locale.img" height="14px" width="22px" :alt="locale.locale" class="me-2"></v-img>
            <v-list-item-title>{{ locale.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCheckboxMarkedOutline,
  mdiChatOutline,
  mdiCogOutline,
  mdiCurrencyUsd,
  mdiHelpCircleOutline,
  mdiLogoutVariant,
  mdiWeatherNight,
  mdiWeatherSunny,
} from '@mdi/js'
import { useRouter } from '@core/utils'
import { initialAbility } from '@/plugins/acl/config'
import { getCurrentInstance } from '@vue/composition-api'
import useAppConfig from '@core/@app-config/useAppConfig'
import { loadLanguageAsync } from '@/plugins/i18n'

export default {
  setup() {
    const vm = getCurrentInstance().proxy
    const { router } = useRouter()
    // const userData = JSON.parse(localStorage.getItem('userData'))
    const userData = vm.$cookies.get('userData')
    const { isDark } = useAppConfig()
    const closeOnContentClick = true
    // i18n
    const locales = [
      {
        title: 'English',
        img: require('@/assets/images/flags/en.png'),
        locale: 'en',
      },
      {
        title: 'ไทย',
        img: require('@/assets/images/flags/th.png'),
        locale: 'th',
      },
    ]

    const logoutUser = () => {
      // Remove userData from localStorage
      // ? We just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem('accessToken')

      // Remove userData & Ability from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem('userAbility')

      vm.$cookies.remove('accessToken')
      vm.$cookies.remove('userData')
      vm.$cookies.remove('userAbility')

      // Reset ability
      vm.$ability.update(initialAbility)

      // Redirect to login page
      router.push({ name: 'auth-login' })
    }

    const updateActiveLocale = locale => {
      // Set to RTL mode if locale is arabic
      // isRtl.value = locale === 'ar'

      loadLanguageAsync(locale)
    }

    return {
      logoutUser,
      updateActiveLocale,
      userData,
      isDark,
      locales,
      closeOnContentClick,
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCheckboxMarkedOutline,
        mdiChatOutline,
        mdiCogOutline,
        mdiCurrencyUsd,
        mdiHelpCircleOutline,
        mdiLogoutVariant,
        mdiWeatherNight,
        mdiWeatherSunny,
      },
    }
  },
  data() {
    return {
      MenuMain: false,
      MenuTheme: false,
      MenuLang: false,
    }
  },
  methods: {
    backMenuMain() {
      this.MenuMain = true
      this.MenuTheme = false
      this.MenuLang = false
    },
    openMenuTheme() {
      this.MenuMain = false
      this.MenuTheme = true
    },
    openMenuLang() {
      this.MenuMain = false
      this.MenuLang = true
    },
    async logout() {
      // console.log(this.$http);
      const userData = this.$cookies.get('userData')
      // console.log(userData)
      let body = {
        username: userData.username,
      }
      try {
        let res = await this.$http.post('user/api/signout', body)
        console.log(res)
        if (res.data.message == 'User successfully signed out') {
          console.log('successfully')
          // Remove userData from localStorage
          // ? We just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
          localStorage.removeItem('accessToken')

          // Remove userData & Ability from localStorage
          localStorage.removeItem('userData')
          localStorage.removeItem('userAbility')

          this.$cookies.remove('idToken')
          this.$cookies.remove('accessToken')
          this.$cookies.remove('refreshToken')
          this.$cookies.remove('userData')
          this.$cookies.remove('userAbility')

          // Reset ability
          this.$ability.update(initialAbility)

          this.$router.push({ name: 'auth-login' })
        }
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
