<template>
  <div>
    <x-header :right-options="{showMore: true}">重置密码</x-header>
    <div>
      <form class="sign-form">
        <div class="form-item">
          <!--禁止自动填充-->
          <input type="text" style="height: 0;opacity: 0;position: absolute;padding:0px;">
          <input type="text" v-model="signForm.username" placeholder="已验证邮箱/注册手机号" autocomplete="off">
        </div>
        <div class="form-item">
          <input type="password" style="height: 0;opacity: 0;position: absolute;z-index: -999;padding:0px;"
                 autocomplete="off">
          <input type="text" v-model="signForm.password" placeholder="密码" v-if="signForm.showPassword"
                 autocomplete="off">
          <input type="password" v-model="signForm.password" placeholder="密码" v-else autocomplete="off">
        </div>
        <div class="form-item" style="border:none">
          <x-button type="primary">登录</x-button>
        </div>
        <div class="form-item" style="border:none;">
          <router-link to="reset" style="font-size: .7rem;float:left;color:#1AAD19">忘记密码</router-link>
          <p style="float:right;font-size: .7rem;">还没有帐号?
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

  export default {
    components: {
      XHeader,
      XButton
    },
    data () {
      return {
        signForm: {
          username: '',
          password: '',
          showPassword: false
        }
      }
    },
    methods: {
      hello(){
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

      }
    }
  }
</script>
