<template>
  <div>
    <section class="profile">
      <HeaderTop>
        <a class="back" @click="$router.back()" slot="left">
          <i class="iconfont icon-arrow_left"></i>
        </a>
        <span class="header_title" slot="midtitle">
          <span class="header_title_text ellipsis">用户个人信息</span>
        </span>
      </HeaderTop>
      <section class="profile-number">
        <span class="profile-link">
          <div class="user-info">
            <p class="user-info-top">尚待开发</p>
          </div>
        </span>
      </section>
    </section>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'

export default {

  components:{
    HeaderTop,
  },
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .profile //我的
    overflow hidden
    width 100%
    a
      &.back
        position absolute
        top 10px
        left 0
        .icon-arrow_left 
          display block
          padding 5px
          font-size 20px
          color #fff
    .profile-number
      margin-top 45.5px
      .profile-link
        clearFix()
        position relative
        display block
        background #02a774
        padding 20px 10px
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
</style>