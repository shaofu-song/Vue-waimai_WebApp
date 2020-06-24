<template>
  <section class="order">
    <HeaderTop>
      <span class="header_title" slot="midtitle">
       <span class="header_title_text ellipsis">订单列表</span>
      </span>
    </HeaderTop>
    <section class="order_no_login">
      <img src="./images/person.png">
      <router-link :to="(userInfo._id || $store.state.user.emailLoginStatus) ? '/userinfo': '/login'">
        <div v-if="!(userInfo._id || $store.state.user.emailLoginStatus)">
          <h3>登录后查看外卖订单</h3>
          <p class="but_Class">立即登录</p>
        </div>
        <div v-else>
          <h3>外卖订单</h3>
          <p class="but_Class">已登陆</p>
        </div>
      </router-link>
    </section>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['userInfo']),
    },
    components: {
      HeaderTop
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .order  //订单
    width 100%
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      h3
        padding 20px 0
        font-size 17px
        color #6a6a6a
      .but_Class
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
</style>