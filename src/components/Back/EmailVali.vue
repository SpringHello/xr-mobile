<template>
  <div id="Pvali">
    <x-header>修改绑定</x-header>

    <div class="top">
      <img src="../../assets/img/back/yjfk.png">
      <p>为了您的账号资金安全，请操作一下安全保护。</p>
    </div>

    <div class="middle">
      <Group>
        <cell title="邮箱账号" :value="oldEmail" value-align="left"></cell>
        <x-input title="图形验证码" placeholder="请输入图形验证码" placeholder-align="left" v-model="froms.code">
          <img :src="imgSrc" @click="imgSrc=`/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`" slot="right">
        </x-input>
        <x-input title="邮箱验证码" placeholder="请输入验证码" placeholder-align="left" v-model="froms.emailCode">
          <button slot="right" class="button" @click.prevent="getemailCode">{{message}}</button>
        </x-input>

      </Group>

    </div>


    <button @click="resetPhone" class="btns">下一步</button>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, XInput} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      XInput
    },
    data (){
      window.scrollTo(0, 0);
      return {
        oldEmail: this.$store.state.userInfo.loginname,
        froms: {
          code: '',
          emailCode: '',
        },
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`,
        message: '获取验证码',
      }
    },
    methods: {
      //获取手机验证码
      getemailCode(){
        if (this.froms.code.length == 4) {
          axios.get('user/code.do', {
            params: {
              vailCode: this.froms.code,
              type: 0,
              isemail: 1,
              aim: this.oldEmail
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
        } else {
          this.$vux.toast.text('请输入正确的验证码', 'middle')
        }

      },
      //下一步
      resetPhone(){
        if (this.froms.code.length == 4 && this.froms.emailCode.length == 6) {
          if (sessionStorage.getItem('type') == 'phone') {
            this.$router.push('resetphone')
          }
          else {
            this.$router.push('resetemail')
          }
        } else {
          this.$vux.toast.text('请输入正确的号码', 'middle')
        }
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .top {
    display: flex;
    padding: .24rem 0;
    align-items: center;
    background: #F7FBFF;
    img {
      width: .32rem;
      height: .32rem;
      margin: 0 .16rem;
    }
    p {
      font-size: .24rem;
      color: rgba(125, 161, 217, 1);
      line-height: .36rem;
    }
  }

  .middle {
    margin-bottom: 2rem;
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
  }

  .btns {
    position: fixed;
    bottom: .48rem;
    margin: 0 5%;
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
