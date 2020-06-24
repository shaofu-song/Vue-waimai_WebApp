/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import shopData from './shop_data.json'
import cityData from './city_data.json'

// 返回goods的接口
Mock.mock('/goods', {code:0, data: shopData.goods})
// 返回ratings的接口
Mock.mock('/ratings', {code:0, data: shopData.ratings})
// 返回info的接口
Mock.mock('/info', {code:0, data: shopData.info})
//返回citys的接口
Mock.mock('./city', {code:0, data: cityData.cities})


// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可