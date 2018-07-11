<template>
  <div style="background:rgba(255,255,255,1)" id="register">
    <x-header :right-options="{showMore: true}">注册</x-header>
    <div>
      <div class="regs-top">
        <h3>新睿云</h3>
        <p>注册享60天免费试用</p>
        <span>再送158元新手礼包</span>
      </div>
      <form class="sign-form">
        <div class="form-item">
          <!--禁止自动填充-->
          <input type="text" style="height: 0;opacity: 0;position: absolute;padding:0px;">
          <input type="text" v-model="signForm.username" placeholder="输入邮箱/手机号" autocomplete="off" class="main-input"
                 @blur="isRegs">
        </div>
        <div class="form-item">
          <input type="password" style="height: 0;opacity: 0;position: absolute;z-index: -999;padding:0px;"
                 autocomplete="off">
          <input type="password" v-model="signForm.password" placeholder="输入密码" autocomplete="off" class="main-input">
        </div>
        <div class="form-item" style="position: relative">
          <!--禁止自动填充-->
          <input type="text" v-model="signForm.pictureCode" placeholder="输入图片验证码" autocomplete="off"
                 class="main-input">
          <img :src="imgSrc" style="position:absolute;left:4rem;top:0px;height:.5rem;width:30%">
        </div>
        <div class="form-item" style="position: relative">
          <!--禁止自动填充-->
          <input type="text" style="height: 0;opacity: 0;position: absolute;padding:0px;">
          <input type="text" v-model="signForm.vailCode" placeholder="输入手机验证码" autocomplete="off" class="main-input">
          <button class="vailCode-button" @click.prevent="sendCode">
            {{sendButtonText}}
          </button>
        </div>
        <div class="form-item" style="border:none">
          <x-button type="primary" @click.native.prevent="next">下一步</x-button>
        </div>
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
          // 图片验证码
          pictureCode: '',
          vailCode: '',
          password: '',
        },
        sendButtonText: '发送验证码',
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`
      }
    },
    created(){

    },
    methods: {
      //校验手机号码是否已注册
      isRegs(){
        if (this.signForm.username) {
          axios.get('user/isRegister.do', {
            params: {
              username: this.signForm.username
            }
          }).then(response => {
            if (response.status != 200 || response.data.status != 1) {
              this.$vux.toast.text(response.data.message, 'middle')
            }
          })
        }
      },
      // 展示图片验证码
      showPictureCode(){
        if (this.sendButtonText != '获取验证码') {
          return
        }
        if (this.signForm.username.trim() == '') {
          this.$vux.toast.text('请输入手机/邮箱')
          return
        }
        // 展现图片验证码前先校验手机/邮箱
        if (!RegExp.phoneRegexp.test(this.signForm.username) && !RegExp.emailRegexp.test(this.signForm.username)) {
          // 既不是手机也不是邮箱
          this.$vux.toast.text('手机/邮箱格式错误')
          return
        }
        axios.get('user/isRegister.do', {
          params: {
            username: this.signForm.username
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showAlert = true
          } else {
            this.$vux.toast.text(response.data.message)
          }
        })
      },
      // 发送手机验证码
      sendCode(){
        // 没有输入验证码默认退出
        if (this.signForm.pictureCode == '') {
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
            type: '0',
            aim: this.signForm.username,
            isemail: isemail,
            vailCode: this.signForm.pictureCode,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text(response.data.message, 'middle')
            // 倒计时
            let countDown = 60
            this.sendButtonText = countDown + 's'
            let interval = setInterval(() => {
              countDown--
              if (countDown == 0) {
                this.sendButtonText = '获取验证码'
                clearInterval(interval)
              }
              this.sendButtonText = countDown + 's'
            }, 1000)
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })
      },
      register(){
        if (this.signForm.username == '') {
          this.$vux.toast.text('请输入手机/邮箱')
          return
        }
        if (this.signForm.vailCode == '') {
          this.$vux.toast.text('请输入验证码')
          return
        }
        if (this.signForm.password == '') {
          this.$vux.toast.text('请输入密码')
          return
        }
        if (!RegExp.registerPassword.test(this.signForm.password)) {
          this.$vux.toast.text('密码格式错误')
          return
        }
        axios.get('user/register.do', {
          params: {
            username: this.signForm.username,
            password: this.signForm.password,
            code: this.signForm.vailCode
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text(response.data.message)
          } else {
            this.$vux.toast.text(response.data.message)
          }
        })
      },
      //下一步
      next(){
        this.$router.push('home')
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .regs-top {
    text-align: center;
    color: rgba(73, 144, 226, 1);
    line-height: 0;
    padding-bottom: 1.17rem;
    h3 {
      font-size: .68rem;
      padding-top: 1.2rem;
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
