<template>
  <div>
    <x-header></x-header>
    <div class="newscenter">
      <div class="news-nav">
        <tab active-color="#4A90E2">
          <tab-item @on-item-click="changeType(item.type)" v-for="(item,index) in news"
                    class="tab-item" :key="index" :selected="index==0">
            {{item.title}}({{item.num}})
          </tab-item>
        </tab>
      </div>

      <swipeout>
        <swipeout-item v-for="(item,index) in datas" class="content-item" :key="`${item.id+Math.random()}`">
          <div slot="right-menu">
            <swipeout-button @click.native="ISread(item.id)" :width="(type=='all'|| type=='unread')?80:0"
                             background-color="#4A90E2"
                             v-if="type=='all'|| type=='unread'" text="已读">
            </swipeout-button>
            <swipeout-button @click.native="UNread(item.id)" :width="(type=='all'|| type=='isread')?80:0"
                             background-color="#4A90E2"
                             v-if="type=='all'|| type=='isread'" text="未读">
            </swipeout-button>
            <swipeout-button @click.native="Delete(item.id)" :width="80" background-color="#DB4232"
                             text="删除"></swipeout-button>
          </div>
          <div slot="content" class="demo-content">
            <div class="content" v-show="datas.length!=0">
              <ul @click="toview(item)">
                <li>
                  <div>
                    <p class="title"><span> [{{item.actType}}]</span>{{item.name}}</p>
                    <p class="right">{{item.publishtime}}</p>
                  </div>
                  <p class="desc">{{item.content}}</p>
                </li>
              </ul>
            </div>
          </div>
        </swipeout-item>
      </swipeout>
    </div>

  </div>
</template>

<script>
  import {XHeader, Tab, TabItem, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  export default{
    components: {
      XHeader,
      Tab,
      TabItem,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.searchNext()
      })
    },
    data (){
      window.scrollTo(0, 0);
      return {
        news: [
          {title: '全部', type: 'all', status: false, num: ''},
          {title: '已读', type: 'isread', status: false, num: ''},
          {title: '未读', type: 'unread', status: false, num: ''},
        ],
        pageType: {
          pageSize: '10',
          page: 0
        },
        datas: [],
        type: 'all',
        width: 0
      }
    },
    mounted(){
      window.onscroll = () => {
        var scrollTop = document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight;
        var windowHeight = document.documentElement.clientHeight;
        if (scrollTop + windowHeight == scrollHeight) {
          this.searchNext()
          return
        }
      };
    },
    methods: {
      //获取下一页数据
      searchNext(){
        this.pageType.page += 1
        let params = {
          rows: this.pageType.pageSize,
          page: this.pageType.page,
        }
        switch (this.type) {
          case 'all':
            params.isRead = '2'
            break;
          case 'isread':
            params.isRead = '1'
            break;
          case 'unread':
            params.isRead = '0'
            break;
        }
        axios.post('user/getEventNotifyList.do', params).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.datas = this.datas.concat(response.data.result)
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
          }
        )
      },
      changeType(type){
        this.type = type
        this.datas = []
        this.pageType.page = 0
        this.searchNext()
      },
      // 查看消息详情
      toview(msg){
        this.ISread(msg.id)
        sessionStorage.setItem('content', JSON.stringify(msg))
        this.$router.push('Newdetail')
      },
      //操作
      ISread(id){
        axios.post(`user/readedEventNotify.do`, {
          list: JSON.stringify([{'id': id}])
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (this.type != 'all') {
              this.datas = this.datas.filter(item => {
                return item.id != id
              })
            }
            this.getNumber()
          }
        })
      },
      Delete(id){
        axios.post(`user/delEventNotify.do`, {
          list: JSON.stringify([{'id': id}])
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.datas = this.datas.filter(item => {
              return item.id != id
            })
            this.getNumber()
          }
        })
      },
      UNread(id){
        axios.post(`user/unreadedEventNotify.do`, {
          list: JSON.stringify([{'id': id}])
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (this.type != 'all') {
              this.datas = this.datas.filter(item => {
                return item.id != id
              })
            }
            this.getNumber()
          }
        })
      },
      getNumber(){
        let params = {
          rows: this.pageType.pageSize,
          page: this.pageType.page,
          isRead: '2'
        }
        axios.post('user/getEventNotifyList.do', params).then(response => {
          this.datas = this.datas.concat(response.data.result)
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
        })
      }
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .newscenter {
    .news-nav {
      margin-bottom: .2rem;
      .tab-item {
        font-size: .3rem;
        color: #000;
      }
    }

  }

  .content-item {
    border-top: 1px solid #e7e7e7;
    &:last-of-type {
      border-bottom: 1px solid #e7e7e7;
    }
    .demo-content {
      .content {
        background-color: #FFF;
        ul {
          background-color: #FFF;
          padding: .2rem .3rem .2rem .3rem;
          li {
            list-style: none;
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
          }
        }
      }
    }
  }

</style>
