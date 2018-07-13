<template>
  <div style="background:rgba(255,255,255,1);height: 100%;">
    <x-header>重置密码
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
          <input type="text" v-model="signForm.username" placeholder="已验证邮箱/注册手机号" autocomplete="off"
                 class="main-input">
        </div>
        <div class="form-item" style="position: relative">
          <input type="text" v-model="signForm.pictureCode" placeholder="图片验证码" autocomplete="off"
                 class="main-input">
          <img :src="imgSrc" style="position:absolute;left:4rem;top:0px;height:.5rem;width:30%">
        </div>
        <div class="form-item" style="position: relative">
          <input type="text" v-model="signForm.vailCode" placeholder="验证码" autocomplete="off" class="main-input">
          <button class="vailCode-button" @click.prevent="sendCode">
            {{sendButtonText}}
          </button>
        </div>
        <div class="form-item">
          <input type="password" v-model="signForm.password" placeholder="请输入新密码" autocomplete="off"
                 class="main-input">
        </div>
        <div class="form-item" style="border:none">
          <button class="nextStep" @click.prevent="reset">确认</button>
        </div>
        <div style="clear:both"></div>
      </form>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, Alert} from 'vux'
  import RegExp from '@/util/RegExp'
  import axios from '@/util/iaxios'
  export default {
    components: {
      XHeader,
      XButton,
      Alert
    },
    data () {
      return {
        signForm: {
          username: '',
          vailCode: '',
          pictureCode: '',
          password: '',
        },
        sendButtonText: '获取验证码',
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`
      }
    },
    methods: {
      // 发送手机验证码
      sendCode(){
        if (this.signForm.username.trim() == '') {
          this.$vux.toast.text('已验证邮箱/注册手机号', 'middle')
          return
        }
        if (!RegExp.phoneRegexp.test(this.signForm.username) && !RegExp.emailRegexp.test(this.signForm.username)) {
          this.$vux.toast.text('不是手机号也不是邮箱', 'middle')
          return
        }
        if (this.signForm.pictureCode.trim() == '') {
          this.$vux.toast.text('输入图片验证码', 'middle')
          return
        }
        // 默认邮箱注册
        let isemail = '1'
        if (RegExp.phoneRegexp.test(this.signForm.username)) {
          // 如果是手机注册
          isemail = '0'
        }
        axios.get('user/code.do', {
          params: {
            aim: this.signForm.username,
            isemail: isemail,
            vailCode: this.signForm.pictureCode,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text(response.data.message, 'middle')
            // 倒计时
            let countDown = 60
            this.sendButtonText = '60s'
            var interval = setInterval(() => {
              countDown--
              this.sendButtonText = countDown + 's'
              if (countDown == 0) {
                this.sendButtonText = '获取验证码'
                clearInterval(interval)
              }
            }, 1000)
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })
      },
      //重置密码确认
      reset(){
        if (this.signForm.username.trim() == '') {
          this.$vux.toast.text('已验证邮箱/注册手机号', 'middle')
          return
        }
        if (!RegExp.phoneRegexp.test(this.signForm.username) && !RegExp.emailRegexp.test(this.signForm.username)) {
          this.$vux.toast.text('不是手机号也不是邮箱', 'middle')
          return
        }
        if (this.signForm.pictureCode.trim() == '') {
          this.$vux.toast.text('输入图片验证码', 'middle')
          return
        }
        if (this.signForm.vailCode.trim() == '') {
          this.$vux.toast.text('输入手机验证码', 'middle')
          return
        }
        if (!RegExp.registerPassword.test(this.signForm.password)) {
          this.$vux.toast.text('请输入至少8位包含大小写字母与数字的密码', 'middle')
          return
        }

        axios.get('user/findPassword.do', {
          params: {
            username: this.signForm.username,
            password: this.signForm.password,
            code: this.signForm.vailCode
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text(response.data.message, 'middle')
            this.$router.push('login')
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
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
