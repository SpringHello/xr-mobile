<template>
  <div class="workOrder">
    <x-header>工单
      <router-link slot="right" to="work">创建工单</router-link>
    </x-header>
    <tab active-color="#4A90E2" default-color="#000">
      <tab-item :selected="index==0" v-for="(item,index) in tabItems" :key="index"
                @on-item-click="workClick(item.type)">
        {{item.title}}
      </tab-item>
    </tab>
    <div class="work-item">
      <ul>
        <li v-for="(item,index) in worksItem" :key="index" @click="checkOrder(item.id,item.subdescription)">
          <p>{{item.title}}</p>
          <div>
            <span>{{type=='operating'?'处理中':'已关闭'}}</span>
            <span>提交时间：{{item.time}}</span>
          </div>
        </li>
      </ul>
    </div>
    <actionsheet v-model="showOpreation" :menus="menus" @on-click-menu="opreation" show-cancel></actionsheet>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import {XHeader, PopupPicker, Group, Tab, TabItem, Actionsheet} from 'vux'
  export default{
    components: {
      XHeader,
      Group,
      PopupPicker,
      Tab,
      TabItem,
      Actionsheet
    },
    beforeRouteEnter(to, from, next){
      axios.get('order/getOrders.do', {
        params: {
          currentPage: 1,
          pageSize: 10,
          type: 'operating'
        }
      }).then(response => {
        next(vm => {
          vm.setData(response.data.result)
        })
      })
    },
    data (){
      window.scrollTo(0, 0);
      return {
        type: '',
        tabItems: [
          {title: '进行中', type: 'operating',},
          {title: '已关闭', type: 'closing',}
        ],
        worksItem: [],
        time: '',
        id: '',
        subdescription: '',
        showOpreation: false,
        menus: {
          del: '<span style="color: red;">删除</span>',
          check: '<span style="color: #4A90E2">查看详情</span>'
        }
      }
    },
    methods: {
      //导航点击事件
      workClick(type){
        switch (type) {
          case 'operating':
            this.type = 'operating'
            break;
          case 'closing':
            this.type = 'closing'
            break;
        }
        axios.get('order/getOrders.do', {
          params: {
            type: this.type,
            currentPage: 1,
            pageSize: 10
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.worksItem = response.data.result
            response.data.result.forEach(item => {
              item.puddate = parseInt(item.puddate)
              item.time = new Date(item.puddate).format('yyyy/MM/dd  hh:mm:ss')
            })
          }
        })
      },
      //弹窗显示
      checkOrder(id, subdescription){
        this.subdescription = subdescription
        this.id = id
        this.showOpreation = true
      },
      //查看或者删除
      opreation(key){
        if (key == "del") {
          axios.get('order/delOrder.do', {
            params: {
              orderid: this.id
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$vux.toast.text(response.data.msg, 'middle')
              this.workClick(this.type)
            } else {
              this.$vux.toast.text(response.data.msg, 'middle')
            }
          })
        }
        if (key == 'check') {
          sessionStorage.setItem('workId', this.id)
          sessionStorage.setItem('subdescription', this.subdescription)
          this.$router.push('workdetail')
        }
      },
      setData(result){
        result.forEach(item => {
          item.puddate = parseInt(item.puddate)
          item.time = new Date(item.puddate).format('yyyy/MM/dd  hh:mm:ss')
        })
        this.worksItem = result
        this.type = 'operating'
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .work-item {
    margin: .2rem 0 1rem 0;
    border-top: 1px solid #D8D8D8;
    ul {
      li {
        padding: .24rem 0 .25rem .3rem;
        list-style: none;
        background: rgba(255, 255, 255, 1);
        border-bottom: 1px solid #D8D8D8;
        p {
          font-size: .32rem;
          color: #000;
          line-height: .45rem;
        }
        > div {
          span {
            display: block;
            font-size: .24rem;
            color: rgba(153, 153, 153, 1);
            line-height: .33rem;
            padding-top: .08rem;
          }
        }
      }
    }
  }
</style>
