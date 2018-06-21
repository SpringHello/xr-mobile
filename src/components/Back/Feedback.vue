<template>
  <div id="feedback">
    <x-header>意见反馈</x-header>
    <div class="annotation">
      <img src="../../assets/img/back/yjfk.png">
      <p class="title">感谢您关注新睿云，请告诉我们您对新睿云的意见和建议，我们会参考您的反馈不断优化我们的产品和服务，您留下的每一个反馈都是对新入云的宝贵财富。</p>
    </div>
    <div class="content">
         <group>
           <popup-picker title="反馈类型" :data="list1" v-model="value1" placeholder="请选择" @on-change="onChange"></popup-picker>
         </group>
      <group>
        <x-textarea :max="500" placeholder="请输入投诉的内容"></x-textarea>
      </group>
    </div>
     <div class="btn">
       <x-button type="primary">确认提交</x-button>
     </div>
  </div>
</template>

<script>
  import {XHeader,Group,Cell,PopupPicker,XTextarea,XButton } from 'vux'
  export default{
    components: {
      XHeader,
      Group,
      Cell,
      PopupPicker,
      XTextarea,
      XButton
    },
    data (){
      return {
        value1:[],
        list1:[['对产品的意见和建议','对服务的意见和建议','投诉','其他' ]]
      }
    },
    methods:{
        //反馈类型
     onChange(val){
       console.log( val)
     }
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
      /*align-items: center;*/
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
    .content{
      background: #FFF;
      margin-bottom: .2rem;
      div{
         font-size: .32rem;
        &:last-of-type{
          .weui-cells{

          }
        }
      }

    }
    .btn{
      padding: .47rem .3rem;
    }
  }
</style>
