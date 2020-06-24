<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
  <!-- $route代表当前路由,页面是哪个，$route就是哪个 -->
</template>

<script>
import {mapActions} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide'

export default {

  components: {
    FooterGuide
  },

  mounted () {
    //this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserInfo()
  },

  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>