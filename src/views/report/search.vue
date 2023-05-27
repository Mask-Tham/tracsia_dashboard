<template>
  <div id="user-list">
    <!-- list filters -->
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
          v-model="selectedMonth"
          placeholder="Select Month"
          :items="month"
          item-text="title"
          item-value="value"
          outlined
          dense
          clearable
          class="user-search me-3 mb-4"
          hide-details
        ></v-select>

        <v-select
          v-model="selectedYear"
          placeholder="Select Year"
          :items="year"
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
          <!-- <v-btn color="primary" class="mb-4 me-3" @click.stop="openCreate">
            <v-icon>{{ icons.mdiPlus }}</v-icon>
            <span>Add New Role</span>
          </v-btn> -->

          <v-btn color="secondary" outlined class="mb-4">
            <v-icon size="17" class="me-1">
              {{ icons.mdiExportVariant }}
            </v-icon>
            <span>Export</span>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiAccountOutline,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiExportVariant,
  mdiFileDocumentOutline,
  mdiPencil,
  mdiPlus,
  mdiSquareEditOutline,
} from '@mdi/js'

// sidebar

export default {
  components: {},
  setup() {
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
      selectedMonth: null,
      month: [
        // { title: 'on', value: 'true' },
        // { title: 'off', value: 'false' },
      ],
      selectedYear: '',
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
      year: [],
      selectedRows: [],
      loadingTable: false,
      searchTable: '',
      propRoleData: undefined,
    }
  },
  computed: {},
  mounted() {},
}
</script>

<style lang="scss">
</style>
