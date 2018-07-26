<template>
  <!--公告详情页面-->
  <div>
    <div v-if="$route.query.type==1">
      <div v-if="annContent!=null" class="anncontents">
        <div class="anncontent-header">
          <p class="anncontent-header-item"><span class="anncontent-header-lo">官方公告</span>
            <span>{{annContent.title}}</span></p>
          <p class="anncontent-header-time">发布时间： {{annContent.createtime}} <span>来源：新睿云</span></p>
        </div>
        <div class="anncontent-content" v-html="annContent.content"></div>
      </div>
    </div>
    <div v-if="$route.query.type==2">
      <div v-if="newContent!=null" class="newContent">
        <div class="newContent-header">
          <p class="newContent-header-item"><span class="newContent-header-lo">业界新闻</span>
            <span>{{newContent.title}}</span></p>
          <p class="newContent-header-time">发布时间： {{newContent.createtime}} <span>来源：互联网</span></p>
        </div>
        <div class="newContent-content" v-html="newContent.content"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import {XHeader, Actionsheet, TransferDom} from 'vux'
  import axios from '@/util/iaxios'
  export default{
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet
    },
    data () {
      window.scrollTo(0, 0);
      return {
        //  公告内容
        annContent: null,
        //  业界新闻
        newContent: null,
      }
    },
    methods: {
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          console.log(response.data.result.announcement[0])
          if (response.data.result.announcement[0].type == 1) {
            this.annContent = response.data.result.announcement[0]
          }
          else if (response.data.result.announcement[0].type == 2) {
            this.newContent = response.data.result.announcement[0]
          }
        }
      },
      showMenus(){

      }
    },
    beforeRouteEnter(to, from, next){
      axios.get('user/getAnnouncementById.do', {
        params: {
          announcementId: to.query.id,
          needContent: '1',
          type: to.query.type
        }
      }).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  //公告页面样式
  .anncontents {
    padding: 1rem;
    .anncontent-header {
      border-bottom: .025rem solid #ddd;
      .anncontent-header-item {
        line-height: 1.5rem;
        font-size: .55rem;
        color: #333;
        .anncontent-header-lo {
          width: 3rem;
          height: 1rem;
          color: #fff;
          line-height: 1.1rem;
          font-size: .5rem;
          text-align: center;
          background: #0af;
          padding: .19rem .55rem;
          margin-right: 1rem;
        }
      }
      .anncontent-header-time {
        line-height: 2.5rem;
        font-size: .5rem;
        color: #aaa;
        span {
          float: right;
        }
      }
    }
    .anncontent-content {
      padding-top: .75rem;
      text-align: justify;
      font-size: .5rem;
      line-height: 1.15rem;
      color: #333;
    }
  }

  .newContent {
    padding: 1rem;
    .newContent-header {
      border-bottom: .025rem solid #ddd;
      .newContent-header-item {
        width: 16.8rem;
        line-height: 1.5rem;
        font-size: .55rem;
        color: #333;
        .newContent-header-lo {
          width: 3rem;
          height: 1rem;
          color: #fff;
          line-height: 1.1rem;
          font-size: .5rem;
          text-align: center;
          background: #8c8c8c;
          padding: .19rem .55rem;
          margin-right: 1rem;
        }
      }

      .newContent-header-time {
        line-height: 2.5rem;
        font-size: .5rem;
        color: #aaa;
        span {
          float: right;
        }
      }
    }
    .newContent-content {
      padding-top: .75rem;
      text-align: justify;
      font-size: .5rem;
      line-height: 1.15rem;
      color: #333;
    }
  }
</style>

