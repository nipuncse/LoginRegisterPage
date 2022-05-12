const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
require("./db/conn.js")
const Register = require("./models/registers")

const port = process.env.PORT || 4000
const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../template/views")
const partial_path = path.join(__dirname, "../template/partials")
// const images_path = path.join(__dirname, "../public/css/images")

app.use(express.static('public'))
// app.use(express.static(static_path))
// app.use(express.static(images_path))

app.set("view engine", "hbs")
app.set("views", template_path)

app.use(express.urlencoded({ extended: false }))

hbs.registerPartials(partial_path)

app.get('/', (req, res) => {
	res.render("index")
})
app.post('/register', async (req, res) => {
	// res.redirect('https://google.com');
	try {
		const user = req.body.username
		const pass = req.body.password
		// console.log(user, pass)
		const usern = await Register.findOne({ username: user })
		// console.log(usern.password)

		if (pass === usern.password)
			res.send("succesful login")

		else
			res.send("login failed")
	}
	catch (err) {
		console.log(err)
	}
})

app.get('/register', (req, res) => {
	res.render("register")
})

app.post('/', async (req, res) => {
	// console.log(req.body)
	try {
		const email = req.body.email
		const username = req.body.username
		const password = req.body.password
		// console.log(email, username, password)
		const registerEmp = new Register({
			email: email,
			username: username,
			password: password
		})

		const registered = await registerEmp.save()
		res.status(201).render('index')
	}
	catch (error) {
		console.log(error)
		res.send(error)
	}
})

app.listen(port, (req, res) => {
	console.log(`This is server is running at port ${port}`);
})