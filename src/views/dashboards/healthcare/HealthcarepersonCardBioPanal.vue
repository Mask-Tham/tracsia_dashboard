<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-center flex-column">
          <v-avatar
            :color="userData.avatar ? '' : 'primary'"
            :class="userData.avatar ? '' : 'v-avatar-light-bg primary--text'"
            size="120"
            rounded
            class="mb-4"
          >
            <v-img v-if="userData.avatar" :src="require(`@/assets/images/avatars/${userData.avatar}`)"></v-img>
            <span v-else class="font-weight-semibold text-5xl">{{ avatarText(userData.fullName) }}</span>
          </v-avatar>

          <span class="mb-2">{{ $tc('healthcare.patient', 2) }} #{{ userData.id }}</span>
          <span class="mb-2">{{ userData.temp }} °C</span>
          <br />
          <v-btn class="ma-2" block outlined color="info">{{ $tc('healthcare.edit profile') }} </v-btn>
        </v-card-title>
        <v-card-text>
          <h2>{{ $tc('healthcare.basic info', 2) }}</h2>
          <br />

          <h4 class="text-uppercase">{{ $tc('healthcare.first name') }}</h4>
          <span>{{ userData.fullName.split(' ')[0] }}</span>
          <br />
          <br />

          <h4 class="text-uppercase">{{ $tc('healthcare.last name') }}</h4>
          <span>{{ userData.fullName.split(' ')[1] }}</span>
        </v-card-text>
        <v-card-text>
          <h2>{{ $tc('healthcare.contact infomation', 2) }}</h2>
          <div class="pa-6 d-flex flex-column" style="opacity: 0.7">
            <div style="text-align: center">
              <v-icon size="24">
                {{ icons.mdiLock }}
              </v-icon>
              <span class="ml-2 font-weight-bold text-subtitle-1">{{ $tc('healthcare.private infomation', 2) }}</span>
            </div>
            <span style="text-align: center">{{ $tc('healthcare.private infomation sub') }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12"
      ><v-btn color="error"> {{ $tc('healthcare.delete user') }} </v-btn></v-col
    >
  </v-row>
</template>

<script>
import { avatarText, kFormatter } from '@core/utils/filter'
import { mdiLock } from '@mdi/js'

export default {
  setup() {
    return {
      avatarText,
      kFormatter,
    }
  },
  data() {
    return {
      icons: {
        mdiLock,
      },
      userData: {
        avatar: '5.png',
        fullName: 'John Done',
        id: 2090345,
        temp: 36.2,
      },
    }
  },
}
</script>

<style></style>
