<template>
  <v-card>
    <v-card-title> device list </v-card-title>
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
      </div>
    </v-card-text>

    <!-- table -->
    <v-data-table
      :headers="hearderTable"
      :items="userTableC"
      :loading="loadingTable"
      :search="searchTable"
      item-key="username"
    >
    </v-data-table>
  </v-card>
</template>

<script>
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

export default {
  data() {
    return {
      userTable: [],
      hearderTable: [
        { text: 'status', value: 'username' },
        { text: 'asset name', value: 'name' },
        { text: 'mac address', value: 'email' },
        { text: 'frist check in', value: 'phone_number' },
        { text: 'last check out', value: 'position' },
        { text: 'duration', value: 'roleID' },
        { text: 'last location found', value: 'custumerID' },
      ],
      searchTable: '',
      statusFilter: null,
      statusOptions: [
        { title: 'on', value: 'true' },
        { title: 'off', value: 'false' },
      ],
      loadingTable: false,
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
  computed: {
    userTableC() {
       console.log(this.statusFilter)
      let statusFilter = this.statusFilter == null ? '' : this.statusFilter
      let customerFilter = this.userData == null ? undefined : this.userData.custumerID

      return this.userTable.filter(el => {
        console.log(el.isUse == (this.statusFilter || el.isUse))
        return el.isUse.toString().includes(statusFilter) && el.custumerID.includes(customerFilter)
      })
    },
  },
}
</script>

<style></style>
