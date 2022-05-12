const mongoose = require("mongoose")
var validator = require('validator')
const signup_schema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value))
				throw new Error("Email Invalid");
		}
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	}
})

const register = new mongoose.model("Register", signup_schema)
module.exports = register