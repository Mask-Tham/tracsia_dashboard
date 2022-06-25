<template>
  <div>
    <v-app-bar app>
      <div class="d-flex align-center justify-center">
        <v-btn icon>
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>
          <v-img width="200" align="center" src="@/assets/images/svg/nav-logo.png"></v-img>
        </v-toolbar-title>
      </div>
    </v-app-bar>
    <section class="container pa-4 pa-sm-6 pa-md-15 container--fluid d-xl-flex d-md-flex d-lg-flex justify-center">
      <v-row style="max-width: 1000px" class="">
        <v-col cols="12" sm="12" md="8">
          <div class="pa-2" outlined tile>
            <div>
              <h1 style="color: #1b2e57" class="v-heading text-h3 text-sm-h4">{{ data_value[res_value].title }}</h1>
            </div>
            <br /><br />
            <div>{{ data_value[res_value].detail }}</div>
          </div>
        </v-col>
        <v-col cols="12" align="center" md="4">
          <div class="pa-2" outlined tile>
            <v-img width="500" :src="require('@/assets/images/device/' + res_value + '.png')"></v-img>
          </div>
        </v-col>
      </v-row>
    </section>
    <section
      style="background: white"
      class="container pa-4 pa-sm-6 pa-md-15 container--fluid d-xl-flex d-md-flex d-lg-flex justify-center"
    >
      <v-row style="max-width: 1000px" class="">
        <v-col align="center" cols="12">
          <div class="pa-2">
            <div>
              <h1 style="color: #1b2e57" class="v-heading text-h3 text-sm-h4 mb-3">Key Features</h1>
            </div>
            <br />
            <v-row>
              <v-col v-for="i in data_value[res_value].keyfeatures">
                <div>
                  <div class="pa-7 bg-secondary rounded-circle d-inline-block">
                    <v-icon style="color: #1b2e57" x-large>{{ i.img }}</v-icon>
                  </div>
                </div>
                <div style="color: #1b2e57" class="mt-3">{{ i.info }}</div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </section>
    <section
      style="background: white"
      class="container pa-4 pa-sm-6 pa-md-15 container--fluid d-xl-flex d-md-flex d-lg-flex justify-center"
    >
      <v-row style="max-width: 1000px" class="">
        <v-col align="center" cols="12">
          <div class="pa-2">
            <div>
              <h1 style="color: #1b2e57" class="v-heading text-h3 text-sm-h4 mb-3">How it works</h1>
            </div>
            <br />
            <v-col cols="12" align="center" md="12">
              <div class="pa-2" outlined tile>
                <v-img
                  src="https://i0.wp.com/www.minew.com/wp-content/uploads/2021/06/1920-587-27.png?fit=1920%2C587&ssl=1"
                ></v-img>
              </div>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </section>
    <section
      style="background: white"
      class="container pa-4 pa-sm-6 pa-md-15 container--fluid d-xl-flex d-md-flex d-lg-flex justify-center"
    >
      <v-row style="max-width: 1000px" class="">
        <v-col align="center" cols="12">
          <div>
            <h1 style="color: #1b2e57" class="v-heading text-h3 text-sm-h4 mb-3">Highlights</h1>
          </div>
        </v-col>
        <br />
        <v-row v-for="i in data_value[res_value].highlights" :key="i" style="width: 100%" class="">
          <v-col cols="12" sm="12" md="6">
            <div class="pa-2" outlined tile>
              <div v-if="i.position" class="pa-2" outlined tile>
                <h2>{{ i.head }}</h2>
                <br />
                <p>
                  {{ i.info }}
                </p>
              </div>
              <v-img
                v-else
                style="width: 100%"
                src="	https://i0.wp.com/www.minew.com/wp-content/uploads/2021/06/1-24.png?fit=960%2C550&ssl=1"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-img
              v-if="i.position"
              style="width: 100%"
              src="	https://i0.wp.com/www.minew.com/wp-content/uploads/2021/06/1-24.png?fit=960%2C550&ssl=1"
            ></v-img>
            <div v-else class="pa-2" outlined tile>
              <h2>{{ i.head }}</h2>
              <br />
              <p>
                {{ i.info }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-row>
    </section>
    <section class="container pa-4 pa-sm-6 pa-md-15 container--fluid d-xl-flex d-md-flex d-lg-flex justify-center">
      <v-row style="max-width: 1000px; background: white" class="">
        <v-col cols="12" md="12" sm="12" order="12" order-md="4">
          <v-tabs v-model="tab" grow show-arrows>
            <v-tab v-for="(i, index) in tab_list" :key="index" :href="'#tab-' + i.id">{{ i.name }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(i, index) in tab_list" :key="index" :value="'tab-' + i.id">
              <v-card :style="{ background: isDark ? '#28243d' : '#F4F5FA' }">
                <v-row class="match-height ma-0">
                  <v-simple-table grow>
                    <template  v-slot:default>
                      <!-- <thead>
                        <tr>
                          <th class="text-left">Name</th>
                          <th class="text-left">Calories</th>
                        </tr>
                      </thead> -->
                      <tbody>
                        <tr v-for="item in desserts" :key="item.name">
                          <td>{{ item.name }}</td>
                          <td>{{ item.calories }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import deviceinfo from './list_info_device'
import useAppConfig from '@core/@app-config/useAppConfig'
export default {
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
      res_value: '',
      data_value: deviceinfo,
      tab: null,
      tab_list: [
        {
          id: 1,
          name: 'Parameters',
          list_device: [],
        },
        {
          id: 2,
          name: 'Customization',
          list_device: [],
        },
        {
          id: 3,
          name: 'Download File',
          list_device: [],
        },
      ],
    }
  },
  setup() {
    const { isDark } = useAppConfig()
    return {
      isDark,
    }
  },
  mounted() {
    this.res_value = this.$route.params.model
  },
}
</script>

<style lang="scss" scoped>
// .row_main {
//   padding: 100px 400px;
// }
.bg-secondary {
  background: #f5f7f9;
}
</style>
