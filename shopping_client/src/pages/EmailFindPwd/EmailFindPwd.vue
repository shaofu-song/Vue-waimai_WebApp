<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">简易外卖</h2>
      </div>
      <div class="login_content">
        <form @submit.prevent="emailFindPwd">
          <div class="on">
            <section class="login_message">
              <input type="tel" maxlength="18" placeholder="qq邮箱" v-model="email">
              <button :disabled="!rightEmail" class="get_verification" 
              :class="{right_phone: rightEmail}" @click.prevent="handleToVerify">{{ verifyInfo }}</button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="16" placeholder="新密码" v-if="showPwd" v-model="emailUserPwd">
              <input type="password" maxlength="16" placeholder="新密码" v-else v-model="emailUserPwd">
              <div class="switch_button" :class="showPwd?'on' : 'off'" @click="showPwd = !showPwd">
                <div class="switch_circle" :class="{right: showPwd}"></div>
                <span class="switch_text">{{showPwd?'👁️': ''}}</span>
              </div>
            </section>  
            <section class="login_verification">
              <input type="password" maxlength="16" placeholder="确认密码" v-model="emailUserPwdAgain">
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="6" placeholder="验证码" v-model="emailVerify">
            </section>
          </div>
          <button class="login_submit">修改</button>
        </form>
        <router-link to="/emailLogin">
          <a href="javascript:;" class="about_us_left">立即登陆</a>
        </router-link>
        <router-link to="/emailRegister">
          <a href="javascript:;" class="about_us_right">找回注册</a>
        </router-link>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import {messageBox} from '../../components/JS/index'
import AlertTip from '../../components/AlertTip/AlertTip'

export default {
  data () {
    return {
      email: '',
      emailUserPwd: '',
      emailUserPwdAgain: '',
      emailVerify: '',
      showPwd: false, // 是否显示密码
      verifyInfo : '发送验证码',
      count: 0, // 计时的时间 
      alertText: '', // 提示文本
      alertShow: false, //是否显示警告框
    }
  },
  computed: {
    rightEmail () {
      // return /^1\d{10}$/.test(this.phone)
      return /^\w{5,}@[a-z0-9]{2,3}\.[a-z]+$|\,$/.test(this.email)
    }
  },
  components: {
    AlertTip
  },

  methods: {
    handleToVerify () {
      if(!this.rightEmail){ return; }
      // 如果当前没有计时
      if(!this.count) {
        axios.get('/api2/users/verify?email=' + this.email ).then((res)=>{
          var status = res.data.status;
          var This = this;
          if( status === 0 ){
            messageBox({
              title : '验证码',
              content : '验证码已发送',
              ok : '确定',
              handleOk(){
                  This.countDown();
              }
            });
          }
          else{
            messageBox({
              title : '验证码',
              content : '验证码发送失败',
              ok : '确定'
            });
          }
        });
      }
    },

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

    emailFindPwd () {
      const {email, emailUserPwd, emailUserPwdAgain, emailVerify} = this
      if(!this.rightEmail) {
        // 邮箱输入不正确
        this.showAlert('邮箱输入不正确')
        return
      }else if(!this.emailUserPwd) {
        // 密码必须指定
        this.showAlert('密码必须指定')
        return
      }else if(this.emailUserPwdAgain !== this.emailUserPwd) {
        // 密码必须指定
        this.showAlert('请确认重复密码')
        return
      }else if(!/^\d{6}$/.test(emailVerify)) {
        // 验证必须是6位数字
        this.showAlert('验证必须是6位数字')
        return
      }
      axios.post('/api2/users/findPassword',{
        email : this.email,
        password : this.emailUserPwd,
        verify : this.emailVerify
      }).then((res)=>{
          var status = res.data.status;
          var This = this;
          if(status===0){
            messageBox({
                title : '修改',
                content : '修改密码成功',
                ok : '确定',
                handleOk(){
                    This.$router.push('/emailLogin');
                }
            });
          }else{
            messageBox({
              title : '修改',
              content : '修改密码失败',
              ok : '确定'
            });
          }
      });
    },

    countDown(){
      this.count = 60;
      this.intervalId = setInterval(()=>{
        this.count--;
        this.verifyInfo = '已发送' + this.count +'s';
        if( this.count === 0 ){
            this.disabled = false;
            this.verifyInfo = '发送验证码';
            clearInterval(this.intervalId);//定时器一直计时问题，没清掉timer
        }
      },1000);
    },
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