<template>
  <div id="setup">
    <x-header>安全设置</x-header>
    <Group>
      <cell title="修改密码" value="修改" inline-desc="建议您定期更换密码使账号更安全" is-link link="ChangePassworld">
        <img src="../../assets/img/back/unbound.png" slot="icon">
      </cell>

      <cell v-if="users.phone" title="手机绑定" value="修改" :inline-desc="setup.boundPhone" is-link
            @click.native="openChoose(typeP)">
        <img src="../../assets/img/back/bound.png" slot="icon">
      </cell>
      
      <cell v-else @click.native="openChoose(typeP)" title="手机绑定" value="绑定" :inline-desc="setup.unboundPhone"
            is-link>
        <img src="../../assets/img/back/unbound.png" slot="icon">
      </cell>

      <cell v-if="users.loginname" @click.native="openChoose(typeE)" title="邮箱绑定" value="修改"
            :inline-desc="setup.boundEmail" is-link>
        <img src="../../assets/img/back/bound.png" slot="icon">
      </cell>

      <cell v-else @click.native="openChoose(typeE)" title="邮箱绑定" value="绑定" :inline-desc="setup.unboundEmail" is-link>
        <img src="../../assets/img/back/unbound.png" slot="icon">
      </cell>

    </Group>
    <actionsheet v-model="showCall" :menus="menusAll" show-cancel :close-on-clicking-mask="false"
                 @on-click-menu="clickItem"></actionsheet>
    <actionsheet v-model="showCphone" :menus="menusPhone" show-cancel :close-on-clicking-mask="false"
                 @on-click-menu="clickItem"></actionsheet>
    <actionsheet v-model="showCemail" :menus="menusEmail" show-cancel :close-on-clicking-mask="false"
                 @on-click-menu="clickItem"></actionsheet>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader, Actionsheet} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader,
      Actionsheet
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.setData()
      })
    },
    data(){
      return {
        users: $store.state.userInfo,
        setup: {
          unboundPhone: '',
          boundPhone: '',
          unboundEmail: '',
          boundEmail: '',

        },
        type: '',
        typeP: 'phone',
        typeE: 'email',
        showCall: false,
        menusAll: {
          phone: '手机号验证',
          email: '邮箱验证',
        },
        showCphone: false,
        menusPhone: {
          phone: '手机号验证',
        },
        showCemail: false,
        menusEmail: {
          email: '邮箱验证',
        },
      }
    },
    methods: {
      //获取信息
      setData(){
        if (this.users.phone) {
          this.setup.boundPhone = `您已经绑定${this.users.phone}`
        } else {
          this.setup.unboundPhone = '您尚未绑定手机'
        }
        if (this.users.loginname) {
          this.setup.boundEmail = `您已经绑定${this.users.loginname}`
        } else {
          this.setup.unboundEmail = '您尚未绑定邮箱'
        }
      },
      //选择操作(修改)
      openChoose(type){
        this.type = type
        if (this.users.phone && this.users.loginname) {
          this.showCall = true
        } else if (this.users.phone && !this.users.loginname) {
          this.showCphone = true
        } else if (!this.users.phone && this.users.loginname) {
          this.showCemail = true
        }
      },
//      //选择操作(绑定)
//      boundChoose(type){
//        this.type = type
//         if (this.users.phone && !this.users.loginname) {
//          this.showCphone = true
//        } else if (!this.users.phone && this.users.loginname) {
//           this.showCemail = true
//        }
//      },
      //选择验证方式
      clickItem(key){
        sessionStorage.setItem('type', this.type)
        if (key == 'phone') {
          this.$router.push('phonevali')
        } else if (key == 'email') {
          this.$router.push('emailvali')
        }
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  img {
    width: .32rem;
    display: block;
    margin-right: .2rem;
    position: relative;
    bottom: .32rem;
  }
</style>
