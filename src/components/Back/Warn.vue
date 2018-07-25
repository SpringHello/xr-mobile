<template>
  <div class="warn">
    <x-header>告警</x-header>
    <div style="padding:.6rem;">
      <button-tab v-model="currentTab">
        <button-tab-item selected>未读警告</button-tab-item>
        <button-tab-item>已读警告</button-tab-item>
      </button-tab>
      <div v-if="currentTab==0">
        未读警告
      </div>
      <div v-else>
        已读警告
      </div>
    </div>
  </div>
</template>

<script>
  import {ButtonTab, ButtonTabItem, XHeader} from 'vux'
  export default{
    components: {
      XHeader,
      ButtonTab,
      ButtonTabItem
    },
    data (){
      window.scrollTo(0, 0);
      return {
        currentTab: 0
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @button-tab-border-color: red;
</style>
