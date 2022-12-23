<template>
  <v-card>
    <v-card-title class="pa-3 pb-0 d-flex justify-space-between">
      <div>Product Management</div>
      <div>
        <!-- <v-btn tile>
          <v-icon left> {{ icons.mdiTrayArrowUp }} </v-icon>
          import
        </v-btn>
        <v-btn tile >
          <v-icon left> {{ icons.mdiTrayArrowDown }} </v-icon>
          download
        </v-btn> -->
        <!-- <v-select v-model="select" :items="items" item-text="text" item-value="value" label="Solo field" solo
                    dense hide-details style="width:200px" @change="genDataChart"></v-select> -->
      </div>
    </v-card-title>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1 tw-p-4"
    >
    <template #item.edit="{item}">
        <form-add-e-s-l :form="item" @refetch-data="getData"/>
    </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mdiTrayArrowDown, mdiTrayArrowUp } from '@mdi/js'
import FormAddESL from './FormAddESL.vue'

export default {
  components: { FormAddESL },
  data() {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        { text: 'name', value: 'name' },
        { text: 'barcode', value: 'barcode' },
        { text: 'qrcode', value: 'qrcode' },
        { text: 'label1', value: 'label1' },
        { text: 'label2', value: 'label2' },
        { text: 'label3', value: 'label3' },
        { text: 'label4', value: 'label4' },
        { text: 'label5', value: 'label5' },
        { text: 'label6', value: 'label6' },
        { text: 'label7', value: 'label7' },
        { text: 'label8', value: 'label8' },
        { text: 'label9', value: 'label9' },
        { text: 'label10', value: 'label10' },
        { text: 'label11', value: 'label11' },
        { text: 'label12', value: 'label12' },
        { text: 'Edit', value: 'edit' },
      ],
      desserts: [],
      icons: {
        mdiTrayArrowDown,
        mdiTrayArrowUp,
      },
      userData: null,
    }
  },
  mounted() {
    this.userData = this.$cookies.get('userData')
    this.getData()
  },
  methods: {
    async getData() {
      try {
        let res = await this.$http.get(`/v1/minew-esl/list?custumerID=${this.userData.custumerID}`)
        console.log(res)
        this.desserts = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    
  },
}
</script>
