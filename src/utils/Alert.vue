<template>
  <v-alert dense outlined :value="isShow" :type="type">
    <v-row align="center">
      <v-col>
        {{ message }}
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
    props:{
        isShow:{
            type:Boolean,
            required: true,
        },
        message:{
            type:String,
            required: true,
        },
        type:{
            type:String,
            validator:(val) => {
                return ['info','success','warning','error'].includes(val)
            },
            default:'error'
        }
    }
}
</script>

<style></style>
