<template>
  <div 
    style="
      display: flex;
      flex-direction: column;
      background: #e6f0f2;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
    "
  >
    <div class="nav_bar_top">
      <h4>Hello</h4>
      <div>
        <h5 style="text-align: right">Sticker</h5>
        <h5 style="text-align: right; display: flex; align-items: center">
          <span class="material-icons rotate_r"> battery_full </span>100%
        </h5>
      </div>
    </div>

    <div align="center" class="container_temp">
      <div align="center" class="child">
        <ul style="list-style: none; ">
          <li>
            <div class="container_temp_div">
              <ul style="list-style: none">
                <li >High Fever</li><br>
                <li>
                  <h2
                    style="
                      background: -webkit-linear-gradient(45deg,  #9c20aa, #fb3570);
                      -webkit-background-clip: text;
                      font-size: 3rem;
                      -webkit-text-fill-color: transparent;
                    "
                  >
                    39.6
                  </h2>
                </li><br>
                <li>as if 4.32 PM</li>
              </ul>
            </div>
          </li>
          <br />
          <li><h4 class="button_temp">Take Temperature Now</h4></li>
        </ul>
      </div>
    </div>
    <div id="Monitor_menu_buttom" align="center">
      <h3 style="font-weight: 100;">Feelling sick? Prevent transmission</h3>
      <br />
      <div style="display: flex; width: 100%; justify-content: center">
        <ul
          v-for="i in items_monitor"
          :key="i"
          style="width: 33%; list-style: none"
          align="center"
        >
          <li style="margin-bottom: 10px">
            <span
              style="
                padding: 10px;
                background-color: rgba(255, 255, 255, 0.15);

                backdrop-filter: blur(5px);
                border-radius: 50%;
              "
              class="material-icons"
            >
              {{ i.icon }}
            </span>
          </li>
          <li>
            <h5 style="font-weight: 100;">{{ i.name }}</h5>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
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
};
</script>

<style scoped>
.nav_bar_top {
  padding: 20px;
  /* position: fixed;
  top: 0px; */
  width: 100%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.container_temp {
  /* margin: 25px; */
  /* width: 100%; */
  /* padding: 20px; */
  position: absolute;
  top: 70px;
  right: 0px;
  bottom: 250px;
  left: 0px;
  /* height: calc(); */
  /* border: 5px solid #4caf50; */
  /* Setup */
}
.button_temp {
  background-color: white;
  color: #46b0c6;
  border-radius: 30px;
  padding: 8px;
}
.child {
  /* height: 50px; */
  /* background-color: red; */
  position: absolute;
  /* top: 50%; */
  height: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
}
.container_temp_div {
  width: 250px;
  display: flex;
  height: 250px;
  position: relative;
  justify-content: center;
  align-items: center;
}
.container_temp_div::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: 10px;
  background: linear-gradient(45deg,  #9c20aa, #fb3570);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
</style>