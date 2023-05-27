<template>
  <div>
  <v-card-title> Report </v-card-title>
  <v-card id="account-setting-card">

    <!-- tabs -->
    <v-tabs v-model="tab" show-arrows>
      <v-tab v-for="tab in tabs" :key="tab.icon">
        <v-icon size="20" class="me-3">
          {{ tab.icon }}
        </v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <search></search>
        <report-tag :account-data="accountSettingData.account"></report-tag>
      </v-tab-item>

      <!-- <v-tab-item>
        <search></search>
        <account-settings-security></account-settings-security>
      </v-tab-item> -->

      <v-tab-item>
        <search></search>
        <report-sensor :account-data="accountSettingData.account"></report-sensor>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  </div>
</template>
  
<script>
import {
mdiAccountOutline,
mdiBellOutline,
mdiBookmarkOutline,
mdiInformationOutline,
mdiLockOpenOutline,
} from '@mdi/js'
import { ref } from '@vue/composition-api'

// demos
import AccountSettingsBilling from './AccountSettingsBilling.vue'
import AccountSettingsNotification from './AccountSettingsNotification.vue'
import AccountSettingsSecurity from './AccountSettingsSecurity.vue'
import search from './search.vue'
import ReportSensor from './sensor.vue'
import ReportTag from './tag.vue'

export default {
  components: {
    ReportTag,
    AccountSettingsSecurity,
    ReportSensor,
    AccountSettingsBilling,
    AccountSettingsNotification,
    search,
  },
  setup() {
    const tab = ref('')

    // tabs
    const tabs = [
      { title: 'Tag', icon: mdiAccountOutline },
      // { title: 'Asset', icon: mdiLockOpenOutline },
      { title: 'Sensor', icon: mdiInformationOutline },
    ]

    // account settings data
    const accountSettingData = {
      account: {
        avatarImg: require('@/assets/images/avatars/1.png'),
        username: 'johnDoe',
        name: 'john Doe',
        email: 'johnDoe@example.com',
        role: 'Admin',
        status: 'Active',
        company: 'Google.inc',
      },
      information: {
        bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
        birthday: 'February 22, 1995',
        phone: '954-006-0844',
        website: 'https://themeselection.com/',
        country: 'USA',
        languages: ['English', 'Spanish'],
        gender: 'male',
      },
      notification: {
        commentOnArticle: true,
        answerOnForm: true,
        followMe: false,
        newsAnnouncements: false,
        productUpdates: true,
        blogDigest: false,
      },
    }

    return {
      tab,
      tabs,
      accountSettingData,
      icons: {
        mdiAccountOutline,
        mdiLockOpenOutline,
        mdiInformationOutline,
        mdiBookmarkOutline,
        mdiBellOutline,
      },
    }
  },
}
</script>
  