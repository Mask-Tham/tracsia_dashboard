<template>
  <v-card>
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
      statusFilter: null,
      statusOptions: [
        { title: 'on', value: 'true' },
        { title: 'off', value: 'false' },
      ],
      customerFilter: '',
      hearderTable: [
        { text: 'Meeting Name', value: 'meeting_name' },
        { text: 'Booking Type', value: 'type' },
        { text: 'Location', value: 'location' },
        { text: 'Duration', value: 'duration' },
        { text: 'Check in', value: 'check_in' },
        { text: 'Check out', value: 'check_out' },
        { text: 'Participents', value: 'participents' },
        {
          text: 'ACTION',
          value: 'actions',
          align: 'center',
          sortable: false,
        },
      ],
      roleTable: [
        {
          date: '2022-08-09',
          custumerID: 'tracsia',
          timeStamp: 1660039751897,
          time: '10:09:11',
          description: 'role for SuperAdmin',
          isUse: true,
          roleID: 'SuperAdmin',
        },
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
        return el.isUse.toString().includes(statusFilter) && el.custumerID.includes(customerFilter)
      })
    },
  },
}
</script>

<style></style>
