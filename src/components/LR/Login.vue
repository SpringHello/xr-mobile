<template>
  <div>
    <x-header :right-options="{showMore: true}">登录</x-header>
    <div>
      <form class="sign-form">
        <div class="form-item">
          <!--禁止自动填充-->
          <input type="text" v-model="signForm.username" placeholder="已验证邮箱/注册手机号" autocomplete="off"
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
          <!--禁止自动填充-->
          <input type="text" v-model="signForm.vailCode" placeholder="图片验证码" autocomplete="off"
                 class="main-input">
          <img :src="imgSrc" style="position:absolute;left:6rem;top:0px;height:.8rem;width:30%">
        </div>
        <div class="form-item" style="border:none">
          <x-button type="primary" @click.native.prevent="login">登录</x-button>
        </div>
        <div class="form-item" style="border:none;">
          <router-link to="reset" style="font-size: .3rem;float:left;color:#1AAD19">忘记密码</router-link>
          <p style="float:right;font-size: .3rem;">还没有帐号?
            <router-link to="register" style="color:#1AAD19">立即注册</router-link>
          </p>
          <div style="clear:both"></div>
        </div>
      </form>
      <div></div>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton} from 'vux'
  import regexp from '@/util/RegExp'
  import axios from '@/util/iaxios'
  export default {
    beforeRouteEnter(to, from, next){
      console.log(to)
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
        if (this.signForm.username == '') {
          this.$vux.toast.text('请输入手机/邮箱')
          return
        }
        // 展现图片验证码前先校验手机/邮箱
        if (!regexp.phoneRegexp.test(this.signForm.username) && !regexp.emailRegexp.test(this.signForm.username)) {
          // 既不是手机也不是邮箱
          this.$vux.toast.text('手机/邮箱格式错误')
          return
        }
        if (this.signForm.password == '') {
          this.$vux.toast.text('请输入密码')
          return
        }
        if (!regexp.loginPassword.test(this.signForm.password)) {
          this.$vux.toast.text('密码格式错误')
          return
        }
        if (this.signForm.vailCode == '') {
          this.$vux.toast.text('请输入验证码')
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
            this.$router.push({path: this.$route.query.from || 'Home'})
          } else {
            this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
            this.$vux.toast.text(response.data.message)
          }
        })
      }
    }
  }
</script>
