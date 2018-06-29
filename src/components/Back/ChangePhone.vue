<template>
  <div id="setPhone">
    <x-header>修改绑定手机</x-header>
    <group label-width="4.5em" label-margin-right="1em">
      <cell title="原手机号" :value="froms.phone" value-align="left"></cell>
      <p @click='choose'>验证方式 <span class="span"></span><span class="choose">{{choose}}</span></p>
      <x-input title="验证码" placeholder="请输入验证码" placeholder-align="left" v-model="froms.code"></x-input>
      <button class="btn">{{message}}</button>
    </group>
    <button class="button">
      下一步
    </button>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import regExp from '@/util/regExp'
  import {XInput, Group, XHeader, XButton, Cell,Actionsheet} from 'vux'
  export default{
    components: {
      XInput,
      Group,
      XHeader,
      XButton,
      Cell,
      Actionsheet
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.setData()
      })
    },
    data(){
      return {
        users: this.$store.state.userInfo,
        choose: '',
        message: '获取验证码',
        showChoose:false,
//        menusChoose:
        froms: {
          phone: '',
          select: '',
          code: ''
        },
      }
    },
    methods: {
      //获取信息
      setData(){
        this.froms.phone = this.users.phone
      },

    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  p {
    font-size: .32rem;
    color: #333;
    margin-left: .3rem;
    border-top: 1px solid #E5E5E5;
    padding: .2rem .3rem .2rem 0;
    .choose {
      float: right;
      font-size: .28rem;
      color: #999;
    }
    .span {
      width: .15rem;
      height: .15rem;
      border-right: 2px solid #C8C8CD;
      border-bottom: 2px solid #C8C8CD;
      transform: translateY(.15rem) rotate(311deg);
      float: right;
    }
  }

  .btn {
    width: 1.8rem;
    padding: .14rem .1rem;
    background: rgba(74, 144, 226, 1);
    border-radius: .06rem;
    border: 2px solid rgba(74, 144, 226, 1);
    font-size: .24rem;
    color: #FFF;
    line-height: .33rem;
    outline: none;
    position: relative;
    bottom: .6rem;
    left: 5.5rem;
  }

  .button {
    position: fixed;
    bottom: 1.2rem;
    margin: 0px 5%;
    width: 90%;
    display: block;
    background: rgba(74, 144, 226, 1);
    border-radius: .1rem;
    border: 1px solid rgba(71, 104, 177, 1);
    font-size: .36rem;
    line-height: .5rem;
    color: #FFF;
    padding: .19rem 0;
    text-align: center;
  }

</style>
