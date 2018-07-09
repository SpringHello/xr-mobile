<template>
  <div class="workOrder">
    <x-header>工单
      <router-link slot="right" to="work">创建工单</router-link>
    </x-header>
    <tab active-color="#4A90E2" default-color="#000">
      <tab-item :selected="index==0" v-for="(item,index) in tabItems" :key="index" @on-item-click="workClick(index)">
        {{item.title}}
      </tab-item>
    </tab>
    <div v-show="indexs==0">1</div>
    <div v-show="indexs==1">2</div>
    <div v-show="indexs==2">3</div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import {XHeader, PopupPicker, Group, Tab, TabItem} from 'vux'
  export default{
    components: {
      XHeader,
      Group,
      PopupPicker,
      Tab,
      TabItem
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    data (){
      return {
        indexs: '',
        tabItems: [
          {title: '全部', type: '',},
          {title: '进行中', type: '',},
          {title: '已完成', type: '',}
        ],
      }
    },
    methods: {
      //导航点击事件
      workClick(index){
        this.indexs = index
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
