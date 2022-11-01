<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title> Sum </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="data in gender" :key="data.title" cols="6" md="3" class="d-flex align-center">
                <v-avatar size="44" :color="data.color" rounded class="elevation-1">
                  <v-icon dark color="white" size="30">
                    {{ data.icon }}
                  </v-icon>
                </v-avatar>
                <div class="ms-3">
                  <p class="text-xs mb-0">
                    {{ data.title }}
                  </p>
                  <h3 class="text-xl font-weight-semibold">
                    {{ data.total }}
                  </h3>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title> Name Location </v-card-title>
          <v-card-text>
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item">
                <v-card flat>
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
                      <v-btn color="secondary" outlined class="mb-4">
                        <v-icon size="17" class="me-1"> {{icons.mdiExportVariant}} </v-icon>
                        <span>Export</span>
                      </v-btn>
                    </div>
                  </v-card-text>
                  <v-card-text>
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
                          <v-chip :color="item.isUse ? 'success' : ''">
                            {{ item.isUse ? 'on' : 'off' }}
                          </v-chip>
                        </div>
                      </template>

                      <template #[`item.actions`]="{ item }">
                        <v-btn icon @click="openEdit(item)">
                          <v-icon>{{}}</v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiGenderMale, mdiGenderFemale, mdiGenderTransgender, mdiGenderNonBinary,mdiExportVariant } from '@mdi/js'

export default {
  data() {
    return {
      icons:{
        mdiExportVariant
      },
      tab: null,
      items: ['location 1', 'location 2', 'location 3'],
      text: 'Lorem ipsum dolor sit amet,',
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
      userTable: [],
      searchTable: '',
      statusFilter: null,
      statusOptions: [
        { title: 'on', value: 'true' },
        { title: 'off', value: 'false' },
      ],
      selectedRows: [],
      loadingTable: false,
      gender: [
        { title: 'Male', total: 0, icon: mdiGenderMale, color: '#2986cc' },
        { title: 'Female', total: 0, icon: mdiGenderFemale, color: '#c90076' },
        { title: 'LGBT', total: 0, icon: mdiGenderTransgender, color:'#610091'  },
        { title: 'Not Specified', total: 0, icon: mdiGenderNonBinary, color: '' },
      ],
    }
  },
  computed: {
    userTableC() {
      console.log(this.statusFilter)
      let statusFilter = this.statusFilter == null ? '' : this.statusFilter
      let customerFilter = this.userData == null ? undefined : this.userData.custumerID

      return this.userTable.filter(el => {
        return el.isUse.toString().includes(statusFilter) && el.custumerID.includes(customerFilter)
      })
    },
  },
}
</script>

<style></style>
