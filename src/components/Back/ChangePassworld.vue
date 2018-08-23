<template>
  <div id="setKey">
    <x-header>修改密码</x-header>
    <group label-width="4.5em" label-margin-right="1em">
      <x-input title="当前密码" placeholder="请输入当前密码" placeholder-align="left" v-model="froms.nowKey"></x-input>
      <x-input title="新密码" placeholder="请输入新密码" placeholder-align="left" v-model="froms.newKey"></x-input>
      <x-input title="确认密码" placeholder="请确认新密码" placeholder-align="left" v-model="froms.keyOk"></x-input>
    </group>
    <button class="button" @click="fixup">
      提交修改
    </button>
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
    data(){
      window.scrollTo(0, 0);
      return {
        froms: {
          nowKey: "",
          newKey: "",
          keyOk: ''
        },
      }
    },
    methods: {
      //提交修改
      fixup(){
        if (this.froms.nowKey != '' && this.froms.newKey != '' && this.froms.keyOk != '') {
          axios.get("user/updatePassword.do", {
            params: {
              password: this.froms.newKey,
              oldpassword: this.froms.nowKey,
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$vux.toast.text(response.data.message, 'middle')
              this.$router.push('setting')
            } else {
              this.$vux.toast.text(response.data.message, 'middle')
            }
          })
        }
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .button {
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
