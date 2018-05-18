<template>
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
  import { XHeader ,Actionsheet,TransferDom} from 'vux'
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
      return {
         //  公告内容
        annContent: null,
        //  业界新闻
        newContent: null,
      }
    },
    methods:{
        setData(response){
          if (response.status == 200 && response.data.status == 1) {
            console.log(response.data.result.announcement[0])
            if (response.data.result.announcement[0].type == 1) {
              this.annContent = response.data.result.announcement[0]
            }
            else if(response.data.result.announcement[0].type == 2) {
              this.newContent = response.data.result.announcement[0]
            }
          }
        },
        showMenus(){

        }
    },
    beforeRouteEnter(to,from,next){
      axios.get('user/getAnnouncementById.do', {
        params: {
          announcementId: to.query.id,
          needContent: '1',
          type: to.query.type
        }
      }).then(response => {
        next(vm =>{
            vm.setData(response)
        })
      })
    }
  }
</script>

