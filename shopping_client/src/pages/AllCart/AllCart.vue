<template>
  <div style="overflow:hidden;">
    <HeaderTop>
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont icon-arrow_left"></i>
      </a>
      <span class="header_title" slot="midtitle">
       <span class="header_title_text ellipsis">购物车</span>
      </span>
    </HeaderTop>
    <div class="all-cart" >
      <ul class="all-cart-shops" v-if="cartFoods.length">
        <li class="all-cart-shop">
          <div class="shop-title">
            <span class="switch" :class="{on:allSelected}" @click="toggleAllSelect">
              <span class="iconfont icon-check_circle "></span>
            </span>
            <span class="shop-name">店铺名称</span>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <ul class="food-list">
            <li class="food" v-for="(cartFood , index) in cartFoods" :key="index" >
              <span class="switch" :class="{on : cartFood.selected}" @click="toggleSelect(cartFood)">
                <span class="iconfont icon-check_circle "></span>
              </span>
              <span class="food-detail">
                <img v-lazy="cartFood.icon" alt="1">
                <div class="food-detail-right">
                  <span class="top">{{cartFood.name}}</span>
                  <div  class="bottom">
                    <span class="bottom-left">x{{cartFood.count}}</span>
                    <span class="bottom-right">
                      <span class="old">{{cartFood.oldPrice ? "￥" + cartFood.oldPrice : ""}}</span>
                      <span class="now">￥{{cartFood.price}}</span>
                    </span>
                  </div>
                </div>

              </span>
            </li>

          </ul>
          <div class="submit">
            <div class="left">已优惠  {{oldPrice}} 元</div>
            <span class="right">
              <span class="total-price">￥{{allPrice}}</span>
              <a href="javascript:;" class="submit-btn">去结算</a>
            </span>

          </div>
        </li>

      </ul>

      <!--丑是丑了点，主要是懒得加图片，改样式了-->
      <div v-else @click="$router.back()" class="noFood">
        暂时没有加购食物，点击前往首页加购
      </div>
    </div>
  </div>
</template>

<script type='es6'>
import { MessageBox } from 'mint-ui'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
export default {
  components: {
    HeaderTop
  },
  computed: {
    // 因为是mock的数据，所以结构是不对的，应该每个都有对应的店铺，再进行遍历的，反正暂时先这样吧
    ...mapState(['cartFoods']),
    allPrice () {
      return this.cartFoods.reduce((preTotal, cartFood) => preTotal + cartFood.price, 0)
    },
    oldPrice () {
      const cheap = this.cartFoods.reduce((preTotal, cartFood) => preTotal + cartFood.oldPrice, 0) - this.allPrice
      return cheap > 0 ? cheap : 0
    },
    allSelected () {
      const trueCount = this.cartFoods.reduce((pretotal, food) => {
        return pretotal + (food.selected ? 1 : 0)
      }, 0)
      return trueCount === this.cartFoods.length
    }

  },

  methods: {
    toggleSelect (food) {
      this.$store.dispatch('setFoodSelect', food)
    },
    toggleAllSelect () {
      this.$store.dispatch('setFoodSelect', 0)
    },
    clearCart () {
      MessageBox.confirm('确定清空购物车吗?').then(action => {
        this.$store.dispatch('clearCart')
      }, () => {});
    }
  },

  mounted () {
    this.$nextTick(() => {
      // eslint报错 Do not use 'new' for side effects，即需要实例化，不能new后不接收,而且不能直接声明式赋值，因为如果没有用到该实例，又会出现新的错误 声明未使用
      this.scroll = new BScroll('.all-cart')
    })
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixins.styl'
  .back
    display inline-block
    height 100%
    .iconfont
      display inline-block
      font-size 20px
      color white
      padding 10px

  .all-cart
    margin-top 45px
    background-color #F3F3F3
    height 622px
    overflow hidden
    .all-cart-shops
      padding 5px 0
      .all-cart-shop
        width 350px
        margin 20px auto
        /*padding 5px*/

        .shop-title
          display flex
          padding 5px
          background #FBFAFA
          border-radius 10px 10px 0 0
          .switch
            .iconfont
              font-size 20px
            &.on
              .icon-check_circle
                color $green
          .shop-name
            font-size 17px
            align-self center
            margin-left 5px
          .empty
            margin-left 200px
            align-self center
            font-size 17px
            color rgb(0, 160, 220)
        .food-list
          background-color white
          .food
            display flex
            padding 10px 20px
            .switch
              float left
              align-self center
              .iconfont
                font-size 20px
              &.on
                .icon-check_circle
                  color $green

            .food-detail
              img
                width 50px
                height 50px
                float left
                margin 0 10px
              .food-detail-right
                position relative
                height 50px
                width 200px
                float:left
                align-self center
                font-size 15px
                .top
                  font-weight bold
                .bottom
                  position absolute
                  width 100%
                  bottom 0
                  color grey
                .bottom-left
                  font-size 13px
                  float left
                .bottom-right
                  float right
                  .old
                    text-decoration: line-through
                    font-size 11px
                  .now
                    font-size 14px
                    font-weight 500
                    color #000000
        .submit
          height 40px
          width 100%
          background white
          border-radius 0 0 10px 10px
          line-height 40px
          .left
            margin-left 10px
            float left
          .right
            float right
            .submit-btn
              margin 0 10px
              display inline-block
              background #02A774
              color white
              height 30px
              line-height 30px
              border-radius 10px
              padding 0 3px
    .noFood
      text-align center
      margin-top 50px

</style>
