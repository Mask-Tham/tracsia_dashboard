<template>
  <div>
    <h1>Public Page</h1>
    <v-btn @click="send">send mgs</v-btn>
    <v-btn @click="disconnect">Disconnect</v-btn>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$wss.onmessage = ({ data }) => {
      console.log(`onmessage: ${data}`)
    }
  },
  methods: {
    send() {
      this.$wss.send(
        // This message will be routed to 'routeA' based on the 'action'
        // property
        JSON.stringify({ action: 'routeA', data: 'Hello from client.' }),
      )
    },
    disconnect(){
      this.$wss.close();
    }
  },
}
</script>

<style></style>
