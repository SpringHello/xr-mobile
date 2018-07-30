<template>
  <div>
    <x-header></x-header>
    <div class="newscenter">
      <div class="news-nav">
        <tab active-color="#4A90E2">
          <tab-item @on-item-click="getData(item.type)" v-for="(item,index) in news"
                    class="tab-item" :key="index" :selected="index==0">
            {{item.title}}({{item.num}})
          </tab-item>
        </tab>
      </div>
      <div class="content" v-show="datas.length!=0">
        <ul>
          <li v-for="(item,index) in datas">
            <div>
              <p class="title"><span> [{{item.actType}}]</span>{{item.name}}</p>
              <p class="right" @click="toview(item)">查看详情</p>
            </div>
            <p class="desc" @click="opration(item.id)">{{item.content}}</p>
          </li>
        </ul>
      </div>
    </div>

    <actionsheet v-model="showAll" :menus="menusAll" show-cancel :close-on-clicking-mask="false"
                 @on-click-menu="mark"></actionsheet>
    <actionsheet v-model="showUnread" :menus="menusUnread" show-cancel :close-on-clicking-mask="false"
                 @on-click-menu="mark"></actionsheet>
    <actionsheet v-model="showIsread" :menus="menusIsread" show-cancel :close-on-clicking-mask="false"
                 @on-click-menu="mark"></actionsheet>

  </div>
</template>

<script>
  import {XHeader, Grid, GridItem, Actionsheet, Tab, TabItem} from 'vux'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  export default{
    components: {
      XHeader,
      Grid,
      GridItem,
      Actionsheet,
      Tab,
      TabItem
    },
    data (){
      window.scrollTo(0, 0);
      return {
        news: [
          {title: '全部', type: 'all', status: false, num: ''},
          {title: '已读', type: 'isread', status: false, num: ''},
          {title: '未读', type: 'unread', status: false, num: ''},
        ],
        datas: [],
        id: '',
        type: '',
        urltype: '',
        showAll: false,
        menusAll: {
          isread: '<span style="color:#4A90E2">标为已读</span>',
          unread: '<span style="color:#4A90E2">标为未读</span>',
          delete: '<span style="color:red">删除</span>',
        },
        showUnread: false,
        menusUnread: {
          isread: '<span style="color:#4A90E2">标为已读</span>',
          delete: '<span style="color:red">删除</span>',
        },
        showIsread: false,
        menusIsread: {
          unread: '<span style="color:#4A90E2">标为未读</span>',
          delete: '<span style="color:red">删除</span>',
        },
      }
    },
    methods: {
      //获取数据
      getData(type){
        let params = {
          rows: 15,
          page: 1,
        }
        if (type == 'isread') {
          params.isRead = '1'
          this.type = 'isread'
        } else if (type == 'unread') {
          params.isRead = '0'
          this.type = 'unread'
        } else if (type == 'all') {
          this.type = 'all'
          params.isRead = '2'
        }
        axios.post('user/getEventNotifyList.do', params).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.datas = response.data.result
            this.news.forEach(item => {
              switch (item.type) {
                case 'all':
                  item.num = response.data.pageTotal
                  break;
                case 'isread':
                  item.num = response.data.alreadyTotal
                  break;
                case 'unread':
                  item.num = response.data.noReadTotal
                  break;
              }
            })
          }
        })
      },
      // 查看消息详情
      toview(msg){
        sessionStorage.setItem('content', JSON.stringify(msg))
        this.$router.push('Newdetail')
      },
      //信息操作
      opration(id){
        this.id = id
        if (this.type == 'all') {
          this.showAll = true
        }
        if (this.type == 'unread') {
          this.showUnread = true
        }
        if (this.type == 'isread') {
          this.showIsread = true
        }
      },
      //确认信息操作
      mark(key){
        if (key != 'cancel') {
          switch (key) {
            case 'delete':
              this.urltype = 'del'
              break;
            case 'isread':
              this.urltype = 'readed'
              break;
            case 'unread':
              this.urltype = 'unreaded'
              break;
          }
          axios.post(`user/${this.urltype}EventNotify.do`, {
            list: JSON.stringify([{'id': this.id}])
          }).then(response => {
            if (response.status == 200 && response.data.status == 1
            ) {
              this.getData(this.type)
            }
          })

        }
      }
    },
    created(){
      this.getData('all')
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .newscenter {
    .tab-item {
      font-size: .3rem;
      color: #000;
    }
    .content {
      border-top: 1px solid #e7e7e7;
      background-color: #FFF;
      margin-top: .2rem;
      border-bottom: 1px solid #e7e7e7;
      ul {
        margin-left: .3rem;
        background-color: #FFF;
        li {
          list-style: none;
          border-bottom: 1px solid #e7e7e7;
          padding: .2rem .3rem .2rem 0;
          > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: .12rem;
            .title {
              font-size: .28rem;
              color: rgba(53, 53, 53, 1);
              line-height: .4rem;
            }
            .right {
              font-size: .2rem;
              color: rgba(153, 153, 153, 1);
              line-height: .28rem;
            }
          }
          .desc {
            font-size: .24rem;
            color: rgba(153, 153, 153, 1);
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }
  }
</style>
