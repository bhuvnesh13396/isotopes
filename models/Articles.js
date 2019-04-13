const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
    
    author : {
        name : {
            type : String,
            required : true
        },

        profilePhoto : {
            type : String
        }
    },
    
    tags : [{
        name : {
            type : String
        }
    }],

    content : {
        type : String,
        required : true,
    },

    title : {

        titleText : {
            type : String,
            required : true
        },

        subTitle : {
            type : String,
        }
    },

    likes : {
        
        likesCount : {
            type : Number
        },

        likedBy : [{
            type : mongoose.Schema.Types.ObjectId, ref : 'Users'
        }]
    },

    comment : [{
      text : {
          type : String,
          required : true
      },
      
      commentBy : {
          userId : {
              type : mongoose.Schema.Types.ObjectId, ref : 'Users'
          }
      }
      
    }]

});

mongoose.model('Articles', ArticleSchema);