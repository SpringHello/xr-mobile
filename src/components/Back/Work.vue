<template>
  <div class="workOrder">
    <x-header>创建工单</x-header>
    <Group label-width="2.5rem">
      <x-input title='工单标题' required placeholder="请输入问题标题"></x-input>
      <popup-picker title="问题类型" :data="listType" v-model="wtype" @on-show="ShowType" @on-change="changeType"
                    :columns="2"></popup-picker>
      <popup-picker title="产品类别" :data="ProductType" v-model="ptype" @on-show="showProduct" @on-change="changePro"
                    :columns="2"></popup-picker>
    </Group>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import {XHeader, PopupPicker, Group, XInput} from 'vux'
  export default{
    components: {
      XHeader,
      Group,
      PopupPicker,
      XInput,
    },
    beforeRouteEnter(to, from, next){
      axios.get('order/orderType.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          next(vm => {
            vm.all = response.data.result
          })
        }
      })

    },
    data (){
      return {
        listType: [],
        wtype: [],
        type: '',
        all: [],
        ProductType: [],
        ptype: [],
        proudct: ''
      }
    },
    methods: {
      //问题类型
      ShowType(){
        for (let key in  this.all) {
          this.listType.push({name: key, value: key, parent: 0})
        }
      },
      changeType(key){
        this.type = key[0]
        this.listType == null
      },
      //产品类别
      showProduct(){
        for (let item in this.all) {
          if (this.type == item) {
            this.all[this.type].forEach(i => {
              this.ProductType.push({name: i.description, value: i.description, parent: 0, id: i.id, gid: i.gid})
            })
          }
        }
      },
      changePro(){
        this.ProductType == null
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
