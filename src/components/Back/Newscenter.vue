<template>
  <div>
    <x-header></x-header>
    <div class="newscenter">
      <div class="news-nav">
        <ul>
          <li v-for="(item,index) in news" :key="index"  @click="getData(item.type)">{{item.title}}</li>
        </ul>
      </div>
       <div class="content">
        <ul>
          <li v-for="(item,index) in datas" @click="toview(item)">
            <div>
              <p class="title">{{item.name}} <span> [{{item.actType}}]</span></p>
              <p class="right">{{item.publishtime}}</p>
            </div>
            <p class="desc">{{item.content}}</p>
          </li>
        </ul>
       </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Grid, GridItem} from 'vux'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  export default{
    components: {
      XHeader,
      Grid,
      GridItem
    },
    data (){
      return {
        news: [
          {title: '全部', type: 'all',status:false},
          {title: '已读', type: 'isread',status:false},
          {title: '未读', type: 'unread',status:false},
        ],
        datas:[],
      }
    },
    methods:{
        //获取数据
      getData(type){
        let params = {
          rows: 15,
          page: 1,
        }
        if (type == 'isread') {
          params.isRead = '1'
        } else if (type == 'unread') {
          params.isRead = '0'
        } else if (type == 'all') {
          params.isRead = '2'
        }
        axios.post('user/getEventNotifyList.do', params).then(response => {
          if (response.status == 200 && response.data.status == 1) {
             this.datas=response.data.result

          }
        })
      },
      // 查看消息详情
      toview(msg){
          sessionStorage.setItem('content',JSON.stringify(msg))
          this.$router.push('Newdetail')
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
    .news-nav {
      padding: .4rem 0;
      ul {
        border: .05rem solid #e7e7e7;
        li{
          width: 33.3%;
          border-right:.05rem solid #e7e7e7;
          display: inline-block;
          text-align: center;
          font-size: .8rem;
          color:#353535;
          line-height: 2.5rem;
          &:last-of-type{
            border-right: none;
          }
          &:hover{
            background:rgba(234,234,234,1)
          }
        }
      }

    }
    .content{
      ul{
        padding: .5rem;
        li{
          padding-bottom: .8rem;
          list-style: none;
          border-bottom: 1px solid #e7e7e7;
          >div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            .title{
              font-size: .7rem;
              color:rgba(53,53,53,1);
            }
            .right {
              font-size: .65rem;
              color:rgba(153,153,153,1);
            }
          }
          .desc{
            font-size: .65rem;
            color:rgba(153,153,153,1);
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
