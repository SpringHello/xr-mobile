<template>
  <div class="regOk">
    <div class="regOk-top">
      <x-header>注册成功</x-header>
    </div>
    <div class="regOk-middle">
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  export default{
    components: {
      XHeader,
    },
    data (){
      return {}
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .regOk {
    background: rgba(255, 255, 255, 1);
    .regOk-top {
    }
    .regOk-middle {
    }
  }
</style>
