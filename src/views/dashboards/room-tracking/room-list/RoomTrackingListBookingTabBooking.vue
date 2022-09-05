<template>
  <v-card>
    <v-card-text>
      <p class="font-weight-bold">booking type</p>
      <v-btn-toggle v-model="bookingType" tile color="primary" group>
        <v-btn value="visitor"> visitor meeting </v-btn>

        <v-btn value="internal"> internal meeting </v-btn>
      </v-btn-toggle>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col>
              <v-menu
                v-model="menuDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="select date"
                    :prepend-icon="icons.mdiCalendar"
                    readonly
                    hide-details
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menuDate = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                ref="menuTimeStart"
                v-model="menuTimeStart"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="timeStart"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="timeStart"
                    label="select time start"
                    :prepend-icon="icons.mdiClockTimeFourOutline"
                    readonly
                    hide-details
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menuTimeStart"
                  v-model="timeStart"
                  format="24hr"
                  full-width
                  @click:minute="$refs.menuTimeStart.save(timeStart)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                ref="menuTimeEnd"
                v-model="menuTimeEnd"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="timeEnd"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="timeEnd"
                    label="select time end"
                    :prepend-icon="icons.mdiClockTimeFourOutline"
                    readonly
                    hide-details
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menuTimeEnd"
                  v-model="timeEnd"
                  format="24hr"
                  full-width
                  @click:minute="$refs.menuTimeEnd.save(timeEnd)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-card outlined>
            <v-card-text>
              <v-text-field
                v-model="durationTime"
                class="mb-6"
                label="total meeting duration"
                readonly
                required
                outlined
                hide-details
                disabled
              ></v-text-field>
              <v-text-field
                v-model="timeEnd"
                class="mb-6"
                label="organization"
                required
                hide-details
                outlined
              ></v-text-field>
              <v-text-field
                v-model="timeEnd"
                class="mb-6"
                label="booking title"
                required
                hide-details
                outlined
              ></v-text-field>
              <v-select :items="items" class="mb-6" label="priority" outlined hide-details></v-select>
              <v-text-field
                v-model="timeEnd"
                label="invite meeting members"
                required
                outlined
                hide-details
                disabled
              ></v-text-field>
            </v-card-text>
          </v-card>
          <v-row align="center" justify="space-around" class="ma-4">
            <v-btn color="primary" @click="dialogBook = true">book</v-btn>
            <v-btn>clear</v-btn>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-text>
              <v-data-table
                v-model="selectedTable"
                :headers="hearderTable"
                :items="items"
                item-key="name"
                show-select
                class="elevation-1"
              >
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog v-model="dialogBook" width="500">
      <v-card>
        <v-card-title class="text-h5 text-capitalize grey lighten-2"> bookimg confirmation </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="d-flex justify-center">
          <v-img src="@/assets/images/svg/25.png" max-width="150" max-height="150"></v-img>
          <div>
            <ul style="list-style-type: none">
              <li class="pa-1">
                <span class="text-capitalize mr-2">name</span>
                <span>name room</span>
              </li>
              <li class="pa-1">
                <span class="text-capitalize mr-2">booking title</span>
                <span>visitor meeting</span>
              </li>
              <li class="pa-1">
                <span class="text-capitalize mr-2">priority level</span>
                <span>low priority</span>
              </li>
              <li class="pa-1">
                <span class="text-capitalize mr-2">booking type</span>
                <span>visitor meeting</span>
              </li>
              <li class="pa-1">
                <span class="text-capitalize mr-2">Date & Time</span>
                <span>12/808/2022 12:00-02:00 | 2hr</span>
              </li>
              <li class="pa-1">
                <span class="text-capitalize mr-2">organization </span>
                <span>abc co.ltd,.</span>
              </li>
            </ul>
          </div>
        </v-card-text>

        <v-card-text>
          <v-data-table :headers="hearderTable" :items="selectedTable" item-key="name" class="elevation-1">
          </v-data-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogBook = false"> book </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mdiCalendar, mdiClockTimeFourOutline } from '@mdi/js'

export default {
  data() {
    return {
      bookingType: null,
      menuDate: false,
      date: '',
      menuTimeStart: false,
      timeStart: '',
      menuTimeEnd: false,
      timeEnd: '',
      items: [],
      selectedTable: [],
      hearderTable: [
        { text: 'name', value: 'custumerID' },
        { text: 'position', value: 'roleID' },
        { text: 'email', value: 'description' },
        {
          text: 'tel.',
          value: 'isUse',
          align: 'center',
        },
        { text: 'company', value: 'date' },
      ],
      dialogBook: false,

      icons: {
        mdiCalendar,
        mdiClockTimeFourOutline,
      },
    }
  },
  computed: {
    durationTime() {
      const minStart = Number(this.timeStart.slice(3, 5))
      const hrStart = Number(this.timeStart.slice(0, 2))
      const minEnd = Number(this.timeEnd.slice(3, 5))
      const hrEnd = Number(this.timeEnd.slice(0, 2))

      let diffMin
      let minOver = 0
      if (minEnd > minStart) {
        diffMin = minEnd - minStart
      } else {
        diffMin = minEnd + 60 - minStart
        minOver = 1
      }

      let diffHr = hrEnd - hrStart - minOver

      if (diffHr > 0) {
        return `${diffHr} Hr. ${diffMin} Min.`
      }
      if (diffHr == 0) {
        return `${diffMin} Min.`
      }
      return `0 Hr.`
    },
  },
}
</script>

<style></style>
