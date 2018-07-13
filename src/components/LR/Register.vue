<template>
  <div style="background:rgba(255,255,255,1)" id="register">
    <x-header>注册
      <router-link slot="right" to="login">登录</router-link>
    </x-header>
    <div class="regs-top">
      <h3>新睿云</h3>
      <p>注册享60天免费试用</p>
      <span>再送158元新手礼包</span>
    </div>
    <div v-if="currentStep==1">
      <!--问卷调查-->
      <form class="sign-form">
        <div class="form-item">
          <input type="text" v-model="questionnaire.uname" placeholder="请输入您的姓名" autocomplete="off" class="main-input">
        </div>
        <div class="form-item">
          <input type="text" v-model="questionnaire.uphone" placeholder="请输入电话号码" autocomplete="off" class="main-input"
                 @blur="phoneIsReg">
        </div>
        <div class="form-item" style="position: relative">
          <input type="text" v-model="questionnaire.company" placeholder="请输入公司名称" autocomplete="off"
                 class="main-input">
        </div>
        <div class="form-item item-last" style="position: relative">
          <Group>
            <popup-picker title="请选择职位" :data="lists" v-model="questionnaire.professional" @on-show="" @on-change=""
                          :columns="3"
                          show-name></popup-picker>
          </Group>
        </div>
        <div class="form-item btn-last" style="border:none">
          <button class="nextStep" @click.prevent="nextStep">下一步</button>
        </div>
      </form>
    </div>
    <div v-else>
      <!--用户注册-->
      <form class="sign-form">
        <div class="form-item">
          <input type="text" v-model="signForm.username" placeholder="输入邮箱/手机号" autocomplete="off" class="main-input"
                 @blur="isRegs">
        </div>
        <div class="form-item">
          <input type="password" v-model="signForm.password" placeholder="请输入至少8位包含大小写字母与数字的密码" autocomplete="off"
                 class="main-input"
                 @blur="passwordReg">
        </div>
        <div class="form-item" style="position: relative">
          <input type="text" v-model="signForm.pictureCode" placeholder="输入图片验证码" autocomplete="off"
                 class="main-input">
          <img :src="imgSrc" style="position:absolute;left:4rem;top:0px;height:.5rem;width:30%">
        </div>
        <div class="form-item" style="position: relative">
          <input type="text" v-model="signForm.vailCode" placeholder="输入手机验证码" autocomplete="off" class="main-input">
          <button class="vailCode-button" @click.prevent="sendCode">
            {{sendButtonText}}
          </button>
        </div>
        <div class="form-item btn-last" style="border:none">
          <button class="nextStep" @click.prevent="register">注册</button>
        </div>
        <div class="checks">
          <check-icon :value.sync="demo">我已阅读并同意 <span class="checkColor">《新睿云用户使用协议》</span></check-icon>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, Alert, PopupPicker, Group, CheckIcon} from 'vux'
  import RegExp from '@/util/RegExp'
  import axios from '@/util/iaxios'
  export default {
    components: {
      XHeader,
      XButton,
      Alert,
      PopupPicker,
      Group,
      CheckIcon
    },
    data () {
      return {
        // 1、问卷调查  2、注册
        currentStep: 2,
        questionnaire: {
          uname: '',
          uphone: '',
          company: '',
          professional: []
        },
        lists: [
          {
            name: 'CEO/CTO/CIO',
            value: 'CEO/CTO/CIO',
            parent: 0
          },
          {
            name: '项目经理',
            value: '项目经理',
            parent: 0
          },
          {
            name: '产品经理',
            value: '产品经理',
            parent: 0
          },
          {
            name: '研发',
            value: '研发',
            parent: 0
          },
          {
            name: '运维人员',
            value: '运维人员',
            parent: 0
          },
          {
            name: '其他',
            value: '其他',
            parent: 0
          }
        ],
        demo: true,
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
      //问卷手机校验
      phoneIsReg(){
        if (this.questionnaire.uphone) {
          axios.get('user/isRegister.do', {
            params: {
              username: this.questionnaire.uphone
            }
          }).then(response => {
            if (response.status != 200 || response.data.status != 1) {
              this.$vux.toast.text(response.data.message, 'middle')
            }
          })
        }
      },
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
      //密码格式校验
      passwordReg(){
        if (!RegExp.registerPassword.test(this.signForm.password) && this.signForm.password) {
          this.$vux.toast.text('请输入至少8位包含大小写字母与数字的密码', 'middle')
        }
      },
      // 发送手机验证码
      sendCode(){
        if (this.signForm.pictureCode == '') {
          this.$vux.toast.text('输入图片验证码', 'middle')
          return
        }
        if (!RegExp.phoneRegexp.test(this.signForm.username) && !RegExp.emailRegexp.test(this.signForm.username)) {
          this.$vux.toast.text('不是手机号也不是邮箱', 'middle')
          return
        }
        if (RegExp.phoneRegexp.test(this.signForm.username)) {
          // 如果是手机注册
          isemail = '0'
        }
        if (RegExp.emailRegexp.test(this.signForm.username)) {
          // 如果是邮箱注册
          isemail = '1'
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
      //下一步
      nextStep(){
        if (this.questionnaire.uname == '') {
          this.$vux.toast.text('请输入您的姓名', 'middle')
          return
        }
        if (this.questionnaire.uphone == '') {
          this.$vux.toast.text('请输入电话号码', 'middle')
          return
        }
        if (this.questionnaire.company == '') {
          this.$vux.toast.text('请输入公司名称', 'middle')
          return
        }
        if (this.questionnaire.professional == '') {
          this.$vux.toast.text('请选择职位', 'middle')
          return
        }
        this.signForm.username = this.questionnaire.uphone
        this.currentStep = 2

      },
      //注册
      register(){
        if (this.signForm.username == '') {
          this.$vux.toast.text('请输入手机/邮箱', 'middle')
          return
        }
        if (this.signForm.password == '') {
          this.$vux.toast.text('请输入密码', 'middle')
          return
        }
        if (this.signForm.pictureCode == '') {
          this.$vux.toast.text('请输入图片验证码', 'middle')
          return
        }
        if (this.signForm.vailCode == '') {
          this.$vux.toast.text('请输入手机验证码', 'middle')
          return
        }
        let params = {
          questionId: '4',
          msg: '',
          username: this.signForm.username,
          password: this.signForm.password,
          code: this.signForm.vailCode
        }
        for (var key in this.questionnaire) {
          params.msg += this.questionnaire[key] + '###'
        }
        axios.get('user/register.do', {
          params
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text(response.data.message, 'middle')
            this.$router.push('mine')
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #register {
    height: 100%
  }

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

  .checks {
    font-size: .24rem;
    color: #000;
    line-height: .33rem;
    margin-top: .3rem;
    .checkColor {
      color: #2A99F2;
    }
  }
</style>
