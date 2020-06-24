var mongoose = require('mongoose');
var {Head} = require('../db/models')
var url = require('url');

mongoose.set('useCreateIndex',true);

var EmailUserSchema = new mongoose.Schema({
	username : { type : String , required : true , index : { unique : true } },
	password : { type : String , required : true },
	email : { type : String , required : true , index : { unique : true } },
	date : { type : Date , default : Date.now() },
	isAdmin : { type : Boolean , default : false },
	isFreeze : { type : Boolean , default : false },
	userHead : { type : String , default : url.resolve(Head.baseUrl , 'default.jpg') }
});

var EmailUserModel = mongoose.model('emailuser' , EmailUserSchema);
EmailUserModel.createIndexes();

var save = (data)=>{
	var user = new EmailUserModel(data);
	return user.save()
		   .then(()=>{
		   		return true;
		   })
		   .catch(()=>{
		   		return false;
		   });
};

var findLogin = (data)=>{
	return EmailUserModel.findOne(data);
}

var updatePassword = (email , password)=>{
	return EmailUserModel.update({email} , { $set : { password } })
		   .then(()=>{
		   		return true;
		   })
		   .catch(()=>{
		   		return false;
		   });
}

var usersList = ()=>{
	return EmailUserModel.find();
}

var updateFreeze = (email , isFreeze)=>{
	return EmailUserModel.update({email} , { $set : { isFreeze } })
		   .then(()=>{
		   		return true;
		   })
		   .catch(()=>{
		   		return false;
		   });
}

var deleteUser = ( email )=>{
	return EmailUserModel.deleteOne({ email });
}

var updateUserHead = ( username , userHead ) => {
	return EmailUserModel.update({username} , { $set : { userHead } })
		   .then(()=>{
		   		return true;
		   })
		   .catch(()=>{
		   		return false;
		   });
}

module.exports = {
	save,
	findLogin,
	updatePassword,
	usersList,
	updateFreeze,
	deleteUser,
	updateUserHead
};