const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Articles = mongoose.model('Articles');

router.post('/createArticle', auth.required, (req,res,next) => {

    const { body : { article }} = req;

    if(!article.title){
        return res.status(422).json({
            errors : {
                title : 'is required',
            }
        });
    }

    if(!article.content){
        return res.status(422).json({
            errors : {
                content : 'is required',
            }
        });
    }

    const finalArticle = new Articles(article);

    return finalArticle.save()
        .then((article) => res.json({ article }));
});