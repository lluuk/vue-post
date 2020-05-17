const express = require('express')
const Post = require('../models/post')
const authMiddleware = require('../middlewares/auth')

const router = new express.Router()

router.post('/post', authMiddleware, async (req, res) => {
    try {
        const post = new Post(req.body)
        post.author = req.user
        await post.save()
        res.send(post)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/post', authMiddleware, async (req, res) => {
    try {
        let posts = await Post.find({})
        if (req.query.title) {
            posts = posts.filter(post => post.title.toLowerCase().includes(req.query.title.toLowerCase()))
        }
        if (!posts) {
            return res.status(404).send()
        }

        res.send(posts)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/post/me', authMiddleware, async (req, res) => {
    try {
        await req.user.populate({ path: 'posts' }).execPopulate()
        res.send(req.user.posts)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/post/:id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
            .populate('author')
            .exec()
        
        if (!post) {
            return res.status(404).send()
        }
        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/post/:id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({
            _id: req.params.id
        })

        if (!post) {
            return res.status(404).send()
        }
        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router