const model = require('../lib/model');
const fs = require('fs');

class PostsController {
    UserPosts (req, res) {
        let token = req.body.token;
        model.findAll("users", { token })
            .then(r=>{
                r = r[0]
                return  model.findAll('posts', { user_id: r.id })
            })   
            .then(r => {
                res.send(r);
            })
    }

    UserPostsDelete (req, res) {
        let token = req.body.token;
        model.findAll("users", { token })
            .then(r=>{
                r = r[0];
                fs.unlink(`./images/${req.body.content}`, (err) => {
                    if (err) throw err;
                });
                return  model.remove('posts', { id: req.body.postId })
            })   
            .then(r => {
                res.send(r);
            })
    }

    UploadMyPosts (req, res) {
        let token = req.body.user;
        /*
            token => user_id
            req.file.filename => anun
            req.body.text => text
        */
        model.findAll("users", { token })
            .then(r => {
                if (r.length > 0) {
                    r = r[0];
                    model.add("posts", { user_id: r.id, text: req.body.text, content: req.file.filename })
                        .then(rr => {
                            res.send({ success: 'Ok' })
                        })

                }
            })
        }
}

module.exports = new PostsController();

