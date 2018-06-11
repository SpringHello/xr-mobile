<template>
  <div class="workOrder">
    <x-header>工单</x-header>
    <div style="padding:.6rem;">
      <button-tab v-model="currentTab">
        <button-tab-item selected>提交工单</button-tab-item>
        <button-tab-item>进行中工单</button-tab-item>
        <button-tab-item>已完成工单</button-tab-item>
      </button-tab>
      <div v-if="currentTab==0">
        <group label-width="5em">
          <popup-picker title="问题类型" :data="list" v-model="data" placeholder="请选择"></popup-picker>
          <!--<popup-picker :popup-title="$t('please select')" :title="title1" :data="list1" v-model="value1_1"
                        @on-show="onShow" @on-hide="onHide" @on-change="onChange" :placeholder="$t('please select')">
            <template slot="title" slot-scope="props">
              <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
                <span class="demo-icon demo-icon-big" style="font-size:20px;vertical-align:middle;"></span>
                <span style="vertical-align:middle;">手机</span>
              </span>
            </template>
          </popup-picker>-->
          <!--<datetime title="datetime" v-model="date"></datetime>-->
        </group>
      </div>
      <div v-else-if="currentTab==1">
        <div class="operating" v-for="item in operatingList">
          <p class="issue">{{item.title}}<span>{{item.puddate}}</span></p>
          <div class="content">
            <p class="detail">问题类型：{{item.description}}</p>
            <p class="detail">问题产品：{{item.subdescription}}</p>
            <p class="detail">问题描述：{{item.issue}}</p>
            <p class="detail" style="float: right;color: #2B99F2">关闭问题</p>
            <div style="clear: right"></div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="item in closingList">
          {{item.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import {ButtonTab, ButtonTabItem, XHeader, PopupPicker, Group} from 'vux'
  export default{
    components: {
      XHeader,
      ButtonTab,
      ButtonTabItem,
      Group,
      PopupPicker
    },
    beforeRouteEnter(to, from, next){
      /*
       执行中：operating
       已关闭：closing
       */
      let operating = axios.get('order/getOrders.do', {
        params: {
          type: 'operating',
          currentPage: '1',
          pageSize: '15'
        }
      })
      let closing = axios.get('order/getOrders.do', {
        params: {
          type: 'closing',
          currentPage: '1',
          pageSize: '15'
        }
      })
      Promise.all([operating, closing]).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    data (){
      return {
        currentTab: 0,
        //新建工单所需数据
        list: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
        data: [],

        operatingList: [],
        closingList: [],
      }
    },
    methods: {
      setData(response){
        response[0].data.result.forEach(item => {
          item.puddate = Number.parseInt(item.puddate)
          //item.remainingTime = nowTime - item.puddate
          //item.timeago = timeago().format(item.puddate, 'zh_CN');
          item.puddate = new Date(item.puddate).format('yyyy年MM月dd日 hh:mm:ss')
          /*item.remainingDay = Math.floor(item.remainingTime/mSecInDay)
           item.remainingHour = Math.floor((item.remainingTime%mSecInDay)/mSecInHour)
           item.remainingMinute = Math.floor((item.remainingTime%mSecInHour)/mSecInMinute)*/
        })
        this.operatingList = response[0].data.result
        this.closingList = response[1].data.result
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .workOrder {
    .operating {
      padding: 0rem .5rem;
      background-color: #fff;
      margin-top: 1rem;
      .issue {
        border-bottom: 1px solid rgba(221, 221, 221, 1);;
        font-size: .6rem;
        padding: .5rem 0rem;
        > span {
          float: right;
        }
      }
      .content {
        padding: .5rem 0rem;
        > .detail {
          font-size: .6rem;
        }
      }
    }

  }
</style>
