<template>
  <div>
    <x-header>实名认证</x-header>
    <div class="desc">
      <img src="../../assets/img/back/yjfk.png">
      <p>
        根据《中华人民共和国网络安全法》等网络安全相关的法律法规规定，及按网监，公安等有关监管单位要求，云计算资源用户须完成用户实名认证才能使用云服务。请您认真填写相关实名认证信息，完成实名认证申请。
      </p>
    </div>
    <div class="progress">
      <div class="progress-title">
        <h6>身份证号验证</h6>
        <p>实时审核，无需等待</p>
      </div>
      <div class="progress-step">
        <div v-for="(item,index) in steps" :key="index">
          <p class="num">{{item.num}}</p>
          <p class="des">{{item.desc}}</p>
        </div>
      </div>
      <button @click="goCard">立即认证</button>
    </div>

  </div>

</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, Icon} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      Icon
    },
    data (){
      window.scrollTo(0, 0);
      return {
        //认证信息
        authInfo: $store.state.authInfo,
        steps: [
          {num: '1', desc: '填写个人资料'},
          {num: '2', desc: '提交审核'},
          {num: '3', desc: '认证完成'},
        ],
      }
    },
    methods: {
      // 跳转到认证页面
      goCard(){
        this.$router.push('idcard')
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  .desc {
    background: rgba(247, 251, 255, 1);
    padding: .24rem .32rem .24rem .16rem;
    display: flex;
    img {
      width: .32rem;
      height: .32rem;
    }
    p {
      padding-left: .15rem;
      font-size: .24rem;
      color: rgba(125, 161, 217, 1);
    }
  }

  .progress {
    margin: .2rem .1rem;
    background: rgba(255, 255, 255, 1);
    .progress-title {
      text-align: center;
      padding-top: .34rem;
      h6 {
        font-size: .36rem;
        color: rgba(51, 51, 51, 1);
        font-weight: normal;
        line-height: .5rem;
      }
      p {
        padding-top: .16rem;
        font-size: .2rem;
        color: rgba(153, 153, 153, 1);
      }

    }
    .progress-step {
      margin: .4rem .55rem;
      display: flex;
      font-size: .2rem;
      color: rgba(51, 51, 51, 1);
      justify-content: space-between;
      align-items: center;
      position: relative;
      &::after {
        position: absolute;
        top: 19%;
        right: 19%;
        content: '';
        width: 1.5rem;
        height: .02rem;
        background-color: #d8d8d8;
        display: inline-block;
      }
      &::before {
        position: absolute;
        top: 19%;
        left: 19%;
        content: '';
        width: 1.5rem;
        height: .02rem;
        background-color: #d8d8d8;
        display: inline-block;
      }
      div {
        width: 1.7rem;
        text-align: center;
        .num {
          line-height: .3rem;
          width: .32rem;
          height: .32rem;
          background: rgba(74, 144, 226, 1);
          border-radius: 50%;
          color: #FFF;
          margin: 0 auto;
        }
        .des {
          padding-top: .24rem;
        }

      }

    }
  }

  button {
    border: 1px solid rgba(74, 144, 226, 1);
    width: 100%;
    padding: .19rem 0;
    outline: none;
    background: rgba(74, 144, 226, 1);
    font-size: .36rem;
    color: rgba(255, 255, 255, 1);
    line-height: .5rem;
  }


</style>
