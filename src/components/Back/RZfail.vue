<template>
  <div style="background: #FFF;">
    <div id="fail">
      <x-header>身份证号认证</x-header>
      <div class="fail">
        <img src="../../assets/img/back/fail.png">
        <p class="title">操作失败</p>
        <p class="dec">{{RZfail}}</p>
      </div>
      <div class="btn">
        <button @click="goRZ">重试</button>
      </div>

    </div>
  </div>
</template>

<script>
  import $store from '@/vuex'
  import {XHeader} from 'vux'
  export default{
    components: {
      XHeader,
    },
    data (){

      return {
        RZfail: sessionStorage.getItem('RZfail')
      }
    },
    methods: {},
    computed: {
      authInfo(){
        return $store.state.authInfo
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #fail {
    .fail {
      text-align: center;
      padding: 1rem 0 .66rem 0;
      .title {
        padding: .4rem 0 .22rem 0;
        font-size: .36rem;
        color: #333;
      }
      .dec {
        font-size: .28rem;
        color: #999;
      }

    }
    .btn {
      padding: 0 .3rem;
      button {
        width: 100%;
        background: rgba(74, 144, 226, 1);
        border-radius: .1rem;
        border: 1px solid rgba(71, 104, 177, 1);
        font-size: .36rem;
        line-height: .5rem;
        color: #FFF;
        padding: .19rem 0;
      }
    }

  }

</style>
