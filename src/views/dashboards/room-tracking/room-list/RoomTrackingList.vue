<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="3">
          <v-menu
            v-model="menuFilterDate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="filterDate"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                outlined
                hide-details
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="filterDate"
              @input="filterDate.length == 2 ? (menuFilterDate = false) : (menuFilterDate = true)"
              range
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="searchTable"
            placeholder="Search"
            outlined
            hide-details
            dense
            class="user-search me-3 mb-4"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="2">
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
        </v-col>
        <v-col cols="12" md="2">
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
        </v-col>
        <v-col cols="12" md="2">
          <v-btn block color="primary">create</v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <room-tracking-list-room-list></room-tracking-list-room-list>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="(item, item_i) in items_tab" :key="item_i">
            <v-icon left> {{ item.icon }} </v-icon>
            {{ item.text }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <room-tracking-list-control></room-tracking-list-control>
          </v-tab-item>

          <v-tab-item> 2 </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiServer, mdiCalendarWeek } from '@mdi/js'
import RoomTrackingListRoomList from './RoomTrackingListRoomList.vue'
import RoomTrackingListControl from './RoomTrackingListControl.vue'
export default {
  components: { RoomTrackingListRoomList, RoomTrackingListControl },
  data() {
    return {
      statusFilter: null,
      statusOptions: [
        { title: 'on', value: 'true' },
        { title: 'off', value: 'false' },
      ],
      customerFilter: '',
      customerList: [],
      searchTable: '',
      menuFilterDate: false,
      filterDate: [],

      tab: null,
      items_tab: [
        {
          text: 'activity & control',
          icon: mdiServer,
        },
        // {
        //   text: 'consumption',
        //   icon: mdiCalendarWeek,
        // },
      ],
    }
  },
}
</script>

<style></style>
