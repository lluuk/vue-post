const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const userRouter = require('./routers/user')
const postRouter = require('./routers/post')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(postRouter)

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`)
})