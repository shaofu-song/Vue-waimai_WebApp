/*
包含n个能操作mongodb数据库集合的model的模块
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 定义对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 向外暴露获取Model的方法
 */
var nodemailer = require('nodemailer');

// 1. 连接数据库
const mongoose = require('mongoose')
const DB_URL = 'localhost:27017'
const DB_NAME = 'jianyi_waimai'
mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`)
const conn = mongoose.connection
conn.on('connected', function () {
  console.log(`位于${DB_URL}上的${DB_NAME}数据库连接成功!`)
})

// 2. 得到对应特定集合的Model: UserModel
const userSchema = mongoose.Schema({
  // 用户名
  'name': {type: String},
  // 密码
  'pwd': {type: String},
  // 类型
  'phone': {'type': String}
})
UserModel = mongoose.model('user', userSchema)

var Email = {
	config : {
		host: "smtp.qq.com",
	    port: 587,
	    auth: {
	      user: '3478162259@qq.com', 
	      pass: 'golujwjkbtzodbja'
	    }
	},
	get transporter(){
		return nodemailer.createTransport(this.config);
	},
	get verify(){
		return Math.random().toString().substring(2,8);
	},
	get time(){
		return Date.now();
	}
};

var Head = {
	baseUrl : 'http://localhost:3000/uploads/'
}

// 3. 向外暴露
module.exports = {
  getModel(name) {
    return mongoose.model(name)
  },
  Email,
  Head
}

