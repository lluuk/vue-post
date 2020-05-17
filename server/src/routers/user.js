const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const authMiddleware = require('../middlewares/auth')

const router = new express.Router()

router.post('/me', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            user,
            token
        })
    } catch (e) {
        // console.log({ e })
        res.status(400).send(e.message)
    }
})

router.post('/logout', authMiddleware, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/logoutAll', authMiddleware, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users', authMiddleware, async (req, res) => {
    try {
        let users = await User.find({})
        if (req.query.username) {
            users = users.filter(user => user.name.toLowerCase().includes(req.query.username.toLowerCase()))
        }

        if (!users) {
            return res.status(404).send()
        }

        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/me', authMiddleware, (req, res) => {
    res.send(req.user)
})

router.patch('/me', authMiddleware, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedProperties = ['name', 'email', 'password']
    const isValidOperation = updates.every(update => allowedProperties.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        })
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (err) {
        res.status(500).send()
    }
})

router.delete('/me', authMiddleware, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!new RegExp(/\.(jpg|jpeg|png)$/).test(file.originalname)) {
            cb(new Error('File should be image'))
        }
        cb(undefined, true)
    }
})

router.post('/me/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer)
        .resize({
            width: 250,
            height: 250
        })
        .png()
        .toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

router.patch('/me/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer)
        .resize({
            width: 250,
            height: 250
        })
        .png()
        .toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

router.delete('/me/avatar', authMiddleware, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


module.exports = router