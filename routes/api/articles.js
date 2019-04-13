const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Articles = mongoose.model('Articles');

router.post('/createArticle', (req,res,next) => {

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


// GET API to fetch all the articles under given tag
router.get('/getArticles', (req,res,next) => {
    
    const { body : { tagName } } = req;

    console.log(`TagName ${tagName}`);
    
    // Query to fetch articles from Articles schema
    Articles.find({'tags.name' : tagName}, 'author content title likes comment')
        .then((articles) => {
            console.log(`Articles ${articles}`);
            // If no articles found
            if(articles == null){
                return res.status(404).json({
                    errors : {
                        content : `No articles found in given tag ${tagName}`
                    }
                });
            }

            // If articles found
            return res.status(200).json({ article });
        })

        .catch( err => {
            console.log(`Error occured while quering articles schema ${err}`);
        });

});

module.exports = router;