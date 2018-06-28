<template>
  <div style="background: #FFF;">
    <!--v-if="RZsuccess"-->
    <div id="success">
      <x-header>身份证号验证</x-header>
      <div class="success">
        <img src="../../assets/img/back/success.png">
        <p class="title">操作成功</p>
        <p class="dec">实名认证操作成功</p>
      </div>
      <div class="btn">
        <router-link to="certification" class="button">完成</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import $store from '@/vuex'
  import {XHeader} from 'vux'
//  console.log($store.state.authInfo)
  export default{
    components: {
      XHeader,
    },
    data (){

      return {
        RZsuccess: sessionStorage.getItem('RZsuccess')
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
  #success {
    .success {
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
      .button {
        display: block;
        width: 100%;
        background: rgba(74, 144, 226, 1);
        border-radius: .1rem;
        border: 1px solid rgba(71, 104, 177, 1);
        font-size: .36rem;
        line-height: .5rem;
        color: #FFF;
        padding: .19rem 0;
        text-align: center;
      }
    }

  }
</style>
