<template>
  <div id="user-list">
    <!-- app drawer -->
    <!-- <user-list-add-new
      v-model="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="fetchUsers"
    ></user-list-add-new> -->
    <super-admin-edit-user
      v-model="isAddNewUserSidebarActive"
      :propUserData="propUserData"
      :propRoleList="roleList"
      @refetch-data="getAllUser"
    >
    </super-admin-edit-user>

    <!-- user total card -->
    <v-row class="mb-5">
      <v-col v-for="total in userTotalLocal" :key="total.total" cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <h2 class="font-weight-semibold mb-1">
                {{ total.total }}
              </h2>
              <span>{{ total.title }}</span>
            </div>

            <v-avatar
              :color="resolveUserTotalIcon(total.title).color"
              :class="`v-avatar-light-bg ${resolveUserTotalIcon(total.title).color}--text`"
            >
              <v-icon size="25" :color="resolveUserTotalIcon(total.title).color" class="rounded-0">
                {{ resolveUserTotalIcon(total.title).icon }}
              </v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- list filters -->
    <v-card>
      <v-card-title> User List </v-card-title>
      <v-divider></v-divider>
      <!-- actions -->
      <v-card-text class="d-flex align-center flex-wrap pb-0">
        <!-- search -->
        <v-text-field
          v-model="searchTable"
          placeholder="Search"
          outlined
          hide-details
          dense
          class="user-search me-3 mb-4"
        >
        </v-text-field>

        <v-select
          v-model="statusFilter"
          placeholder="Filter Status"
          :items="statusOptions"
          item-text="title"
          item-value="value"
          outlined
          dense
          clearable
          class="user-search me-3 mb-4"
          hide-details
        ></v-select>

        <v-select
          v-model="customerFilter"
          placeholder="Filter Customer"
          :items="customerList"
          item-text="custumerID"
          item-value="custumerID"
          outlined
          dense
          clearable
          class="user-search me-3 mb-4"
          hide-details
        ></v-select>

        <v-spacer></v-spacer>

        <div class="d-flex align-center flex-wrap">
          <v-btn color="secondary" outlined class="mb-4">
            <v-icon size="17" class="me-1">
              {{ icons.mdiExportVariant }}
            </v-icon>
            <span>Export</span>
          </v-btn>
        </div>
      </v-card-text>

      <!-- table -->
      <v-data-table
        v-model="selectedRows"
        :headers="hearderTable"
        :items="userTableC"
        :loading="loadingTable"
        :search="searchTable"
        item-key="username"
        show-select
      >
        <template #[`item.isUse`]="{ item }">
          <div>
           <v-switch
              v-model="item.isUse"
              color="success"
              class="ma-0 justify-center"
              @click="onUse(item)"
              hide-details
              dense
            ></v-switch>
          </div>
        </template> 

        <template #[`item.actions`]="{ item }">
          <v-btn icon @click="openEdit(item)">
            <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
          </v-btn>
          <!-- <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link @click="openEdit(item)">
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiPencil }}
                  </v-icon>
                  <span>Edit</span>
                </v-list-item-title>
              </v-list-item>
            </v-list> -->
          </v-menu>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiSquareEditOutline,
  mdiDotsVertical,
  mdiPlus,
  mdiFileDocumentOutline,
  mdiDeleteOutline,
  mdiExportVariant,
  mdiAccountOutline,
  mdiPencil,
} from '@mdi/js'
import { onUnmounted, ref } from '@vue/composition-api'

// sidebar
import { avatarText } from '@core/utils/filter'

import SuperAdminEditUser from './SuperAdminEditUser.vue'

export default {
  components: {
    // UserListAddNew,
    SuperAdminEditUser,
  },
  setup() {
    const roleOptions = [
      { title: 'Admin', value: 'admin' },
      { title: 'Author', value: 'author' },
      { title: 'Editor', value: 'editor' },
      { title: 'Maintainer', value: 'maintainer' },
      { title: 'Subscriber', value: 'subscriber' },
    ]

    const planOptions = [
      { title: 'Basic', value: 'basic' },
      { title: 'Company', value: 'company' },
      { title: 'Enterprise', value: 'enterprise' },
      { title: 'Standard', value: 'standard' },
    ]

    const statusOptions = [
      { title: 'Pending', value: 'pending' },
      { title: 'Active', value: 'active' },
      { title: 'Inactive', value: 'inactive' },
    ]

    return {
      // icons
      icons: {
        mdiSquareEditOutline,
        mdiFileDocumentOutline,
        mdiDotsVertical,
        mdiDeleteOutline,
        mdiPlus,
        mdiExportVariant,
        mdiAccountOutline,
        mdiPencil,
      },
    }
  },
  data() {
    return {
      isAddNewUserSidebarActive: false,
      userTotalLocal: [],
      statusFilter: null,
      statusOptions: [
        { title: 'on', value: 'true' },
        { title: 'off', value: 'false' },
      ],
      customerFilter: '',
      hearderTable: [
        { text: 'username', value: 'username' },
        { text: 'name', value: 'name' },
        { text: 'email', value: 'email' },
        { text: 'phone number', value: 'phone_number' },
        { text: 'position', value: 'position' },
        { text: 'roleID', value: 'roleID' },

        { text: 'Customer ID', value: 'custumerID' },
        {
          text: 'STATUS',
          value: 'isUse',
          align: 'center',
        },
        {
          text: 'ability',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
      customerList: [],
      userTable: [],
      selectedRows: [],
      roleList:[],
      loadingTable: false,
      searchTable: '',
      propUserData: undefined,
    }
  },
  computed: {
    userTableC() {
       console.log(this.statusFilter)
      let statusFilter = this.statusFilter == null ? '' : this.statusFilter
      let customerFilter = this.customerFilter == null ? '' : this.customerFilter

      return this.userTable.filter(el => {
        // console.log(this.statusFilter)
        // if (this.statusFilter == null) {
        //   return true
        // }
        console.log(el.isUse == (this.statusFilter || el.isUse))
        return el.isUse.toString().includes(statusFilter) && el.custumerID.includes(customerFilter)
      })
    },
  },
  mounted() {
    this.getListSelect()
    this.getAllUser()
  },
  methods: {
    async getListSelect(){
      try {
        let resC = await this.$http.get('custumer/custumer')
        console.log(resC)
        this.customerList = resC.data.data
         let resR = await this.$http.get('role/role')
        console.log(resR)
        this.roleList= resR.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async getAllUser() {
      this.loadingTable = true
      try {
        let res = await this.$http.get('user/user')
        console.log(res)
        this.userTable = res.data.data
      } catch (error) {
        console.error(error)
      }
      this.loadingTable = false
    },
    async deleteUser(item) {
      try {
        // let res = await this.$http.delete(`custumer/custumer/${item.custumerID}`)
        // console.log(res)
        await this.getAllUser()
      } catch (error) {
        console.error(error)
      }
    },
    async onUse(item){
      try {
        let res = await this.$http.patch(`user/user/${item.username}`)
        console.log(res)
        await this.getAllUser()
      } catch (error) {
        console.error(error)
      }
    },
    openEdit(item) {
      console.log(item)
      let editItem = { ...item }

      console.log(editItem)
      this.propUserData = editItem
      this.isAddNewUserSidebarActive = !this.isAddNewUserSidebarActive
    },
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/apps/user.scss';
</style>
