<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card
      @click="goto()"
      :elevation="hover ? 16 : 2"
      class="bd-r"
      :style="{ background: device_value['AS'] == 'sos' ? '#ff0000' : '' }"
    >
      <!-- <pre>{{ device_value}}</pre> -->
      <!-- <div style="display: flex">
      <div style="width: 50%">
        <v-img :width="avatarWidth" :src="avatar"></v-img>
      </div>

      <div  style="width: 50%; padding: 15px;">
        <v-row>ded<v-spacer/><v-icon size="30">radio_button_checked </v-icon></v-row>
        <div>cc</div>
      </div>
    </div> -->
      <div style="display: grid; justify-items: center">
        <h3 class="pt-2 font-weight-semibold">{{ device_value.Name }}</h3>
      </div>

      <div style="display: flex" class="d-flex">
        <div style="display: flex; align-items: center; width: 40%">
          <v-img :width="avatarWidth" :src="require('@/assets/images/device/' + device_value.Model + '.png')"></v-img>
        </div>

        <div style="width: 60%; display: flex; align-items: flex-start; flex-direction: column">
          <v-card-text style="padding: 0px 20px" class="d-flex align-center">
            <p class="mb-0">
              {{ device_value.Mac }}
            </p>
          </v-card-text>
          <v-card-text style="padding: 0px 20px" class="d-flex align-center">
            <h4 class="font-weight-semibold">
              {{ device_value.Model }}
            </h4>
          </v-card-text>
          <v-card-text
            style="padding: 0px 20px"
            v-for="(i, index) in Object.keys(device_value)"
            :key="index"
            v-if="!['Name', 'Type', 'Model', 'Timestamp', 'Mac'].includes(i)"
            class="d-flex align-center"
          >
            <p style="margin-bottom: 8px">{{ i }} : {{ device_value[i] }}</p>
          </v-card-text>
          <v-card-text>
            <v-chip small :color="chipColor" class="v-chip-light-bg font-weight-semibold" :class="`${chipColor}--text`">
              {{ convert_timestamp }}
            </v-chip>
          </v-card-text>
        </div>
      </div>
    </v-card></v-hover
  >
</template>

<script>
// import moment from 'moment'
export default {
  props: ['device_value'],
  data() {
    return {
      avatarWidth: '200',
      chipColor: 'primary',
    }
  },
  setup() {
    const checkChange = value => {
      const firstChar = value.charAt(0)
      if (firstChar === '+') {
        return true
      }

      return false
    }

    return { checkChange }
  },
  methods: {
    goto() {
      console.log('ccccccccccccccccccccc')
      this.$router.push({
        path: '/management/deviceList/' + this.device_value.Model,
      })
    },
  },
  computed: {
    convert_timestamp() {
      const currentdate = this.$moment(this.device_value.Timestamp).format('DD-MM-YYYY HH:mm:ss')
      // console.log(currentdate)
      return currentdate
    },
  },
}
</script>

<style lang="scss" scoped>
.illustrator-img {
  position: absolute;
  right: 5%;
  bottom: 0;
}

.v-application {
  &.v-application--is-rtl {
    .illustrator-img {
      left: 5%;
      right: unset;
    }
  }
}
.bd-r {
  border-radius: 80px;
}
</style>
