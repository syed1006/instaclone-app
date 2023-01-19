const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    PostImage:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
    location:{
        type: String,
        default: 'Restricted'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;