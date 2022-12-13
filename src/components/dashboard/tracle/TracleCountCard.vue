<template>
  <v-card :class="`bg-${item.color}`" >
    <v-card-text class="pa-0 d-flex flex-row align-center h-100 text-color-light">
        <v-img :src="item.img" alt="icon" width="20%"/>
        <div class="d-flex flex-column w-100 pr-1 pt-1 pb-1">
            <span class="font-weight-medium">
                {{item.title}}
            </span>
            <span class="font-weight-black">
                {{item.count}}
                {{item.total? `/${item.total}` : ''}}
            </span>
            <v-progress-linear v-if="item.total" color="info" :value="(item.count/item.total*100)"></v-progress-linear>
        </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    props:{
        item:{
            type:Object,

        }
    }
}
</script>

<style>

</style>