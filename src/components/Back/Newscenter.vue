<template>
  <div>
    <x-header></x-header>
    <div class="newscenter">
      <div class="news-nav">
        <ul>
          <li v-for="(item,index) in news" :key="index" @click="getData(item.type)">{{item.title}}({{item.num}})</li>
        </ul>
      </div>
      <div class="content">
        <ul>
          <li v-for="(item,index) in datas">
            <div>
              <p class="title">{{item.name}} <span> [{{item.actType}}]</span></p>
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
  import {XHeader, Grid, GridItem, Actionsheet} from 'vux'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  export default{
    components: {
      XHeader,
      Grid,
      GridItem,
      Actionsheet
    },
    data (){
      return {
        news: [
          {title: '全部', type: 'all', status: false, num: ''},
          {title: '已读', type: 'isread', status: false, num: ''},
          {title: '未读', type: 'unread', status: false, num: ''},
        ],

        datas: [],
        id: '',
        type: '',
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
        if (this.type = 'all') {
          this.showAll = true
          this.id = id
        }
        if (this.type = 'unread') {
          this.showUnread = true
          this.id = id
        }
        if (this.type = 'isread') {
          this.showIsread = true
          this.id = id
        }
      },
      //确认信息操作
      mark(key){
        switch (key) {
          case 'delete':
            this.type = 'del'
            break;
          case 'isread':
            this.type = 'readed'
            break;
          case 'unread':
            this.type = 'unreaded'
            break;
        }
        axios.post(`user/${this.type}EventNotify.do`, {
          list: JSON.stringify([{'id': this.id}])
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.getData('all')
            this.getData('unread')
            this.getData('isread')
          }
        })


      }
    },
    created(){
      this.getData('all')
      this.getData('unread')
      this.getData('isread')
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .newscenter {
    margin-bottom: 1rem;
    .news-nav {
      line-height: 0;
      ul {
        border: 1px solid #e7e7e7;
        li {
          padding: .35rem 0;
          width: 33.3%;
          border-right: 1px solid #e7e7e7;
          display: inline-block;
          text-align: center;
          font-size: .32rem;
          color: #353535;
          &:last-of-type {
            border-right: none;
          }
          &:hover {
            background: rgba(234, 234, 234, 1)
          }
        }
      }

    }
    .content {
      ul {
        padding: .3rem;
        li {
          padding-bottom: .3rem;
          list-style: none;
          border-bottom: 1px solid #e7e7e7;
          > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .2rem 0;
            .title {
              font-size: .28rem;
              color: rgba(53, 53, 53, 1);
            }
            .right {
              font-size: .2rem;
              color: rgba(153, 153, 153, 1);
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
        }
      }
    }
  }
</style>
