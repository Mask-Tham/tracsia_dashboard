<template>
    <v-card flat class="">
      <v-card-text class="pt-0">
        <v-progress-linear :active="loading" :indeterminate="loading" absolute></v-progress-linear>
      </v-card-text>
      <v-form v-model="valid" ref="formChangePass" lazy-validation>
        <div class="px-3">
          <v-card-text class="pt-5">
            <v-row>
              <v-col cols="2" >
                <!-- current password -->
                <v-text-field
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-icon="isCurrentPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                  label="Current Password"
                  :rules="[validators.required]"
                  outlined
                  dense
                  @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                ></v-text-field>
              </v-col>
              <v-col cols="2" >
                <!-- new password -->
                <v-text-field
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-icon="isNewPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                  label="New Password"
                  :rules="[
                    validators.required,
                    validators.passwordValidator2,
                    newPassword != currentPassword || 'New Password equal Current Password',
                  ]"
                  outlined
                  dense
                  persistent-hint
                  @click:append="isNewPasswordVisible = !isNewPasswordVisible"
                ></v-text-field>
              </v-col>
              <v-col cols="2" >
                <!-- confirm password -->
                <v-text-field
                  v-model="cPassword"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                  label="Confirm New Password"
                  :rules="[validators.required, newPassword === cPassword || 'Password not equal New Password']"
                  outlined
                  dense
                  @click:append="isCPasswordVisible = !isCPasswordVisible"
                ></v-text-field>
              </v-col>
              <v-col cols="2" >
                <!-- current password -->
                <v-text-field
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-icon="isCurrentPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                  label="Current Password"
                  :rules="[validators.required]"
                  outlined
                  dense
                  @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                ></v-text-field>
              </v-col>
              <v-col cols="2" >
                <!-- new password -->
                <v-text-field
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-icon="isNewPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                  label="New Password"
                  :rules="[
                    validators.required,
                    validators.passwordValidator2,
                    newPassword != currentPassword || 'New Password equal Current Password',
                  ]"
                  outlined
                  dense
                  persistent-hint
                  @click:append="isNewPasswordVisible = !isNewPasswordVisible"
                ></v-text-field>
              </v-col>
              <v-col cols="2" >
                <!-- confirm password -->
                <v-text-field
                  v-model="cPassword"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                  label="Confirm New Password"
                  :rules="[validators.required, newPassword === cPassword || 'Password not equal New Password']"
                  outlined
                  dense
                  @click:append="isCPasswordVisible = !isCPasswordVisible"
                ></v-text-field>
              </v-col>
  
              <!-- <v-col
                cols="12"
                sm="4"
                md="6"
                class="d-none d-sm-flex justify-center position-relative"
              >
                <v-img
                  contain
                  max-width="170"
                  src="@/assets/images/3d-characters/pose-m-1.png"
                  class="security-character"
                ></v-img>
              </v-col> -->
            </v-row>
          </v-card-text>
        </div>
  
        <!-- divider -->
        <v-divider></v-divider>
  
        <div class="pa-3">
          <!-- <v-card-title class="flex-nowrap">
            <v-icon class="text--primary me-3">
              {{ icons.mdiKeyOutline }}
            </v-icon>
            <span class="text-break">Two-factor authentication</span>
          </v-card-title> -->
  
          <!-- <v-card-text class="two-factor-auth text-center mx-auto">
            <v-avatar
              color="primary"
              class="v-avatar-light-bg primary--text mb-4"
              rounded
            >
              <v-icon
                size="25"
                color="primary"
              >
                {{ icons.mdiLockOpenOutline }}
              </v-icon>
            </v-avatar>
            <p class="text-base text--primary font-weight-semibold">
              Two factor authentication is not enabled yet.
            </p>
            <p class="text-sm text--primary">
              Two-factor authentication adds an additional layer of
              security to your account by requiring more than just a
              password to log in. Learn more.
            </p>
          </v-card-text> -->
  
          <!-- success -->
          <v-card-text>
            <alert :isShow="alertSuc" :message="success" type="success"></alert>
          </v-card-text>
  
          <!-- alert -->
          <v-card-text>
            <alert :isShow="alert" :message="error"></alert>
          </v-card-text>
  
          <!-- action buttons -->
          <v-card-text>
            <v-btn color="primary" class="me-3 mt-3" @click="ChangePassword"> Save changes </v-btn>
            <v-btn color="secondary" outlined class="mt-3"> Cancel </v-btn>
          </v-card-text>
        </div>
      </v-form>
    </v-card>
  </template>
  
  <script>
  // eslint-disable-next-line object-curly-newline
  import { passwordValidator2, required } from '@core/utils/validation'
import { mdiEyeOffOutline, mdiEyeOutline, mdiKeyOutline, mdiLockOpenOutline } from '@mdi/js'
  // import { ref } from '@vue/composition-api'
  import Alert from '@/utils/Alert.vue'
  
  export default {
    setup() {
      return {
        icons: {
          mdiKeyOutline,
          mdiLockOpenOutline,
          mdiEyeOffOutline,
          mdiEyeOutline,
        },
        validators: {
          required,
          passwordValidator2,
        },
      }
    },
    components: { Alert },
    data() {
      return {
        isCurrentPasswordVisible: false,
        isNewPasswordVisible: false,
        isCPasswordVisible: false,
        currentPassword: '',
        newPassword: '',
        cPassword: '',
        valid: false,
        error: '',
        alert: false,
        success: '',
        alertSuc: false,
        loading: false,
      }
    },
    methods: {
     
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .two-factor-auth {
    max-width: 25rem;
  }
  .security-character {
    position: absolute;
    bottom: -0.5rem;
  }
  </style>
  