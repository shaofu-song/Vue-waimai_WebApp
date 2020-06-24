<template>
  <div>
    <section class="profile">
      <HeaderTop>
        <span class="header_title" slot="midtitle">
          <span class="header_title_text ellipsis">我的</span>
        </span>
      </HeaderTop>
      <section class="profile-number">
        <router-link :to="$store.state.user.emailLoginStatus ? '/userinfo' : '/login'" class="profile-link">
          <div class="profile_image">
            <i class="iconfont icon-person" v-if="!$store.state.user.emailLoginStatus"></i>
            <img class="userHead" :src="$store.state.user.emailUserHead" v-else>
          </div>
          <div class="user-info">
            <p class="user-info-top">{{$store.state.user.emailUserName || '登录/注册'}}</p>
            <p class="user-info-top" v-if="$store.state.user.emailIsAdmin">管理员</p>
            <p class="user-info-top" v-else>普通会员</p>
          </div>
          <span class="arrow">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </router-link>
      </section>
      <section class="profile_info_data border-1px">
        <ul class="info_data_list">
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0.00</span>元</span>
            <span class="info_data_bottom">我的余额</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>个</span>
            <span class="info_data_bottom">我的优惠</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>分</span>
            <span class="info_data_bottom">我的积分</span>
          </a>
        </ul>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 进入管理后台 -->
        <a href="/#/admin" target="_black" class="my_order" v-show="$store.state.user.emailIsAdmin">
          <span>
            <i class="iconfont icon-person"></i>
          </span>
          <div class="my_order_div">
            <span>进入管理后台</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
        <!-- 我的订单 -->
        <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-order-s"></i>
          </span>
          <div class="my_order_div">
            <span>我的订单</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
        <!-- 积分商城 -->
        <a href='javascript:' class="my_order">
          <span>
            <i class="iconfont icon-jifen"></i>
          </span>
          <div class="my_order_div">
            <span>积分商城</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
        <!-- 简易外卖会员卡 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-vip"></i>
          </span>
          <div class="my_order_div">
            <span>简易外卖会员卡</span>
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
      </section>
      <section class="profile_my_order border-1px">
        <!-- 上传头像 -->
        <a href="javascript:" class="my_order">
          <span>
            <i class="iconfont icon-fuwu"></i>
          </span>
          <div class="my_order_div">
            <input class="head_img" type="file" name="file" value="上传头像" @change="handleToUpload">
            <!-- <span>上传头像</span> -->
            <span class="my_order_icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </a>
      </section>
      <section class="profile_my_order border-1px">
        <mt-button type="danger" style="width: 100%" v-if="$store.state.user.emailLoginStatus" @click="EmailLogout">退出登录</mt-button>
      </section>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import {messageBox} from '../../components/JS/index'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import {MessageBox, Toast} from 'mint-ui'

