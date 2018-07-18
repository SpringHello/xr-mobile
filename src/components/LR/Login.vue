<template>
  <div style="background:rgba(255,255,255,1);height: 100%;">
    <x-header>登录
      <router-link slot="right" to="register">注册</router-link>
    </x-header>
    <div class="regs-top">
      <h3>新睿云</h3>
      <p>注册享60天免费试用</p>
      <span>再送158元新手礼包</span>
    </div>
    <div>
      <form class="sign-form">
        <div class="form-item">
          <input type="text" v-model="signForm.username" placeholder="输入手机号/邮箱" autocomplete="off"
                 class="main-input">
        </div>
        <div class="form-item">
          <input type="text" v-model="signForm.password" placeholder="密码" v-if="signForm.showPassword"
                 class="main-input"
                 autocomplete="off">
          <input type="password" v-model="signForm.password" placeholder="密码" v-else autocomplete="off"
                 class="main-input">
        </div>
        <div class="form-item" style="position: relative">
          <input type="text" v-model="signForm.vailCode" placeholder="图片验证码" autocomplete="off"
                 class="main-input">
          <img :src="imgSrc" style="position:absolute;right: 0;top:0px;height:.5rem;width:30%"
               @click="imgSrc=`/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`">
        </div>
        <div class="form-item" style="border:none">
          <button class="nextStep" @click.prevent="login">登录</button>
        </div>
        <div class="form-item" style="border:none;text-align: right;">
          <router-link to="/ruicloud/reset" style="font-size: .28rem;color:#4990E2">忘记密码</router-link>
          <div style="clear:both"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton} from 'vux'
  import RegExp from '@/util/RegExp'
  import axios from '@/util/iaxios'
  export default {
    beforeRouteEnter(to, from, next){
      next()
    },
    components: {
      XHeader,
      XButton
    },
    data () {
      return {
        signForm: {
          username: '',
          password: '',
          vailCode: '',
          showPassword: false
        },
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`//require('../../assets/logo.png')
      }
    },
    methods: {
      login(){
        if (this.signForm.username.trim() == '') {
          this.$vux.toast.text('请输入手机/邮箱', 'middle')
          return
        }
        // 展现图片验证码前先校验手机/邮箱
        if (!RegExp.phoneRegexp.test(this.signForm.username) && !RegExp.emailRegexp.test(this.signForm.username)) {
          // 既不是手机也不是邮箱
          this.$vux.toast.text('手机/邮箱格式错误', 'middle')
          return
        }
        if (this.signForm.password.trim() == '') {
          this.$vux.toast.text('请输入密码', 'middle')
          return
        }
        /* if (!RegExp.loginPassword.test(this.signForm.password)) {
         this.$vux.toast.text('密码格式错误', 'middle')
         return
         }*/
        if (this.signForm.vailCode.trim() == '') {
          this.$vux.toast.text('请输入验证码', 'middle')
          return
        }
        axios.get('user/login.do', {
          params: {
            username: this.signForm.username,
            password: this.signForm.password,
            vailCode: this.signForm.vailCode
          }
        }).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            axios.get('user/GetUserInfo.do').then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result})
                }
              }
            )
            this.$router.push({path: 'console'})
          } else {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.$vux.toast.text(response.data.message)
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .regs-top {
    text-align: center;
    color: rgba(73, 144, 226, 1);
    line-height: 0;
    padding-bottom: 1rem;
    h3 {
      font-size: .68rem;
      padding-top: .8rem;
      line-height: .68rem;
    }
    p {
      font-size: .46rem;
      padding-top: .4rem;
      line-height: .46rem;
    }
    span {
      font-size: .26rem;
      padding-top: .16rem;
      line-height: .37rem;
    }
  }
</style>
