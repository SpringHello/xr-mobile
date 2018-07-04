<template>
  <div id="expense">
    <div class="header">
      <popup-picker title="" :data="lists" v-model='list'></popup-picker>
      <p class="cenetr"></p>
      <datetime title="" v-model="time"  format="YYYY年M月"></datetime>
    </div>

  </div>
</template>

<script>
  import {Group, Datetime, PopupPicker} from 'vux'
  export default{
    components: {
      Group,
      Datetime,
      PopupPicker
    },
    data(){
      return {
        time: '2018年7月',
        lists: [['全部', '包年包月计费', '实时计费']],
        list: ['全部']
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .header {
    background: #4768B1;
    display: flex;
    align-items: center;
    justify-content: center;
    .cenetr {
      margin: 0 .2rem;
      width: 1px;
      height: .4rem;
      background: rgba(125, 161, 217, 1);
    }
  }
</style>
