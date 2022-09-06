<template>
  <layout-content-vertical-nav :nav-menu-items="navMenuItems">
    <slot></slot>

    <!-- Slot: Navbar -->
    <template #navbar="{ isVerticalNavMenuActive, toggleVerticalNavMenuActive }">
      <div
        v-if="!$vuetify.breakpoint.mobile"
        class="navbar-content-container"
        :class="{ 'expanded-search': shallShowFullSearch }"
      >
        <!-- Left Content: Search -->
        <div class="d-flex align-center">
          <v-icon v-if="$vuetify.breakpoint.mdAndDown" class="me-3" @click="toggleVerticalNavMenuActive">
            {{ icons.mdiMenu }}
          </v-icon>
          <app-bar-search
            :shall-show-full-search.sync="shallShowFullSearch"
            :data="appBarSearchData"
            :filter="searchFilterFunc"
            :search-query.sync="appBarSearchQuery"
            @update:shallShowFullSearch="
              handleShallShowFullSearchUpdate(isVerticalNavMenuActive, toggleVerticalNavMenuActive)
            "
          ></app-bar-search>
        </div>

        <!-- Right Content: I18n, Light/Dark, Notification & User Dropdown -->
        <div class="d-flex align-center right-row">
          <app-bar-i18n></app-bar-i18n>
          <app-bar-theme-switcher class="mx-4"></app-bar-theme-switcher>
          <app-bar-notification></app-bar-notification>
          <app-bar-user-menu></app-bar-user-menu>
        </div>
      </div>
      <div v-else class="navbar-content-container" :class="{ 'expanded-search': shallShowFullSearch }">
        <!-- Left Content: Search -->
        <div class="d-flex align-center">
          <v-icon v-if="$vuetify.breakpoint.mdAndDown" class="me-3" @click="toggleVerticalNavMenuActive">
            {{ icons.mdiMenu }}
          </v-icon>
        </div>
        <div class="d-flex align-center">
          <v-img max-height="100" max-width="100" src="@/assets/images/svg/nav-logo-light.png"></v-img>
        </div>
        <!-- Right Content: I18n, Light/Dark, Notification & User Dropdown -->
        <div class="d-flex align-center right-row">
          <app-bar-notification></app-bar-notification>
          <app-bar-user-menu-mobile></app-bar-user-menu-mobile>
        </div>
      </div>
    </template>

    <!-- Slot: Footer -->
    <template #footer>
      <div class="d-flex justify-space-between">
        <span
          >COPYRIGHT &copy; {{ new Date().getFullYear() }} <a href="#" class="text-decoration-none">Tracsia</a
          ><span class="d-none d-md-inline">, All rights Reserved</span></span
        >
        <div class="align-center d-none d-md-flex">
          <span>Hand-crafted &amp; Made with</span>
          <v-icon color="error" class="ms-2">
            {{ icons.mdiHeartOutline }}
          </v-icon>
        </div>
      </div>
    </template>

    <template #v-app-content>
      <!-- <app-customizer class="d-none d-md-block"></app-customizer> -->
      <v-bottom-navigation color="primary" grow app v-if="$vuetify.breakpoint.mobile">
        <v-btn min-height="56" value="home" to="/dashboards/warehouse">
          <v-icon>home</v-icon>
        </v-btn>

        <v-btn min-height="56" value="edit_calendar" to="/apps/calendar">
          <v-icon>edit_calendar</v-icon>
        </v-btn>

        <v-btn min-height="56" value="chat" to="/apps/chat">
          <v-icon>chat</v-icon>
        </v-btn>

        <v-btn min-height="56" value="person" to="/apps/user/view/3">
          <v-icon>person</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </template>
  </layout-content-vertical-nav>
</template>

<script>
import LayoutContentVerticalNav from '@/@core/layouts/variants/content/vertical-nav/LayoutContentVerticalNav.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import navMenuItems from '@/navigation/sidebar'
// import navMenuItems from '@/navigation/vertical'

import useAppConfig from '@core/@app-config/useAppConfig'


