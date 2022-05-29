<template>
  <div class="item_diary">
    <div class="nav_bar_top">
      <h4>Diary</h4>
      {{ tab }}
    </div>
     
    <div class="container_diary_tab">
      <v-tabs grow background-color="#EDF7F9" v-model="tab" color="#6CA8C2">
        <v-tab @click="logtab(i)" v-for="i in items" :key="i">{{ i }}</v-tab>
      </v-tabs>
    </div>
    <div class="container_diary_tab_main">
      <div id="Temperature" class="tabcontent_none">
        {{ text }}{{ text }}{{ text }}{{ text }}{{ text }}{{ text }}
      </div>
      <div id="Symptoms" class="tabcontent_none">xcc</div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    model: "tab-2",
    items: ["Temperature", "Symptoms"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    items_monitor: [
      {
        id: 1,
        name: "Leanne GrahamLeanne Graham",
        icon: "sports_kabaddi",
        email: "Sincere@april.biz",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin HowellLeanne Graham",
        icon: "wash",
        email: "Shanna@melissa.tv",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine BauchLeanne Graham",
        icon: "masks",
        email: "Nathan@yesenia.net",
        website: "ramiro.info",
      },
    ],
  }),
  methods: {
    logtab(b) {
      console.log(b);
      var i, tabcontent_none, tablinks;
      tabcontent_none = document.getElementsByClassName("tabcontent_none");
      for (i = 0; i < tabcontent_none.length; i++) {
        tabcontent_none[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(b).style.display = "flex";
    },
  },
  mounted() {
    this.logtab("Temperature");
    // this.tab = 0;
    console.log(this.tab);
  },
};
</script>

<style lang="scss" scoped>
.item_diary {
  display: flex;
  flex-direction: column;
  background: #e6f0f2;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  .nav_bar_top {
    padding: 20px;
    background: #46b0c6;
    color: white;
    width: 100%;
    position: fixed;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container_diary_tab {
    position: absolute;
    top: 70px;
    right: 0px;
    bottom: 70px;
    left: 0px;
    /* height: calc(); */
    // border: 5px solid #4caf50;
  }
  .container_diary_tab_main {
    position: absolute;
    top: 118px;
    right: 0px;
    bottom: 70px;
    overflow: auto;
    left: 0px;
    padding: 20px;
    /* height: calc(); */
    // border: 5px solid #4caf50;
  }
  //    .container_diary_main {
  //     position: absolute;
  //     top: 70px;
  //     right: 0px;
  //     bottom: 70px;
  //     left: 0px;
  //     /* height: calc(); */
  //     border: 5px solid #4caf50;
  //   }
}
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
.tabcontent_none {
  display: none;
}
</style>