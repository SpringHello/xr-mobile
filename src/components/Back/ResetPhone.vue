<template>
  <div id="Pvali">
    <x-header>绑定手机号</x-header>

    <div class="middle">
      <Group>

        <x-input title="输入手机号" placeholder="请输入手机号" placeholder-align="left" v-model="froms.phone"></x-input>
        <x-input title="图形验证码" placeholder="请输入图形验证码" placeholder-align="left" v-model="froms.code">
          <img :src="imgSrc" @click="imgSrc=`/ruicloud/user/getKaptchaImage.do?t=${new Date().getTime()}`" slot="right">
        </x-input>
        <x-input title="手机验证码" placeholder="请输入验证码" placeholder-align="left" v-model="froms.phonecode">
          <button slot="right" class="button" @click.prevent="getCode">{{message}}</button>
        </x-input>
      </Group>

    </div>
    <button class="btns" @click="resetPhone">绑定</button>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import RegExp from '@/util/RegExp'
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
        froms: {
          phone: '',
          code: '',
          phonecode: ''
        },
        imgSrc: `user/getKaptchaImage.do?t=${new Date().getTime()}`,
        message: '获取验证码',
      }
    },
    methods: {
      // 获取验证码
      getCode(){
        if (this.froms.code.length == 4 && RegExp.phoneRegexp.test(this.froms.phone)) {
          axios.get('user/code.do', {
            params: {
              vailCode: this.froms.code,
              type: 1,
              isemail: 0,
              aim: this.froms.phone
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
          this.$vux.toast.text('请输入正确的号码', 'middle')
        }

      },
      //绑定新手机号
      resetPhone(){
        if (this.froms.code.length == 4 && RegExp.phoneRegexp.test(this.froms.phone) && this.froms.phonecode.length == 6) {
          axios.get('user/updatePhone.do', {
            params: {
              code: this.froms.phonecode,
              phone: this.froms.phone
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push('setting')
              this.$vux.toast.text(response.data.message, 'middle')
            } else {
              this.$vux.toast.text(response.data.message, 'middle')
            }
          })
        } else {
          this.$vux.toast.text('请输入正确的号码', 'middle')
        }
      },
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
    margin-bottom: 1rem;
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
