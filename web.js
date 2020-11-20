const express = require(`express`)
const mongoose = require(`mongoose`)
const bodyParser = require(`body-parser`)
const ejs = require(`ejs`)

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(`public`))
app.set(`view engine`, `ejs`)

// mongoose.connect("mongodb://localhost:27017/productDB", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.connect("mongodb+srv://TmAdmin:magigingfreelancerako72215@cluster0.c7khy.mongodb.net/productDB", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const signUpSchema = new mongoose.Schema ({
    id: Number,
    email: String
})

const msgSchema = new mongoose.Schema ({
    id: Number,
    name: String,
    email: String
})

const newsLetter = mongoose.model(`newsLetter`, signUpSchema)

const messages = mongoose.model(`message`, msgSchema)




app.get(`/`, function(req, res){
    res.render(`index`)
})

app.post(`/`, function(req, res){
    const emailAdd = req.body.visiEmail

    const signUp = new newsLetter ({
        email: emailAdd
    })

    signUp.save()

    res.redirect(`/`)
})

app.get(`/products`, function(req, res){
    res.render(`products`)
})

app.get(`/contact`, function(req, res){
    res.render(`contact`)
})

app.post(`/contact`, function(req, res){
    const names = req.body.name
    const emails = req.body.emailMan

    const mess = new messages ({
        name: names,
        email: emails
    })

    mess.save()

    res.redirect(`/contact`)
})

app.listen(3000,function(){
    console.log(`Server is running`)
})