<template>
  <div>
    <x-header :right-options="{showMore: true}">注册</x-header>
    <div>
      <form class="sign-form">
        <div class="form-item">
          <!--禁止自动填充-->
          <input type="text" style="height: 0;opacity: 0;position: absolute;padding:0px;">
          <input type="text" v-model="signForm.username" placeholder="注册邮箱/手机号" autocomplete="off">
        </div>
        <div class="form-item" style="position: relative">
          <!--禁止自动填充-->
          <input type="text" style="height: 0;opacity: 0;position: absolute;padding:0px;">
          <input type="text" v-model="signForm.vailCode" placeholder="验证码" autocomplete="off">
          <button class="vailCode-button" @click.prevent="sendCode">
            获取短信验证码
          </button>
        </div>
        <div class="form-item">
          <input type="password" style="height: 0;opacity: 0;position: absolute;z-index: -999;padding:0px;"
                 autocomplete="off">
          <input type="password" v-model="signForm.password" placeholder="密码" autocomplete="off">
        </div>
        <div class="form-item">
          <input type="password" style="height: 0;opacity: 0;position: absolute;z-index: -999;padding:0px;"
                 autocomplete="off">
          <input type="password" v-model="signForm.passwordConfirm" placeholder="确认密码" autocomplete="off">
        </div>
        <div class="form-item" style="border:none">
          <x-button type="primary" @click.native.prevent="register">同意协议并提交</x-button>
        </div>
      </form>
      <div></div>
    </div>

    <div v-transfer-dom>
      <alert v-model="showAlert" title="请输入图片验证码">

      </alert>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, Alert} from 'vux'

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
          password: '',
          passwordConfirm: '',
          showPassword: false
        },
        showAlert: false
      }
    },
    methods: {
      sendCode(){
        this.showAlert = true
        return false
      },
      register(){
        console.log('注册成功')
      }
    }
  }
</script>
