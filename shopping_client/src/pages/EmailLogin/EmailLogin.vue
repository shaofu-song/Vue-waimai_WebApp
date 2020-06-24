<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">简易外卖</h2>
      </div>
      <div class="login_content">
        <form @submit.prevent="emailLogin">
          <div class="on">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="16" placeholder="用户名" v-model="emailUserName">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="16" placeholder="密码" v-if="showPwd" v-model="emailUserPwd">
                <input type="password" maxlength="16" placeholder="密码" v-else v-model="emailUserPwd">
                <div class="switch_button" :class="showPwd?'on' : 'off'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd?'👁️': ''}}</span>
                </div>
              </section>  
              <section class="login_message">
                <input type="text" maxlength="5" placeholder="验证码" v-model="verifyImg">
                <img class="get_verification" src="/api2/users/verifyImg" alt="verifyImg"
                  @click="handleToVerifyImg">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <router-link to="/emailRegister">
          <a href="javascript:;" class="about_us_left">立即注册</a>
        </router-link>
        <router-link to="/emailFindPwd">
          <a href="javascript:;" class="about_us_right">找回密码</a>
        </router-link>
      </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
import axios from 'axios'
import {messageBox} from '../../components/JS/index'
import AlertTip from '../../components/AlertTip/AlertTip'

export default {
  data () {
    return {
      emailUserName: '',
      emailUserPwd: '',
      verifyImg: '',
      showPwd: false, // 是否显示密码
      alertText: '', // 提示文本
      alertShow: false, //是否显示警告框
    }
  },
  components: {
    AlertTip
  },

  methods: {
    //显示警告框
    showAlert (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },

    //关闭警告框
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },

    emailLogin () {
      const {emailUserName, emailUserPwd, verifyImg} = this
      if(!this.emailUserName) {
        // 用户名必须指定
        this.showAlert('用户名必须指定')
        return
      }else if(!this.emailUserPwd) {
        // 密码必须指定
        this.showAlert('密码必须指定')
        return
      }else if(!this.verifyImg) {
        // 验证码必须指定
        this.showAlert('验证码必须指定')
        return
      }
      axios.post('/api2/users/login',{
        username : this.emailUserName,
        password : this.emailUserPwd,
        verifyImg : this.verifyImg
      }).then((res)=>{
        var status = res.data.status;
          var This = this;
          if(status === 0){
            messageBox({
              title : '登录',
              content : '登录成功',
              ok : '确定',
              handleOk(){
                  This.$router.push('/emailProfile');
              }
            });
          }
          else{
            messageBox({
              title : '登录',
              content : res.data.msg,
              ok : '确定'
            });
          }

      })
    },

    handleToVerifyImg(ev) {
      ev.target.src = "/api2/users/verifyImg?" + Math.random();
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" >
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                width 40%
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us_left
          display block
          float left
          font-size 16px
          margin-top 20px
          text-align center
          color #999
        .about_us_right
          display block
          float right 
          font-size 16px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>