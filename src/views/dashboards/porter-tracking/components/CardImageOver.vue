<template>
  <v-card>
    <div class="d-flex">
      <div>
        <v-card-title class="text-capitalize">
          {{ title }}
        </v-card-title>
        <v-card-text class="d-flex align-center">
          <slot name="value">
            <span class="text-h4 font-weight-bold ms-1 success--text'"> {{ value }}</span>
          </slot>
        </v-card-text>
      </div>
      <v-spacer></v-spacer>
      <div class="illustrator-img">
        <v-img :width="avatarWidth" :src="avatar"></v-img>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'title' },
    value: { type: String, default: '30' },
    statTitle: { type: String, default: '' },
    statistics: { type: String, default: '' },
    change: { type: String, default: '' },
    chipText: { type: String, default: '' },
    chipColor: { type: String, default: '' },
    avatar: { type: String, default: '' },
    avatarWidth: { type: String, default: '' },
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
</style>
