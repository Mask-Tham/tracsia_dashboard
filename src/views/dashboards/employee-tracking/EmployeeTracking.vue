<template>
  <div>
    <v-row>
      <v-col cols="4">
        <div class="text-h4 text-capitalize">{{ $tc('employee_tracking.employee') }}</div>
        <v-item-group mandatory>
          <v-container>
            <div class="d-flex" style="gap: 10px; flex-wrap: wrap">
              <!-- filter button -->
              <div v-for="(item, i) in items_all" :key="i" @click="changeTab(i)">
                <v-item v-slot="{ active, toggle }">
                  <v-card :color="active ? '#1C202C' : ''" class="d-flex align-center pa-2" @click="toggle">
                    <v-scroll-y-transition>
                      <div class="flex-grow-1 text-center text-capitalize" :style="{ color: active ? '#fff' : '' }">
                        {{ $tc(`employee_tracking.${item.text}`) }} ({{ item.data.length }})
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </div>
            </div>
          </v-container>
        </v-item-group>
        <!-- card list select -->
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(items, i) in items_all" :key="i">
            <v-list>
              <!-- list item -->
              <v-list-item-group v-model="items.model" mandatory color="indigo">
                <v-list-item v-for="(item, i) in items.data" :key="i" @click="changeTabB(i)">
                  <v-list-item-icon>
                    <span class="material-icons-outlined">account_circle</span>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <div class="d-flex justify-space-around">
                      <div style="width: 40%">{{ item.name }}</div>
                      <div style="width: 30%">{{ item.sync }}</div>
                      <div>
                        <span v-if="item.status == 2" class="material-icons" style="color: #ee242b"> warning </span>
                        <span v-if="item.status == 1" class="material-icons" style="color: #ffd557"> warning </span>
                        <span v-if="item.status == 0" class="material-icons" style="color: #77b528"> done </span>
                      </div>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col>
        <v-row class="match-height">
          <v-col v-for="(item, i) in card_data" :key="i">
            <!-- card total data -->
            <employee-tracking-card-data :item="item"> </employee-tracking-card-data>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn-toggle v-model="toggle_exclusive" rounded @change="selectType">
              <v-btn> {{ $tc(`employee_tracking.list`) }} </v-btn>
              <v-btn> {{ $tc(`employee_tracking.graph`) }} </v-btn>
              <v-btn> {{ $tc(`employee_tracking.map`) }} </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col>
            <v-tabs-items v-model="tabB">
              <!-- <pre>
                tab {{ tab }}
                 model {{ items_all[tab].model }}
              </pre>
              <pre v-if="items_all[tab].data.length >= 1">
              {{ items_all[tab].data[items_all[tab].model].list }}
              ******************
              {{ items_all[tab].data[items_all[tab].model] }}

              </pre> -->
              <!-- <v-tab-item v-for="(item, i) in items_list" :key="i">
                  <pre>
                {{ item }}
                  </pre>
              </v-tab-item> -->
              <v-tab-item>
                <v-data-table
                  v-if="items_all[tab].data.length >= 1"
                  :headers="headers"
                  :items="items_all[tab].data[items_all[tab].model].list"
                  hide-default-header
                  hide-default-footer
                  class="elevation-1"
                >
                  <template #[`item.name`]="{ item }">
                    <div class="d-flex align-center">
                      <v-avatar>
                        <span class="material-icons-outlined">{{ item.icon }}</span>
                      </v-avatar>
                      <div class="d-flex flex-column ms-3">
                        <span class="d-block text--primary font-weight-semibold text-truncate">{{ item.name }}</span>
                        <small>{{ item.position }}</small>
                      </div>
                    </div>
                  </template>

                  <template #[`item.sync`]="{ item }">
                    <div class="d-flex align-center">
                      {{ item.sync }}
                    </div>
                  </template>

                  <template #[`item.time`]="{ item }">
                    <span>{{ item.time }} min</span>
                    <v-progress-linear
                      height="6"
                      rounded
                      class="project-progress mt-1"
                      :color="resolveUserProgressVariant(item)"
                      :value="percentTime(item.time)"
                    ></v-progress-linear>
                  </template>
                </v-data-table>
              </v-tab-item>
              <v-tab-item> graph </v-tab-item>
              <v-tab-item> map </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { mdiFaceMan } from '@mdi/js'
import EmployeeTrackingCardData from './EmployeeTrackingCardData.vue'

