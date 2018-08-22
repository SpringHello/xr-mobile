<template>
  <div class="work">
    <x-header>创建工单</x-header>
    <Group label-width="2.5rem">
      <x-input title='工单标题' required placeholder="请输入问题标题" v-model="title"></x-input>
      <popup-picker title="问题类型" :data="listType" v-model="wtype" @on-show="ShowType" @on-change="changeType"
                    :columns="2"></popup-picker>
      <popup-picker title="产品类别" :data="ProductType" v-model="ptype" @on-show="showProduct" @on-hide="changePro"
                    :columns="2" show-name></popup-picker>
      <x-textarea title="问题描述" :max="200" placeholder="请输问题描述" :rows=5 v-model="desc"></x-textarea>
    </Group>

    <p class="btn">
      <x-button type="primary" @click.native="submit" :disabled="!title || !desc">提交</x-button>
    </p>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import {XHeader, PopupPicker, Group, XInput, XTextarea, XButton} from 'vux'
  export default{
    components: {
      XHeader,
      Group,
      PopupPicker,
      XInput,
      XTextarea,
      XButton
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
      window.scrollTo(0, 0);
      return {
        listType: [],
        wtype: [],
        type: '',
        all: [],
        ProductType: [],
        ptype: [],
        //工单
        title: '',
        desc: '',
        id: '',
        gid: ''
      }
    },
    methods: {
      //问题类型
      ShowType(){
        this.listType = []
        for (let key in  this.all) {
          this.listType.push({name: key, value: key,})
        }
      },
      changeType(key){
        this.type = key[0]
        this.ptype = []
      },
      //产品类别
      showProduct(){
        this.ProductType = []
        for (let item in this.all) {
          if (this.type == item) {
            this.all[this.type].forEach(i => {
              this.ProductType.push({name: i.description, value: `${i.id}#${i.gid}`})
            })
          }
        }
      },
      changePro(){
        let arr = this.ptype[0].split('#')
        this.id = arr[0], this.gid = arr[1]
      },
      //提交
      submit(){
        axios.get('order/createOrder.do', {
          params: {
            title: this.title,
            content: this.desc,
            gid: this.gid,
            cid: this.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text(response.data.message, 'middle')
            this.$router.push('workorder')
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .btn {
    position: fixed;
    bottom: .48rem;
    width: 90%;
    margin: 0 5%;
  }
</style>
