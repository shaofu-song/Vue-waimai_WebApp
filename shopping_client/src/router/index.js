/**
 * 路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import cityRouter from './city/city'
import adminRouter from './admin/admin'

// import MSite from '../pages/MSite/MSite'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
// import Search from '../pages/Search/Search'

// 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
const MSite = () => import('../pages/MSite/MSite')
const Search = () => import('../pages/Search/Search')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')
const EmailProfile = () => import('../pages/EmailProfile/EmailProfile')
const UserInfo = () => import('../pages/UserInfo/UserInfo')
// const City = () => import('../pages/City/City')


import Login from '../pages/Login/Login'
import EmailLogin from '../pages/EmailLogin/EmailLogin'
import EmailRegister from '../pages/EmailRegister/EmailRegister'
import EmailFindPwd from '../pages/EmailFindPwd/EmailFindPwd'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import AllCart from '../pages/AllCart/AllCart'

//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  //所有路由
  //meta默认是空对象
  routes: [
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/emailProfile',
      component: EmailProfile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/userInfo',
      component: UserInfo,
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/emailLogin',
      component: EmailLogin
    },
    {
      path: '/emailRegister',
      component: EmailRegister
    },
    {
      path: '/emailFindPwd',
      component: EmailFindPwd
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
    {
      path: '/allcart',
      component: AllCart
    },
    adminRouter,
    cityRouter,
  ]
})
