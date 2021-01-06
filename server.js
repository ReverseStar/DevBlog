const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost/blogdb',{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true})


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method')) // "_method" -- deciding what to call to override our method.

app.get('/', async (req,res) => {
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index', {articles : articles})
})

app.use('/articles',articleRouter)

const port = process.env.PORT || 5000
app.listen(port)