export default {
  components:{
    HeaderTop,
  },
  methods: {
    EmailLogout () {
      MessageBox.confirm('确认退出吗?').then(
        action => {
          // 请求退出
          axios.get('/api2/users/logout').then((res)=>{
            var status = res.data.status;
            if(status === 0){
                // window.localStorage.removeItem('emailUser');
                localStorage.removeItem('emailLoginStatus');
                localStorage.removeItem('emailUserName');
                localStorage.removeItem('emailIsAdmin');
                const emailUser = {
                  emailLoginStatus: false, 
                  emailUserName: '',
                  emailIsAdmin : false , 
                  emailUserHead : ''
                }
                this.$store.commit('user/EMAIL_USER',{emailUser});
                this.$router.push('/profile');
            }
          });
          Toast({
            message: '您已退出',
            duration: 1000
          })
        },
        action => {
          console.log('点击了取消')
        }
      );
      
    },
  handleToUpload (ev) {
    var file = ev.target.files[0];
    var param = new FormData();
    param.append('file' , file , file.name);
    var config = {
      headers : {
          'Content-Type' : 'multipart/form-data'
      }
    };

    axios.post('/api2/users/uploadUserHead',param , config).then((res)=>{
      var status = res.data.status;
      var This = this;
      if( status === 0 ){
        const emailUser = {
          emailLoginStatus: This.$store.state.user.emailLoginStatus, 
          emailUserName: This.$store.state.user.emailUserName,
          emailIsAdmin : This.$store.state.user.emailIsAdmin,
          emailUserHead : res.data.data.userHead + '?' + Math.random()
        }
        messageBox({
          title : '信息',
          content : '上传头像成功',
          ok : '确定',
          handleOk() {
            This.$store.commit('user/EMAIL_USER',{emailUser});
            // This.$store.commit('user/USER_NAME',{ 
            //   name : This.$store.state.user.name , 
            //   isAdmin : This.$store.state.user.isAdmin ,
            //   userHead : res.data.data.userHead + '?' + Math.random()
            // });
          }
        });
      }
      else{
        messageBox({
          title : '信息',
          content : '上传头像失败',
          ok : '确定'
        });
      }
    });
  }
},

  beforeRouteEnter (to, from, next) {
    axios.get('/api2/users/getUser').then((res)=>{
      var status = res.data.status;
      if(status === 0){
        next(vm => {
          const emailUser = {
            emailLoginStatus: true, 
            emailUserName: res.data.data.username,
            emailIsAdmin : res.data.data.isAdmin ,
            emailUserHead : res.data.data.userHead
          }
          localStorage.setItem('emailLoginStatus',emailUser.emailLoginStatus);
          localStorage.setItem('emailUserName',res.data.data.username);
          localStorage.setItem('emailIsAdmin',res.data.data.isAdmin);
          // window.localStorage.setItem('emailUser',JSON.stringify(emailUser));
          vm.$store.commit('user/EMAIL_USER',{emailUser});
        });
      }
      else{
          next('/profile');
      }
    });
  },

}
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .profile //我的
    overflow hidden
    width 100%
    .profile-number
      margin-top 45.5px
      .profile-link
        clearFix()
        position relative
        display block
        background #02a774
        padding 20px 10px
        .profile_image
          float left
          width 60px
          height 60px
          border-radius 50%
          overflow hidden
          vertical-align top
          .icon-person
            background #e4e4e4
            font-size 20px
          .userHead
            width 60px
            height 60px
            border-radius 50%
            overflow hidden
        .user-info
          float left
          margin-top 8px
          margin-left 15px
          p
            font-weight: 700
            font-size 18px
            color #fff
            &.user-info-top
              padding-bottom 8px
            .user-icon
              display inline-block
              margin-left -15px
              margin-right 5px
              width 20px
              height 20px
              .icon-mobile
                font-size 30px
                vertical-align text-top
            .icon-mobile-number
              font-size 14px
              color #fff
        .arrow
          width 12px
          height 12px
          position absolute
          right 15px
          top 40%
          .icon-jiantou1
            color #fff
            font-size 5px
    .profile_info_data
      bottom-border-1px(#e4e4e4)
      width 100%
      background #fff
      overflow hidden
      .info_data_list
        clearFix()
        .info_data_link
          float left
          width 33%
          text-align center
          border-right 1px solid #f1f1f1
          .info_data_top
            display block
            width 100%
            font-size 14px
            color #333
            padding 15px 5px 10px
            span
              display inline-block
              font-size 30px
              color #f90
              font-weight 700
              line-height 30px
          .info_data_bottom
            display inline-block
            font-size 14px
            color #666
            font-weight 400
            padding-bottom 10px
        .info_data_link:nth-of-type(2)
          .info_data_top
            span
              color #ff5f3e
        .info_data_link:nth-of-type(3)
          border 0
          .info_data_top
            span
              color #6ac20b
    .profile_my_order
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .my_order
        display flex
        align-items center
        padding-left 15px
        >span
          display flex
          align-items center
          width 20px
          height 20px
          >.iconfont
            margin-left -10px
            font-size 30px
          .icon-person
            font-size 18px
            margin-left -5px
          .icon-order-s
            color #02a774
          .icon-jifen
            color #ff5f3e
          .icon-vip
            color #f90
          .icon-fuwu
            color #02a774
        .my_order_div
          width 100%
          border-bottom 1px solid #f1f1f1
          padding 18px 10px 18px 0
          font-size 16px
          color #333
          display flex
          justify-content space-between
          span
            display block
          .head_img
            display block
            width 80px
            height 27px
          .my_order_icon
            width 10px
            height 10px
            .icon-jiantou1
              color #bbb
              font-size 10px
</style>