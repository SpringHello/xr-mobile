<template>
  <div>
    <x-header>绑定邮箱</x-header>
    <div class="desc">
      <img src="../../assets/img/back/yjfk.png">
      <p>为了您的账号资金安全，请您操作以下安全保护！</p>
    </div>

    <div class="cell">
      <group>
        <x-input title="邮箱账号" placeholder="请输入邮箱" placeholder-align="left" v-model="froms.email"></x-input>
        <x-input title="邮箱验证码" placeholder="请输入验证码" placeholder-align="left" v-model="froms.code"></x-input>
        <button class="button" @click.prevent="getEmail">{{message}}</button>
      </group>
    </div>


    <button class="btn" >绑定</button>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import regexp from '@/util/RegExp'
  import {XHeader, Group, XInput} from 'vux'

  export default{
    components: {
      XHeader,
      Group,
      XInput
    },
    data(){
      return {
        froms: {
          email: '',
          code: ''
        },
        message: '获取验证码',
      }
    },
    methods: {
      //获取验证码
      getEmail(){
        if (!this._validate()) {
          return
        }
        axios.get('user/updateUserInfo.do', {
          params: {
            code: this.froms.email,
            email: this.froms.code
          }
        }).then(response => {
          this.message = '验证码发送中'
          if (response.status == 200 && response.data.status == 1) {
            //倒计时
            let countdown = 60
            this.message = '60s'
            var inter = setInterval(() => {
              countdown--
              this.message = countdown + 's'
              if (countdown == 0) {
                clearInterval(inter)
                this.message = '获取验证码'
              }
            }, 1000)
            this.$vux.toast.text(response.data.message, 'middle')
          } else {
            this.message = '获取验证码'
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })

      },
      //校验
      _validate(){
        if(this.froms.email==''){
            this.$vux.toast.text('请输入邮箱', 'middle')
          return false
        }
        if (!regexp.emailRegexp.test(this.froms.email)) {
          this.$vux.toast.text('邮箱格式错误', 'middle')
          return false
        }
        return true
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .desc {
    display: flex;
    background: rgba(247, 251, 255, 1);
    align-items: center;
    img {
      width: .32rem;
      height: .32rem;
      margin: 0 .16rem;
    }
    p {
      font-size: .24rem;
      color: rgba(125, 161, 217, 1);
      padding: .24rem 0;
      line-height: .36rem;
    }
  }

  .button {
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

  .btn {
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