// App Bar Components
import AppBarSearch from '@core/layouts/components/app-bar/AppBarSearch.vue'
import AppBarI18n from '@core/layouts/components/app-bar/AppBarI18n.vue'
import AppBarThemeSwitcher from '@core/layouts/components/app-bar/AppBarThemeSwitcher.vue'
import AppBarUserMenu from '@/components/app-bar/AppBarUserMenu.vue'
import AppBarUserMenuMobile from '@/components/app-bar/AppBarUserMenuMobile.vue'
import AppBarNotification from '@core/layouts/components/app-bar/AppBarNotification.vue'
import { mdiMenu, mdiHeartOutline } from '@mdi/js'

import { getVuetify } from '@core/utils'

// Search Data
import appBarSearchData from '@/assets/app-bar-search-data'

import { ref, watch } from '@vue/composition-api'

export default {
  components: {
    LayoutContentVerticalNav,
    AppCustomizer,

    // App Bar Components
    AppBarSearch,
    AppBarI18n,
    AppBarThemeSwitcher,
    AppBarUserMenu,
    AppBarNotification,
    AppBarUserMenuMobile,
  },
  setup() {
    const $vuetify = getVuetify()
    const { menuIsVerticalNavMini } = useAppConfig()

    // Search
    const appBarSearchQuery = ref('')
    const shallShowFullSearch = ref(false)
    const maxItemsInGroup = 5
    const totalItemsInGroup = ref({
      pages: 0,
      files: 0,
      contacts: 0,
    })
    watch(appBarSearchQuery, () => {
      totalItemsInGroup.value = {
        pages: 0,
        files: 0,
        contacts: 0,
      }
    })

    watch($vuetify, () => {
      // console.log('mobile',$vuetify);
      if ($vuetify.breakpoint.mdAndDown) {
        menuIsVerticalNavMini.value = false
      }else{
        menuIsVerticalNavMini.value = true

      }
    })

    const searchFilterFunc = (item, queryText, itemText) => {
      if (item.header || item.divider) return true

      const itemGroup = (() => {
        if (item.to !== undefined) return 'pages'
        if (item.size !== undefined) return 'files'
        if (item.email !== undefined) return 'contacts'

        return null
      })()

      const isMatched = itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1

      if (isMatched) {
        if (itemGroup === 'pages') totalItemsInGroup.value.pages += 1
        else if (itemGroup === 'files') totalItemsInGroup.value.files += 1
        else if (itemGroup === 'contacts') totalItemsInGroup.value.contacts += 1
      }

      return appBarSearchQuery.value && isMatched && totalItemsInGroup.value[itemGroup] <= maxItemsInGroup
    }

    // ? Handles case where in <lg vertical nav menu is open and search is triggered using hotkey then searchbox is hidden behind vertical nav menu overlaty
    const handleShallShowFullSearchUpdate = (isVerticalNavMenuActive, toggleVerticalNavMenuActive) => {
      if ($vuetify.breakpoint.mdAndDown && isVerticalNavMenuActive) {
        toggleVerticalNavMenuActive()
      }
    }

    return {
      navMenuItems,
      handleShallShowFullSearchUpdate,

      // Search
      appBarSearchQuery,
      shallShowFullSearch,
      appBarSearchData,
      searchFilterFunc,

      icons: {
        mdiMenu,
        mdiHeartOutline,
      },
    }
  },
  data() {
    return {
      value: '',
    }
  },
  mounted() {
    
  },
}
</script>

<style lang="scss" scoped>
.navbar-content-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  position: relative;
}

// ? Handle bg of autocomplete for blured appBar
.v-app-bar.bg-blur {
  .expanded-search {
    ::v-deep .app-bar-autocomplete-box div[role='combobox'] {
      background-color: transparent;
    }

    > .d-flex > button.v-icon {
      display: none;
    }

    // ===

    & > .right-row {
      visibility: hidden;
      opacity: 0;
    }

    ::v-deep .app-bar-search-toggler {
      visibility: hidden;
    }
  }
}
</style>
