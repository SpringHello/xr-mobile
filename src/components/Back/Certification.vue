<template>
  <div>
    <div v-if="authInfo.authtype">
      <x-header>身份证号验证</x-header>
      <p class="title"> <icon type="success"></icon><span >您已通过实名认证</span></p>
      <group>
        <cell title="姓名" :value="authInfo.name" ></cell>
        <cell title="身份证号" :value="authInfo.personalnumber" ></cell>
        <cell title="手机号码" :value="authInfo.phone" ></cell>
      </group>
    </div>
    <div v-else>
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
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell,XHeader,Icon } from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      Icon
    },
    data (){
      return {
        //认证信息
        authInfo: $store.state.authInfo,
        steps:[
          {num:'1',desc:'填写个人资料'},
          {num:'2',desc:'提交审核'},
          {num:'3',desc:'认证完成'},
        ],
      }
    },
    methods:{
     // 跳转到认证页面
      goCard(){
          this.$router.push('idcard')
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .title{
    text-align: center;
    span{
      vertical-align: middle;
      display: inline-block;
      font-size:.36rem;
      color:rgba(51,51,51,1);
      padding-left: .24rem;
    }
  }

  .desc{
    background:rgba(247,251,255,1);
    padding: .24rem .32rem .24rem .16rem;
    display: flex;
    img{
      width: .32rem;
      height: .32rem;
    }
    p{
      padding-left: .12rem;
      font-size:.24rem;
      color:rgba(125,161,217,1);
    }
  }
  .progress{
    margin: .2rem .1rem;
    background:rgba(255,255,255,1);
    .progress-title{
      text-align: center;
      padding-top: .34rem;
      h6{
        font-size:.36rem;
        color:rgba(51,51,51,1);
        font-weight: normal;
        line-height: .5rem;
      }
     p{
        padding-top: .16rem;
        font-size: .2rem;
        color:rgba(153,153,153,1);
      }

    }
    .progress-step{
      padding: .48rem .55rem;
      display: flex;
      font-size: .2rem;
      color:rgba(51,51,51,1);
      justify-content: space-between;
      div{
        .num{
          text-align: center;
          line-height: .28rem;
          width:.32rem;
          height:.32rem;
          background:rgba(74,144,226,1);
          border-radius: 50%;
          color: #FFF;
          margin: 0 auto;
        }
        .des{
          padding-top: .24rem;
        }
      }

    }
    button{
      width: 100%;
      padding: .17rem 0 .21rem 0;
      border: none;
      outline: none;
      background:rgba(74,144,226,1);
      font-size:.36rem;
      color:rgba(255,255,255,1);
      line-height:.5rem;
    }
  }

</style>
