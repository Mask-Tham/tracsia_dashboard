<template>
  <v-card>
    <v-card-title class="justify-center">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="172"
        max-width="222"
        src="https://picsum.photos/id/11/500/300"
      ></v-img>
      <br/>
      <v-btn class="ma-2" block outlined color="info">{{$tc('healthcare.change accessory')}}</v-btn>
    </v-card-title>
    <v-card-text>
      <h2>{{$tc('healthcare.accessory details',2)}}</h2>
      <br />

      <h4 class="text-uppercase">{{$tc('healthcare.id')}}</h4>
      <span>00:0a:95:9d:68:16</span>
      <br />
      <br />

      <h4 class="text-uppercase">{{$tc('healthcare.last synced')}}</h4>
      <span>3 mins ago</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {

}
</script>

<style></style>
