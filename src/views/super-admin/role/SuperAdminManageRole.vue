<template>
  <div id="user-list">
    <!-- app drawer -->
    <super-admin-add-new-role
      v-model="isAddNewUserSidebarActive"
      :propRoleData="propRoleData"
      :customerData="customerList"
      @refetch-data="getAllRole"
    >
    </super-admin-add-new-role>

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
      <v-card-title> Role List </v-card-title>
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
          <v-btn color="primary" class="mb-4 me-3" @click.stop="openCreate">
            <v-icon>{{ icons.mdiPlus }}</v-icon>
            <span>Add New Role</span>
          </v-btn>

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
        :items="roleTableC"
        :loading="loadingTable"
        :search="searchTable"
        item-key="RoleID"
        show-select
      >
        <template #[`item.isUse`]="{ item }">
          <v-chip :color="item.isUse ? 'success' : ''">
            {{ item.isUse ? 'on' : 'off' }}
          </v-chip>
        </template>

        <template #[`item.description`]="{ item }">
          <div>
            {{ item.description.length > 15 ? item.description.slice(0, 14) + '...' : item.description }}
          </div>
        </template>

        <template #[`item.date`]="{ item }">
          <div>{{ item.date }} {{ item.time }}</div>
        </template>

        <template #[`item.actions`]="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-list>
              <!-- <v-list-item :to="{ name: 'apps-user-view', params: { id: item.custumerID } }">
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiFileDocumentOutline }}
                  </v-icon>
                  <span>Details</span>
                </v-list-item-title>
              </v-list-item> -->

              <v-list-item link @click="openEdit(item)">
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiPencil }}
                  </v-icon>
                  <span>Edit</span>
                </v-list-item-title>
              </v-list-item>

              <v-dialog width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item link v-bind="attrs" v-on="on">
                    <v-list-item-title>
                      <v-icon size="20" class="me-2">
                        {{ icons.mdiDeleteOutline }}
                      </v-icon>
                      <span>Delete</span>
                    </v-list-item-title>
                  </v-list-item>
                </template>

                <template v-slot:default="dialog">
                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2"> Delete Role </v-card-title>
                    <v-card-text> Want to delete {{ item.roleID }} of {{ item.custumerID }}?</v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="deleteRole(item, dialog)"> Yes </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-list>
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

import SuperAdminAddNewRole from './SuperAdminAddNewRole.vue'

export default {
  components: {
    // UserListAddNew,
    SuperAdminAddNewRole,
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
        { text: 'Customer ID', value: 'custumerID' },
        { text: 'Role ID', value: 'roleID' },
        { text: 'Description', value: 'description' },
        {
          text: 'STATUS',
          value: 'isUse',
          align: 'center',
        },
        { text: 'Date Create', value: 'date' },
        {
          text: 'ACTION',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
      roleTable: [
        // {
        //   date: '2022-08-09',
        //   custumerID: 'tracsia',
        //   timeStamp: 1660039751897,
        //   time: '10:09:11',
        //   description: 'role for SuperAdmin',
        //   isUse: true,
        //   roleID: 'SuperAdmin',
        // },
        // {
        //   date: '2022-08-06',
        //   custumerID: 'test',
        //   time: '15:07:47',
        //   timeStamp: 1659798467387,
        //   description: 'update test ผลเป็นอย่างไร',
        //   isUse: true,
        //   roleID: 'test',
        // },
        // {
        //   date: '2022-08-06',
        //   custumerID: 'test1',
        //   timeStamp: 1659798869285,
        //   time: '15:14:29',
        //   description: 'role for test',
        //   isUse: true,
        //   roleID: 'test',
        // },
        // {
        //   date: '2022-08-08',
        //   custumerID: 'tracsia',
        //   timeStamp: 1659970097152,
        //   time: '14:48:17',
        //   description: 'role for Guest',
        //   isUse: true,
        //   roleID: 'Guest',
        // },
      ],
      customerList: [],
      selectedRows: [],
      loadingTable: false,
      searchTable: '',
      propRoleData: undefined,
    }
  },
  computed: {
    roleTableC() {
      console.log(this.statusFilter)
      let statusFilter = this.statusFilter == null ? '' : this.statusFilter
      let customerFilter = this.customerFilter == null ? '' : this.customerFilter

      return this.roleTable.filter(el => {
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
    this.getAllRole()
  },
  methods: {
    async getListSelect(){
      try {
        let resC = await this.$http.get('custumer/custumer')
        console.log(resC)
        this.customerList = resC.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async getAllRole() {
      this.loadingTable = true
      try {
        let res = await this.$http.get('role/role')
        console.log(res)
        this.roleTable = res.data.data
      } catch (error) {
        console.error(error)
      }
      this.loadingTable = false
    },
    async deleteRole(item, dialog) {
      try {
        let res = await this.$http.delete(`role/role/${item.roleID}/${item.custumerID}`)
        console.log(res)
        dialog.value = false
        await this.getAllRole()
      } catch (error) {
        console.error(error)
      }
    },
    openEdit(item) {
      console.log(item)
      let editItem = { ...item }

      delete editItem.date
      delete editItem.time
      delete editItem.unixTimeStamp

      console.log(editItem)
      this.propRoleData = editItem
      this.isAddNewUserSidebarActive = !this.isAddNewUserSidebarActive
    },
    openCreate() {
      this.propRoleData = undefined
      this.isAddNewUserSidebarActive = !this.isAddNewUserSidebarActive
    },
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/apps/user.scss';
</style>
