<template>
  <div id="user-list">
    <!-- app drawer -->
    <!-- <user-list-add-new
      v-model="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="fetchUsers"
    ></user-list-add-new> -->
    <super-admin-add-new-customer
      v-model="isAddNewUserSidebarActive"
      :propCustomerData="propCustomerData"
      @refetch-data="getAllCustomer"
    >
    </super-admin-add-new-customer>

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
      <v-card-title> Customer List </v-card-title>
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

        <v-spacer></v-spacer>

        <div class="d-flex align-center flex-wrap">
          <v-btn color="primary" class="mb-4 me-3" @click.stop="openCreate">
            <v-icon>{{ icons.mdiPlus }}</v-icon>
            <span>Add New Customer</span>
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
        :items="customerTableC"
        :loading="loadingTable"
        :search="searchTable"
        item-key="custumerID"
        show-select
      >
        <template #[`item.isOpen`]="{ item }">
          <v-chip :color="item.isOpen ? 'success' : ''">
            {{ item.isOpen ? 'on' : 'off' }}
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

                <v-card>
                  <v-card-title class="text-h5 grey lighten-2"> Delete Customer </v-card-title>
                  <v-card-text> Want to delete {{ item.custumerID }} ?</v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="deleteCustomer(item)"> Yes </v-btn>
                  </v-card-actions>
                </v-card>
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

import SuperAdminAddNewCustomer from './SuperAdminAddNewCustomer.vue'

export default {
  components: {
    // UserListAddNew,
    SuperAdminAddNewCustomer,
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
        { title: 'on', value: true },
        { title: 'off', value: false },
      ],
      hearderTable: [
        { text: 'Customer ID', value: 'custumerID' },
        { text: 'Date Create', value: 'date' },
        { text: 'Date Start', value: 'dateStart' },
        { text: 'Date End', value: 'dateEnd' },
        { text: 'Description', value: 'description' },
        {
          text: 'STATUS',
          value: 'isOpen',
          align: 'center',
        },
        {
          text: 'ACTION',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
      customerTable: [
        // {
        //   date: '2022-08-07',
        //   dateEnd: '3000-08-31 00:00:00',
        //   custumerID: 'tracsia',
        //   isOpen: true,
        //   dateStart: '2022-08-02 00:00:00',
        //   unixTimeStamp: 1659863309359,
        //   time: '09:08:29',
        //   description: 'บริษัท tracsia',
        // },
        // {
        //   date: '2022-08-09',
        //   dateEnd: '2022-08-11 14:11:00',
        //   custumerID: 'tracsia2',
        //   isOpen: true,
        //   dateStart: '2022-08-10 01:10:00',
        //   unixTimeStamp: 1660043621929,
        //   time: '11:13:41',
        //   description: 'บริษัท tracsia',
        // },
        // {
        //   date: '2022-08-06',
        //   dateEnd: '2022-08-31 00:00:00',
        //   custumerID: 'test',
        //   isOpen: true,
        //   dateStart: '2022-08-02 00:00:00',
        //   time: '14:46:39',
        //   unixTimeStamp: 1659797199905,
        //   description: 'บริษัท updete',
        // },
        // {
        //   date: '2022-08-09',
        //   dateEnd: '2030-08-31 00:00:00',
        //   custumerID: 'tracsia1',
        //   isOpen: true,
        //   dateStart: '2022-08-02 00:00:00',
        //   unixTimeStamp: 1660043570671,
        //   time: '11:12:50',
        //   description: 'บริษัท tracsia',
        // },
      ],
      selectedRows: [],
      loadingTable: false,
      searchTable: '',
      propCustomerData: undefined,
    }
  },
  computed: {
    customerTableC() {
      return this.customerTable.filter(el => {
        // console.log(this.statusFilter)
        if (this.statusFilter == null) {
          return true
        }
        return el.isOpen === this.statusFilter
      })
    },
  },
  mounted() {
    this.getAllCustomer()
  },
  methods: {
    async getAllCustomer() {
      this.loadingTable = true
      try {
        let res = await this.$http.get('custumer/custumer')
        console.log(res)
        this.customerTable = res.data.data
      } catch (error) {
        console.error(error)
      }
      this.loadingTable = false
    },
    async deleteCustomer(item) {
      try {
        let res = await this.$http.delete(`custumer/custumer/${item.custumerID}`)
        console.log(res)
        await this.getAllCustomer()
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
      this.propCustomerData = editItem
      this.isAddNewUserSidebarActive = !this.isAddNewUserSidebarActive
    },
    openCreate() {
      this.propCustomerData = undefined
      this.isAddNewUserSidebarActive = !this.isAddNewUserSidebarActive
    },
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/apps/user.scss';
</style>
