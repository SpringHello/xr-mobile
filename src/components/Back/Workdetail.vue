<template>
  <div v-show="details!=null" class="workdetails">
    <x-header>工单</x-header>
    <div class="details">
      <div class="details-left">
        <p>{{details.title}}</p>
        <span>{{description}} / {{subdescription}}</span>
      </div>
      <div class="details-right">
        {{details.wc_sataus==2?'处理中':'已关闭'}}
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <img src="../../assets/img/account/isuu.png">
          <div>
            <p>{{details.issue}}</p>
            <span>{{time}}</span>
          </div>
        </li>
        <li v-for="(item,index) in replays" :key="index">
          <img src="../../assets/img/account/isuu.png">
          <div>
            <p>{{item.g_reply}}</p>
            <span>{{gtime}}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="bottom" v-show="details.wc_sataus==2">
      <button class="close" @click="closeWork">关闭工单</button>
      <button class="ask" @click="ASK">继续追问</button>
    </div>

    <div v-transfer-dom>
      <confirm v-model="showAsk"
               show-input
               ref="confirm"
               @on-confirm="getAsk">
      </confirm>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import {XHeader, Confirm, Group, TransferDomDirective as TransferDom, XInput} from 'vux'
  export default{
    components: {
      XHeader,
      Group,
      Confirm,
      TransferDom,
      XInput
    },
    beforeRouteEnter(to, from, next){
      axios.get('order/viewOrder.do', {
        params: {
          orderid: sessionStorage.getItem('workId')
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          next(vm => {
            vm.details = response.data.msg[2][0]
            vm.replays = response.data.msg[3]
            vm.replays.forEach(item => {
              vm.gtime = new Date(parseInt(item.repdate)).format('yyyy/MM/dd  hh:mm:ss')
            })
            vm.description = response.data.msg[0].description
            vm.time = new Date(parseInt(response.data.msg[2][0].puddate)).format('yyyy/MM/dd  hh:mm:ss')
          })
        }
      })
    },
    data (){
      window.scrollTo(0, 0);
      return {
        details: {},
        replays: [],
        description: '',
        time: '',
        gtime: '',
        subdescription: sessionStorage.getItem('subdescription'),
        showAsk: false,
      }
    },
    methods: {
      //关闭工单
      closeWork(){
        axios.get('order/closeOrder.do', {
          params: {
            orderid: this.details.id
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$vux.toast.text('已关闭工单', 'middle')
            this.$router.push('workorder')
          } else {
            this.$vux.toast.text(response.data.msg, 'middle')
          }
        })
      },
      //继续追问
      ASK(){
        this.showAsk = true
      },
      //追问确认
      getAsk(value){
        axios.get('order/reply.do', {
          params: {
            orderid: this.details.id,
            editorValue: value
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.replays.push({
              g_reply: response.data.msg.g_reply,
              repdate: new Date().getTime()
            })
            this.replays.forEach(item => {
              this.gtime = new Date(parseInt(item.repdate)).format('yyyy/MM/dd  hh:mm:ss')
            })
          }
        })

      }
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .details {
    padding: .24rem .42rem .24rem .3rem;
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0;
    > div {
      p {
        font-size: .32rem;
        color: #000;
        line-height: .45rem;
      }
      span {
        font-size: .24rem;
        color: rgba(153, 153, 153, 1);
        line-height: .33rem;
      }
    }
    .details-right {
      font-size: .24rem;
      color: rgba(153, 153, 153, 1);
      line-height: .33rem;
    }
  }

  .content {
    padding: .48rem .49rem 0 .3rem;
    li {
      list-style: none;
      display: flex;
      align-items: center;
      font-size: .24rem;
      line-height: .33rem;
      padding-bottom: .5rem;
      img {
        width: .88rem;
        height: .88rem;
        margin-right: .24rem;
      }
      p {
        color: #000;
        padding-bottom: .1rem;
      }
      span {
        color: rgba(153, 153, 153, 1);
      }

    }
  }

  .bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    button {
      outline: none;
      border: none;
      font-size: .32rem;
      color: rgba(74, 144, 226, 1);
      line-height: .45rem;
      background: rgba(255, 255, 255, 1);
      padding: .28rem 1.28rem .26rem 1.19rem;
    }
    .ask {
      color: rgba(255, 255, 255, 1);
      background: rgba(74, 144, 226, 1);
    }
  }

</style>
