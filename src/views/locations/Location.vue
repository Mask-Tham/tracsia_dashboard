<template>
  <div>
    <!-- Drawer Porter Device -->
    <!-- <porter-tracking-add-device-drawer v-model="isDevicePorterSidebarActive"></porter-tracking-add-device-drawer> -->

    <!-- Drawer Add Location -->
    <location-add v-model="isAddLocationSidebarActive" :nodeData="node" @refetch-data="fetchData" />
    <v-card>
      <v-card-title>
        <div>Location</div>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on" @click="addBaseNode">
              <v-icon>
                {{ icons.mdiPlus }}
              </v-icon>
              add
            </v-btn>
          </template>
          <span class="text-capitalize">add location</span>
        </v-tooltip>
      </v-card-title>
      <v-progress-linear :active="loading" :indeterminate="loading"></v-progress-linear>
      <v-divider></v-divider>
      <v-card-text>
        <Tree :value="location">
          <span slot-scope="{ node, index, path, tree }">
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center">
                <b @click="tree.toggleFold(node, path)" style="cursor: pointer" v-if="node.children.length > 0">
                  <v-icon>
                    {{ node.$folded ? icons.mdiMenuRight : icons.mdiMenuDown }}
                  </v-icon>
                </b>
                <b v-else>
                  <v-icon>
                    {{ icons.mdiMinus }}
                  </v-icon>
                </b>
                <span v-if="node.children.length > 0" style="cursor: default">
                  {{ node.text || node.locationName }}
                </span>
                <span v-else @click="goto(node, path, index)" style="cursor: pointer">
                  {{ node.text || node.locationName }}
                </span>
              </div>
              <div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="goto(node, path, index)">
                      <v-icon>
                        {{ icons.mdiEye }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span class="text-capitalize">view</span>
                </v-tooltip>

                <!-- <v-tooltip bottom v-if="node.children.length <= 0 && isUsePorter">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="
                        () => {
                          isDevicePorterSidebarActive = true
                        }
                      "
                    >
                      <v-icon>
                        {{ icons.mdiCellphoneLink }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span class="text-capitalize">view</span>
                </v-tooltip> -->

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="addNode(node, path)">
                      <v-icon>
                        {{ icons.mdiPlus }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span class="text-capitalize">add sub location</span>
                </v-tooltip>

                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="copyNode(node, path)">
                      <v-icon>
                        {{ icons.mdiFolderMultiple }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span class="text-capitalize">copy</span>
                </v-tooltip> -->

                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="editName(node, path)">
                      <v-icon>
                        {{ icons.mdiFolderEdit }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span class="text-capitalize">edit</span>
                </v-tooltip> -->

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="removeNode(node)">
                      <v-icon>
                        {{ icons.mdiDelete }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span class="text-capitalize">delete</span>
                </v-tooltip>
              </div>
            </div>
          </span>
        </Tree>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  Tree, // Base tree
  Fold,
  Check,
  Draggable, // plugins
  foldAll,
  unfoldAll,
  cloneTreeData,
  walkTreeData,
  getPureTreeData, // utils
} from 'he-tree-vue'
import 'he-tree-vue/dist/he-tree-vue.css' // base style
import {
  mdiPlus,
  mdiFolderMultiple,
  mdiFolderEdit,
  mdiDelete,
  mdiMenuDown,
  mdiMenuRight,
  mdiMinus,
  mdiCircleSmall,
  mdiEye,
  mdiCellphoneLink,
} from '@mdi/js'
import PorterTrackingAddDeviceDrawer from '../dashboards/porter-tracking/add-device/PorterTrackingAddDeviceDrawer.vue'
import { canUse } from '@/plugins/acl/routeProtection'
import LocationAdd from './LocationAdd.vue'
import axiosIns from '@/plugins/axios'
import axios from 'axios'

export default {
  components: { Tree: Tree.mixPlugins([Fold]), PorterTrackingAddDeviceDrawer, LocationAdd },
  data() {
    return {
      userAbility: $cookies.get('userAbility'),
      userData: $cookies.get('userData'),
      isUsePorter: canUse({ action: 'manage', resource: 'porterTracking' }),
      location: [
        // { text: 'node 1', $folded: false, children: [] },
        // {
        //   text: 'node 2',
        //   $folded: false,
        //   children: [
        //     {
        //       text: 'node 2-1',
        //       $folded: false,
        //       children: [
        //         {
        //           text: 'node 2-1-1',
        //           $folded: false,
        //           children: [{ text: 'node 2-1-1-1', $folded: false, children: [] }],
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
      rawlocation: [
        {
          locationName: 'room 1',
          locationSort: `bu 1#floor 1#room 1#`,
          deviceID: '',
          custumerID: `tracsia`,
          responseAdmin: '',
        },
        {
          locationName: 'room 2',
          locationSort: `bu 1#floor 1#room 2#`,
          deviceID: '',
          custumerID: `tracsia`,
          responseAdmin: '',
        },
        {
          locationName: 'bu 1',
          locationSort: `bu 1#`,
          deviceID: '',
          custumerID: `tracsia`,
          responseAdmin: '',
        },
        {
          locationName: 'floor 1',
          locationSort: `bu 1#floor 1#`,
          deviceID: '',
          custumerID: `tracsia`,
          responseAdmin: '',
        },
        {
          locationName: 'floor 2',
          locationSort: `bu 1#floor 2#`,
          deviceID: '',
          custumerID: `tracsia`,
          responseAdmin: '',
        },
        {
          locationName: 'bu1',
          locationSort: `bu1#`,
          deviceID: '',
          custumerID: `tracsia`,
          responseAdmin: '',
        },
        {
          locationName: 'bu 2',
          locationSort: `bu 2#`,
          deviceID: '',
          custumerID: `tracsia`,
          responseAdmin: '',
        },
      ],
      loading: false,
      node: {},
      refPath: [],
      isDevicePorterSidebarActive: false,
      isAddLocationSidebarActive: false,
      icons: {
        mdiPlus,
        mdiFolderMultiple,
        mdiFolderEdit,
        mdiDelete,
        mdiMenuDown,
        mdiMenuRight,
        mdiMinus,
        mdiCircleSmall,
        mdiEye,
        mdiCellphoneLink,
      },
    }
  },
  async mounted() {
    const userData = this.$cookies.get('userData')
    const accessToken = this.$cookies.get('accessToken')
    const idToken = this.$cookies.get('idToken')
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      let res = await this.$http.get(`/v1/location/list/?customerID=${this.userData.custumerID}`)

      this.rawlocation = [...res.data.data]

      this.genLocation(this.rawlocation)
      this.loading = false
    },
    genLocation(rawlocation) {
      let location = []
      const pushInChild = (parent, child, i) => {
        let locationSort = child.locationSort.split('#')
        locationSort.pop()
        let Index = parent.findIndex(item => item.locationName === locationSort[i])
        if (Index < 0) {
          if (locationSort.length - 1 == i) {
            parent.push({ ...child, $folded: false, children: [] })
          } else {
            parent.push({ locationName: locationSort[i], $folded: false, children: [] })
            pushInChild(parent[parent.length - 1].children, child, i + 1)
          }
        } else {
          if (locationSort.length - 1 == i) {
            parent[Index] = { ...child, $folded: false, children: [...parent[Index].children] }
          } else {
            pushInChild(parent[Index].children, child, i + 1)
          }
        }
      }
      rawlocation.forEach((item, item_i) => {
        pushInChild(location, item, 0)
      })
      // console.log(location)
      this.location = [...location]
    },
    goto(node, path, index) {
      console.log(canUse({ action: 'manage', resource: 'porterTracking' }))
      console.log('goto')
      console.log(node, path, index)
      localStorage.setItem('location', JSON.stringify(node))
      this.$router.push(`/location/info`)
    },
    addBaseNode() {
      this.isAddLocationSidebarActive = true
      this.node = {}

      // this.location.push({ text: 'new node', $folded: false, children: [] })
    },
    addNode(node, path) {
      console.log(node, path)
      this.isAddLocationSidebarActive = true
      this.node = node
      // if (node.children == undefined) {
      //   node.children = [{ text: 'new node', $folded: false, children: [] }]
      // } else {
      //   node.children.push({ text: 'new node', $folded: false, children: [] })
      // }
    },
    copyNode(node, path) {
      //   console.log(node, path);
      let el = this.location
      if (path.length > 1) {
        el = el[path[0]]
        console.log(el)
        for (let i = 1; i < path.length - 1; i++) {
          console.log(i)
          el = el.children[path[i]]
        }
        el = el.children
      }

      // clone Object
      let copy_node = JSON.parse(JSON.stringify(node))
      ;(copy_node.text = copy_node.text + '-copy'), el.splice(path[path.length - 1] + 1, 0, copy_node)
    },
    editName(node, path) {
      // input in alert
      let new_name = prompt('Enter new location name')
      if (new_name) {
        node.text = new_name
      }
    },
    async removeNode(node) {
      try {
        let res = await this.$http.delete(
          `/v1/location/delete?customerID=${node.customerID}&locationID=${node.locationID}`,
        )
        this.fetchData()
      } catch (error) {
        console.error(error);
      }
      // console.log(this.treeData);
      // let el = this.location
      // if (path.length > 1) {
      //   el = el[path[0]]
      //   console.log(el)
      //   for (let i = 1; i < path.length - 1; i++) {
      //     console.log(i)
      //     el = el.children[path[i]]
      //   }
      //   el = el.children
      // }
      // el.splice(path[path.length - 1], 1)
    },
  },
}
</script>

<style></style>
