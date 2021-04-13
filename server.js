if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000


const morgan = require('morgan')
app.use(morgan('dev'))

app.use(require('cors')({ origin: process.env.CLIENT_URL, credentials: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.send('Its working')
})

//Sessions
const session = require('express-session')
const MongoStore = require('connect-mongo');

//MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const toDo = mongoose.connection
toDo.on('error', error => console.log(console.error(error)))
toDo.once('open', () => console.log('Connected to mongo'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
        path: '/',
        sameSite: false,
        maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
    },
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        collection: 'sessions',
        ttl: 7 * 24 * 60 * 60,
    })
}))

//routes
const apiRouter = require('./routes/api')
app.use('/api', apiRouter)


app.listen(PORT, () => {
    console.log(`Server listten alt+click http://localhost:${PORT}/`)
})