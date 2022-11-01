<template>
  <div>
    <!-- update location -->
    <location-update v-model="isUpdateLocationSidebarActive"> </location-update>

    <!-- porter device -->
    <porter-tracking-add-device-drawer
      v-if="location.children.length <= 0 && isUsePorter"
      v-model="isDevicePorterSidebarActive"
      :propFormData="porterData"
      :allUserData="userTableC"
    ></porter-tracking-add-device-drawer>
    <v-card>
      <v-progress-linear
          :active="loading"
          :indeterminate="loading"
        ></v-progress-linear>
      <v-card-title> Location Information </v-card-title>
      <v-card-text class="d-flex flex-row justify-space-between" v-if="!loading">
        <div>
          <div>
            <span class="text-capitalize">name : </span>
            <span>{{ locationData.locationName }}</span>
          </div>
          <div>
            <span class="text-capitalize">location : </span>
            <span>{{ locationData.locationSort.slice(0, -1).replaceAll('#', ' / ') }}</span>
          </div>
          <div>
            <span class="text-capitalize">ID : </span>
            <span>{{ locationData.locationID }}</span>
          </div>
          <div>
            <span class="text-capitalize">customer : </span>
            <span>{{ locationData.custumerID }}</span>
          </div>
          <!-- <div>
            <span class="text-capitalize">create at : </span>
            <span>{{ $moment(locationData.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
          <div>
            <span class="text-capitalize">update at : </span>
            <span>{{ $moment(locationData.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div> -->
        </div>
        <div>
          <v-tooltip bottom v-if="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="
                  () => {
                    isUpdateLocationSidebarActive = true
                  }
                "
              >
                <v-icon>
                  {{ icons.mdiPencil }}
                </v-icon>
              </v-btn>
            </template>
            <span class="text-capitalize">edit</span>
          </v-tooltip>
          <v-tooltip bottom v-if="location.children.length <= 0 && isUsePorter">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="
                  () => {
                    isDevicePorterSidebarActive = true
                  }
                "
              >
                <v-icon>
                  {{ icons.mdiCellphoneLink }}
                </v-icon>
              </v-btn>
            </template>
            <span class="text-capitalize">porter</span>
          </v-tooltip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  mdiPlus,
  mdiFolderMultiple,
  mdiFolderEdit,
  mdiDelete,
  mdiMenuDown,
  mdiMenuRight,
  mdiMinus,
  mdiCircleSmall,
  mdiEye,
  mdiPencil,
  mdiCellphoneLink,
} from '@mdi/js'
import { canUse } from '@/plugins/acl/routeProtection'
import PorterTrackingAddDeviceDrawer from '../dashboards/porter-tracking/add-device/PorterTrackingAddDeviceDrawer.vue'
import LocationUpdate from './LocationUpdate.vue'
export default {
  components: { PorterTrackingAddDeviceDrawer, LocationUpdate },
  data() {
    return {
      location: JSON.parse(localStorage.getItem('location')),
      isUsePorter: canUse({ action: 'manage', resource: 'porterTracking' }),
      isDevicePorterSidebarActive: false,
      isUpdateLocationSidebarActive: false,
      icons: {
        mdiCellphoneLink,
        mdiPencil,
      },
      locationData: {
        custumerID: '',
        locationID: '',
        locationName: '',
        locationSort: '',
        adminCreate: '',
        adminUpdate: '',
        image: '',
      },
      porterData: {
        custumerID: '',
        deviceID: '',
        locationID: '',
        locationName: '',
        responseAdmin: '',
        locationSort: '',
      },
      loading:false,
      userTable: [],
      userData: $cookies.get('userData'),
    }
  },
  computed: {
    userTableC() {
      let customerFilter = this.userData == null ? undefined : this.userData.custumerID

      return this.userTable.filter(el => {
        return el.custumerID.includes(customerFilter)
      })
    },
  },
  mounted() {
    // console.log(this.location)
    this.loading = true
    this.getInfo()
    this.getAllUser()
    this.loading = false

  },
  beforeDestroy() {
    // localStorage.removeItem('location')
  },
  methods: {
    async getInfo() {
      try {
        let res = await this.$http.get(
          `/v1/location/info?custumerID=${this.location.custumerID}&locationSort=${this.location.locationSort}`,
        )
        console.log(this.location,res)
        this.locationData = res.data.data.find(el => el.locationSort === this.location.locationSort)
        this.setVar()
      } catch (error) {
        console.error(error)
      }
    },
    async getAllUser() {
      this.loadingTable = true
      try {
        let res = await this.$http.get('user/user')
        // console.log(res)
        this.userTable = res.data.data
      } catch (error) {
        console.error(error)
      }
      this.loadingTable = false
    },
    setVar() {
      if (this.isUsePorter) {
        this.porterData = {
          custumerID: this.locationData.custumerID,
          deviceID: '',
          locationID: this.locationData.locationID,
          locationName: this.locationData.locationName,
          responseAdmin: '',
          locationSort: this.locationData.locationSort,
        }
      }
    },
  },
}
</script>

<style></style>
