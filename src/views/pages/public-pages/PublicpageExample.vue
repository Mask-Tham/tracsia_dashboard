<template>
  <div style="font-family: 'Noto Sans', sans-serif">
    <Monitor id="Monitor_menu" class="tabcontent" />
    <Diary id="Diary" class="tabcontent" />
    <div id="nav_button_bar">
      <div id="div_top_hypers">
        <div @click="linkTo('Monitor_menu')" class="list_top_hypers" id="defaultOpen">
          <span class="material-icons"> thermostat </span>
          <p href="" class="a_top_hypers">Monitor</p>
        </div>
        <div @click="linkTo('Diary')" class="list_top_hypers">
          <span class="material-icons"> show_chart </span>
          <p href="" class="a_top_hypers">Diary</p>
        </div>
        <div @click="linkTo('Settings')" class="list_top_hypers">
          <span class="material-icons"> settings </span>
          <p href="" class="a_top_hypers">Settings</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Monitor from './views/layout/monitor.vue'
import Diary from './views/layout/Diary.vue'
export default {
  name: 'App',

  components: { Monitor, Diary },

  methods: {
    linkTo(cityName) {
      console.log(cityName)
      var i, tabcontent, tablinks
      tabcontent = document.getElementsByClassName('tabcontent')
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
      }
      tablinks = document.getElementsByClassName('tablinks')
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
      }
      document.getElementById(cityName).style.display = 'flex'
    },
  },
  mounted() {
    document.getElementById('defaultOpen').click()
  },
}
</script>
<style scoped>
@import './views/layout/for_app.scss';
</style>
