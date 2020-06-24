/*
状态对象
 */
export default {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, //地址相关信息对象
  categorys: [], // 食品分类数组
  shops: [], // 商家数组
  userInfo: {}, // 用户信息
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [], // 购物车中食物的列表
  searchShops: [], // 搜索得到的商家列表
  cities: {},// 城市列表
  cityNow: {//当前城市
    city_id: JSON.parse(window.localStorage.getItem('cityNow')).city_id || 1,
    // city_id:  1,
    city_nm: JSON.parse(window.localStorage.getItem('cityNow')).city_nm || '北京',
    // city_nm: '北京',
  },

}