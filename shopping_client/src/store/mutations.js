/**
 * 直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
  RECEIVE_CITIES,
  RECEIVE_CITY_NOW,
  SET_FOOD_SELECT,
  RELINK_FOODS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },

  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },

  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [INCREMENT_FOOD_COUNT](state, {food}) {
    if(!food.count) { // 第一次增加
      // food.count = 1  // 新增属性(没有数据绑定)
      /*
      对象
      属性名
      属性值
       */
      Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定,即数据改变，页面改变
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if(food.count) {// 只有有值才去减
      food.count--
      if(food.count===0) {
        // 将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART](state) {
    // 清除food中的count
    state.cartFoods.forEach(food => food.count = 0)
    // 移除购物车中所有购物项
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },  

  [RECEIVE_CITIES](state, {cities}) {
    state.cities = cities
  },    

  [RECEIVE_CITY_NOW](state, {cityNow}) {
    state.cityNow = cityNow
  },
  
  [SET_FOOD_SELECT] (state, flag) {
    if (flag) {
      flag.selected = !flag.selected
    } else {
      let trueCount = state.cartFoods.reduce((pretotal, food) => {
        return pretotal + (food.selected ? 1 : 0)
      }, 0)
      if (!trueCount || trueCount === state.cartFoods.length) {
        state.cartFoods.forEach((food, index) => { food.selected = !food.selected })
      } else {
        state.cartFoods.forEach((food, index) => { food.selected = true })
      }
    }
  },

  [RELINK_FOODS] (state) {
    // localstorage存值取值的这一过程是进行深拷贝的，所以购物车和shopFoods就不关联了
    //  所以只能重新循环重新push进去了
    for (let i = 0; i < state.shopGoods.length; i++) {
      for (let k = 0; k < state.shopGoods[i].foods.length; k++) {
        for (let h = 0; h < state.cartFoods.length; h++) {
          // 这里其实最好用id因为是唯一标示，但是因为mock的数据中并没有加上id，所以只能用name替代
          // mock数据没有id，同名但不是同一个食物，实际接口应该是同id同食物
          if (state.shopGoods[i].foods[k].name === state.cartFoods[h].name && state.shopGoods[i].foods[k].count) {
            // console.log('--------', state.shopGoods[i].foods[k])
            state.cartFoods.splice(h, 1, state.shopGoods[i].foods[k])
          }
        }
      }
    }
  }
}