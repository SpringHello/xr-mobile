<template>
  <div id="feedback">
    <x-header>意见反馈</x-header>
    <div class="annotation">
      <img src="../../assets/img/back/yjfk.png">
      <p class="title">感谢您关注新睿云，请告诉我们您对新睿云的意见和建议，我们会参考您的反馈不断优化我们的产品和服务，您留下的每一个反馈都是对新入云的宝贵财富。</p>
    </div>
    <div class="content">
      <group>
        <popup-picker title="反馈类型" :data="list1" v-model="value1" placeholder="请选择"
                      @on-change="onChange"></popup-picker>
      </group>
      <group class="text">
        <x-textarea :max="150" placeholder="请输入投诉的内容" :rows="5"></x-textarea>
      </group>
    </div>

    <div class="contact">
      <Group>
        <x-input title="联系方式" v-model="contact">
          <a slot="right" @click="Mrphone">默认手机号</a>
        </x-input>
        <x-input title="Q Q号码" v-model="qq">
          <a slot="right" @click="Mrqq">默认QQ号</a>
        </x-input>
      </Group>
    </div>

    <div class="btn">
      <x-button type="primary" @click.native="confirm">确认提交</x-button>
    </div>
  </div>
</template>

<script>
  import $store from '@/vuex'
  import {XHeader, Group, Cell, PopupPicker, XTextarea, XButton, XInput} from 'vux'
  export default{
    components: {
      XHeader,
      Group,
      Cell,
      PopupPicker,
      XTextarea,
      XButton,
      XInput
    },
    data (){
      return {
        value1: [],
        list1: [['对产品的意见和建议', '对服务的意见和建议', '投诉', '其他']],
        contact: '',
        qq: ''
      }
    },
    methods: {
      //反馈类型
      onChange(val){
        console.log(val[0])
      },
      //默认手机号
      Mrphone(){
        this.contact = this.$store.state.userInfo.phone
      },
      //默认qq号码
      Mrqq(){
        this.qq = this.$store.state.userInfo.loginname
      },
      //确认提交
      confirm(){
        this.$router.push('home')
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #feedback {
    background: rgba(243, 243, 243, 1);
    .annotation {
      background: rgba(247, 251, 255, 1);
      margin-bottom: .2rem;
      display: flex;
      justify-content: space-between;
      padding: .25rem .32rem .23rem .16rem;
      .title {
        font-size: .24rem;
        color: #7DA1D9;
        width: 93%;
      }
      img {
        width: .32rem;
        height: .32rem;
        display: block;
      }
    }
    .content {
      background: #FFF;
      margin-bottom: .2rem;
      div {
        font-size: .32rem;
      }

    }

    .contact {
      a {
        font-size: .32rem;
        color: rgba(74, 144, 226, 1);
        line-height: .45rem;
      }
    }
    .btn {
      padding: .47rem .3rem;
      position: relative;
      top: 1rem;
    }
  }
</style>
