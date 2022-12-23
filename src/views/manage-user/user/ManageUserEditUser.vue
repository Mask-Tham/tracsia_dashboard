<template>
  <v-navigation-drawer
    :value="isAddNewUserSidebarActive"
    temporary
    touchless
    :right="!$vuetify.rtl"
    :width="$vuetify.breakpoint.smAndUp ? 350 : '100%'"
    app
    @input="val => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <v-card height="100%">
      <div class="drawer-header d-flex align-center mb-4">
        <span class="font-weight-semibold text-base text--primary">{{
          !propUserData ? 'Add New Customer' : 'Edit User'
        }}</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="$emit('update:is-add-new-user-sidebar-active', false)">
          <v-icon size="22">
            {{ icons.mdiClose }}
          </v-icon>
        </v-btn>
      </div>

      <v-card-text>
        <alert :isShow="alert" :message="error"></alert>
      </v-card-text>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="userData.custumerID"
            outlined
            dense
            :rules="[validators.required]"
            label="Custumer ID"
            placeholder="Custumer ID"
            hide-details="auto"
            class="mb-6"
            :disabled="propUserData != undefined"
          ></v-text-field>

          <v-select
            v-model="select_role"
            :items="role_listC"
            label="Role"
            item-text="roleID"
            item-value="roleID"
            
            chips
            hint="What content is accessible?"
            persistent-hint
            class="mb-6"
          ></v-select>

          <v-select
            v-model="select_ability"
            :items="ability_listC"
            label="ability"
            multiple
            chips
            hint="What content is accessible?"
            persistent-hint
            class="mb-6"
          ></v-select>

          <v-btn v-if="!propUserData" color="primary" class="me-3" type="submit" @click="createCustomer"> Add </v-btn>
          <v-btn v-else color="primary" class="me-3" type="submit" @click="editCustomer"> Edit </v-btn>
          <v-btn color="secondary" outlined type="reset"> Cancel </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { required, emailValidator } from '@core/utils/validation'
import Alert from '@/utils/Alert.vue'
import ability_list from '@/views/ability_list'

export default {
  model: {
    prop: 'isAddNewUserSidebarActive',
    event: 'update:is-add-new-user-sidebar-active',
  },
  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
    propUserData: {
      type: Object,
    },
    propRoleList: {
      type: Array,
    },
    propAbilityList: {
      type: Array,
      default:() => []
    },
  },
  setup(props, { emit }) {
    return {
      // validation
      validators: { required, emailValidator },
      icons: {
        mdiClose,
      },
    }
  },
  components: { Alert },
  data() {
    return {
      userData: {
        email: '',
        picture: '',
        name: '',
        gender: '',
        isUse: true,
        roleID: '',
        password: '',
        birthdate: '',
        custumerID: '',
        phone_number: '',
        username: '',
        ability: [],
        position: '',
      },
      ability_list: ability_list,
      select_ability: [],
      role_list: [],
      select_role: '',
      error: '',
      alert: false,
      valid: false,
    }
  },
  computed: {
    role_listC() {
      let customerFilter = this.userData.custumerID == null ? '' : this.userData.custumerID
      return this.propRoleList.filter(el => {
        return el.custumerID.includes(customerFilter)
      })
    },
    ability_listC(){
      return this.propAbilityList.filter((item) => !item.isDefault)
    },
  },
  methods: {
    async createCustomer(e) {
      e.preventDefault()
      this.$refs.form.validate()
      try {
        console.log(this.valid)
        console.log(this.dateStart)
        if (this.valid) {
          this.userData.dateStart = `${this.dateStart.date} ${this.dateStart.time}:00`
          this.userData.dateEnd = `${this.dateEnd.date} ${this.dateEnd.time}:00`
          console.log(this.userData)

          // let res = await this.$http.post('custumer/custumer', this.userData)
          console.log(res)
          this.$refs.form.reset()
          this.$emit('refetch-data')
          this.$emit('update:is-add-new-user-sidebar-active', false)

          // refesh data
        }
      } catch (error) {
        console.error(error)
        this.error = error.data.message
        this.alert = true
      }
    },
    async editCustomer(e) {
      e.preventDefault()
      this.$refs.form.validate()
      try {
        console.log(this.valid)
        if (this.valid) {
          // console.log(this.userData)
          const ability = this.checkAbilityDefault(this.select_ability)
          let body = { ability: ability,
          roleID:this.select_role }
          let username = this.userData.username
          console.log(body, username)
          let res = await this.$http.put(`user/user/${username}`, body)
          console.log(res)
          
          // refesh data
          this.$refs.form.reset()
          this.$emit('refetch-data')
          this.$emit('update:is-add-new-user-sidebar-active', false)

        }
      } catch (error) {
        console.error(error)
        this.error = error.data.message
        this.alert = true
      }
    },
    checkAbilityDefault(select_ability){
      let isDefault = []
      this.ability_list.forEach((item) => {
        if (item.isDefault) {
          isDefault.push(item.key)
        }
      })
      let combinedArray = isDefault.concat(select_ability);
      // Convert the combined array to a Set and back to an array
      let uniqueArray = Array.from(new Set(combinedArray));
      return uniqueArray
    },
  },
  watch: {
    propUserData: {
      handler(newVal, oldVal) {
        console.log(newVal)
        if (newVal == undefined) {
          this.userData = {
            email: '',
            picture: '',
            name: '',
            gender: '',
            isUse: true,
            roleID: '',
            password: '',
            birthdate: '',
            custumerID: '',
            phone_number: '',
            username: '',
            ability: [],
            position: '',
          }
        } else {
          this.userData = newVal
          this.select_ability = newVal.ability
          this.select_role = newVal.roleID
        }
      },
      deep: true,
    },
  },
}
</script>
