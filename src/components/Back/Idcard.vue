<template>
  <div>
    <x-header>身份证号验证</x-header>
    <group>
      <x-input title="真实姓名" placeholder="请输入姓名" placeholder-align="left" v-model="froms.name"></x-input>
      <x-input title="身份证号" placeholder="请输入身份证号" placeholder-align="left" v-model="froms.idCard"></x-input>
      <x-input title="图形验证码" placeholder="请输入图形验证码" placeholder-align="left" v-model="froms.code">
        <img :src="imgSrc" @click="imgSrc=`/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`"
             slot="right">
      </x-input>
    </group>
    <group>
      <x-input title="+ 86" placeholder="请填写手机号码" placeholder-align="left" v-model="froms.phone"></x-input>
      <x-input title="验证码" placeholder="请输入验证码" placeholder-align="left" v-model="froms.phoneCode">
        <button slot="right"  class="button" @click.prevent="getPhoneCode">{{message}}</button>
      </x-input>
    </group>
    <div class="btn">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import RegExp from '@/util/RegExp'
  import {XInput, Group, XHeader, XButton, Box} from 'vux'
  export default{
    components: {
      XInput,
      Group,
      XHeader,
      XButton,
      Box
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    data (){
      window.scrollTo(0, 0);
      return {
        froms: {
          name: '',
          phone: '',
          idCard: '',
          phoneCode: '',
          code: ''
        },
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`,
        message: '获取验证码',
      }
    },
    methods: {
      // 获取手机验证码
      getPhoneCode(){
        if (!this._validate()) {
          return
        }
        this.message = '验证码发送中'
        axios.get("user/code.do", {
          params: {
            aim: this.froms.phone,
            isemail: 0,
            vailCode: this.froms.code
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            //发送验证码倒计时
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
      // 提交信息
      submit(){
        if (!this._validate()) {
          return
        }
        axios.post("user/personalAttest.do", {
          cardID: this.froms.idCard,
          name: this.froms.name,
          phone: this.froms.phone,
          phoneCode: this.froms.phoneCode,
          type: "0"
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            //获取用户信息
            axios.get("user/GetUserInfo.do").then(response => {
              this.$store.commit("setAuthInfo", {
                authInfo: response.data.authInfo,
                userInfo: response.data.result
              })
              sessionStorage.setItem('RZsuccess', response.data.status)
              this.$router.push('RZsuccess')
            })

          } else {
            sessionStorage.setItem('RZfail', response.data.message)
            this.$router.push({path: 'RZfail'})
          }
        })
      },
      _validate(){
        if (!RegExp.phoneRegexp.test(this.froms.phone)) {
          this.$vux.toast.text('请输入正确的手机号码', 'middle')
          return false
        }
        if (this.froms.code.length != 4) {
          this.$vux.toast.text('请输入正确的验证码', 'middle')
          return false
        }
        if (!RegExp.idcardRegExp.test(this.froms.idCard)) {
          this.$vux.toast.text('请输入正确的身份证号', 'middle')
          return false
        }
        return true
      }
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
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
  }

  .btn {
    padding: 0 .3rem;
    button {
      padding: .19rem 0;
      background: rgba(74, 144, 226, 1);
      border-radius: .1rem;
      border: 1px solid rgba(71, 104, 177, 1);
      outline: none;
      color: #FFF;
      width: 100%;
      font-size: .36rem;
      line-height: .5rem;
    }
  }
</style>
