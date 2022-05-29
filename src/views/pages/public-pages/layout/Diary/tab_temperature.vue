<template>
  <div id="tab_temperature">
    <div class="div_1">
      <div class="div_1_1">
        <img width="102px" style="transform: rotate(330deg)" src="https://i.ibb.co/V94Ng0g/temp.png" alt="" />
      </div>
      <div class="div_1_2">
        <ul>
          <li>Temperature Trend</li>
          <li>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
#tab_temperature {
  width: 100%;
  .div_1 {
    display: flex;
    width: 100%;
  }
  .div_1_1 {
    width: 200px;
  }
  .div_1_2 {
    width: calc(100%-200px);
  }
  .div_1_2 ul {
    list-style: none;
  }
}
</style>