export default {
  components: { EmployeeTrackingCardData },
  data() {
    return {
      toggle_exclusive: 0,
      tab: 0,
      headers: [
        {
          text: 'name',
          align: 'start',
          value: 'name',
        },
        { text: 'last time', value: 'sync' },
        { text: 'time', value: 'time' },
      ],
      items_all: [
        {
          text: 'all',
          model: [0],
          data: [],
        },
        {
          text: 'non-compliant',
          model: [0],
          data: [],
        },
        {
          text: 'low battery',
          model: [0],
          data: [],
        },
        {
          text: 'at risk',
          model: [0],
          data: [],
        },
        {
          text: 'exposured',
          model: [0],
          data: [],
        },
      ],

      fake_name: [
        'Lucas Pacheco',
        'Emien Beaver',
        'Oluchi Mazi',
        'Nuria Pelayo',
        'Chuwudi Udo',
        'Amolika Shaikh',
        'Amachea Jajah',
      ],
      items_list: [
        {
          icon: 'account_circle',
          name: 'Lucas Pacheco',
          sync: '1 min ago',
          status: 2,
          battery: 40,
          list: [],
          graph: [],
          map: [],
        },
      ],
      model: [1],
      tabB: 0,
      card_data: [
        {
          title: 'employee protected',
          data: 1432,
          trend: 'up',
          trend_data: 5,
        },
        {
          title: 'social distancing compliance',
          data: 1298,
          trend: 'up',
          trend_data: 90.1,
        },
        {
          title: 'non-compliant',
          data: 134,
          trend: 'down',
          trend_data: 9.9,
        },
        {
          title: 'team member at risk',
          data: 1,
          trend: 'up',
          trend_data: 9,
        },
        {
          title: 'immune',
          data: 15,
          trend: 'up',
          trend_data: 5,
        },
      ],
      delay: 0,
    }
  },
  mounted() {
    this.items_list = []
    let items_list = []
    // for (let i = 0; i < this.fake_name.length; i++) {
    //   items_list.push({
    //     icon: 'account_circle',
    //     name: this.fake_name[i],
    //     sync: Math.floor(Math.random() * 10) + ' min ago',
    //     status: Math.floor(Math.random() * 3),
    //     battery: Math.floor(Math.random() * 90 + 10),
    //     time:Math.floor(Math.random() * 59 + 1),
    //   })
    // }

    for (let i = 0; i < this.fake_name.length; i++) {
      items_list = []
      for (let i = 0; i < this.fake_name.length; i++) {
        items_list.push({
          icon: 'account_circle',
          position: 'maneger',
          name: this.fake_name[i],
          sync: Math.floor(Math.random() * 10) + ' min ago',
          status: Math.floor(Math.random() * 3),
          battery: Math.floor(Math.random() * 90 + 10),
          time: Math.floor(Math.random() * 59 + 1),
        })
      }
      this.items_list.push({
        icon: 'account_circle',
        name: this.fake_name[i],
        sync: Math.floor(Math.random() * 10) + ' min ago',
        status: Math.floor(Math.random() * 3),
        battery: Math.floor(Math.random() * 90 + 10),
        list: items_list,
        graph: [],
        map: [],
      })
    }

    // for (let i = 0; i < this.items_list.length; i++) {
    //   this.items_list[i].list = []
    //   for (let j = 0; j < this.items_list.length; j++) {
    //     const el = this.items_list[j]
    //     if (this.items_list[i].name != this.items_list[j].name) {
    //       console.log(el.name);
    //       el.time = Math.floor(Math.random() * 59 + 1)
    //       el.list = undefined
    //       el.graph = undefined
    //       el.map = undefined

    //       this.items_list[i].list.push(el)
    //     }
    //   }
    // }
    console.log(this.items_list)
    // this.items_all[0].data = []
    // this.items_all[1].data = []
    // this.items_all[2].data = []
    // this.items_all[3].data = []
    // this.items_all[4].data = []

    // this.items_all[0].data = this.items_list
    for (let i = 0; i < this.items_list.length; i++) {
      const el = this.items_list[i]
      this.items_all[0].data.push(el)

      if (el.battery < 30) {
        this.items_all[2].data.push(el)
      }
      if (el.status == 2) {
        this.items_all[3].data.push(el)
      }
      if (el.status == 1) {
        this.items_all[4].data.push(el)
      }
    }
    console.log(this.items_all)

    setTimeout(() => {
      this.delay = 2
    }, 1000)
  },
  methods: {
    changeTab(item) {
      // console.log(item)
      // this.tab = this.items.indexOf(item)
      this.tab = item
    },
    changeTabB(item) {
      // console.log(item, this.model)
      // check select type before
      // this.tabB = item
    },
    clickTab(e) {
      console.log(e)
      console.log(this.tab)
    },
    selectType() {
      console.log(this.toggle_exclusive)
      this.tabB = this.toggle_exclusive
    },
    percentTime(time) {
      return (time * 100) / 60
    },
    resolveUserProgressVariant(progrss) {
      // if (progrss <= 25) return 'error'
      // if (progrss > 25 && progrss <= 50) return 'warning'
      // if (progrss > 50 && progrss <= 75) return 'primary'
      // if (progrss > 75 && progrss <= 100) return 'success'

      if (progrss.status == 2) {
        if (progrss.time > 40) {
          return 'error'
        }
        if (progrss.time > 20) {
          return 'warning'
        }
        return 'info'
      }
      if (progrss.status == 1) {
        if (progrss.time > 40) {
          return 'warning'
        }
        if (progrss.time > 20) {
          return 'info'
        }
        return 'info'
      }

      return 'success'
    },
  },
  computed: {},
}
</script>

<style></style>
