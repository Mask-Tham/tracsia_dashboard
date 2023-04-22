<template>
<div style="padding: 10px;">


  <table id="customers">
  <tr>
    <th>Sensor Name</th>
    <th>Sensor Type</th>
    <th>Data</th>
    <th>Battery</th>
    <th>Time</th>
    <!-- <th>2</th>
    <th>3</th>
    <th>4</th>
    <th>5</th>
    <th>6</th>
    <th>7</th>
    <th>8</th>
    <th>9</th>
    <th>10</th>
    <th>11</th>
    <th>12</th> -->
  </tr>
  <tr v-for="i in desserts">
    <td>Alfreds Futterkiste</td>
    <td align="center"><v-icon :color="i.value ? '#84E0BE' : '#FF6643' " size="20">{{ i.value ? icons.mdiCheckCircle : icons.mdiCloseCircle}}</v-icon></td>
    <td align="center"><v-icon :color="i.value ? '#84E0BE' : '#FF6643' " size="20">{{ i.value ? icons.mdiCheckCircle : icons.mdiCloseCircle}}</v-icon></td>
    <td align="center"><v-icon :color="i.value ? '#84E0BE' : '#FF6643' " size="20">{{ i.value ? icons.mdiCheckCircle : icons.mdiCloseCircle}}</v-icon></td>
    <td>Alfreds Futterkiste</td>
  </tr>
</table>
</div>
</template>

<script>
import { mdiAlertOutline, mdiCheckCircle, mdiCloseCircle, mdiCloudUploadOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  props: {
    accountData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const status = ['Active', 'Inactive', 'Pending', 'Closed']
    const desserts = [
          {
            name: 'Frozen Yogurt',
            value: true,
          },
          {
            name: 'Ice cream sandwich',
            value: false,
          },
          {
            name: 'Eclair',
            value: true,
          },
          {
            name: 'Cupcake',
            value: true,
          },
          {
            name: 'Gingerbread',
            value: true,
          },
          {
            name: 'Jelly bean',
            value: true,
          },
          {
            name: 'Lollipop',
            value: true,
          },
          {
            name: 'Honeycomb',
            value: true,
          },
          {
            name: 'Donut',
            value: true,
          },
          {
            name: 'KitKat',
            value: true,
          },
        ]
    const accountDataLocale = ref(JSON.parse(JSON.stringify(props.accountData)))

    const resetForm = () => {
      accountDataLocale.value = JSON.parse(JSON.stringify(props.accountData))
    }

    return {
      status,
      accountDataLocale,
      desserts,
      resetForm,
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
        mdiCheckCircle,
        mdiCloseCircle
      },
    }
  },
}
</script>
<style  scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

/* #customers tr:nth-child(even){background-color: #f2f2f2;} */

/* #customers tr:hover {background-color: #ddd;} */

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #c5e1fd;
  color: #2E4765;
}
</style>
