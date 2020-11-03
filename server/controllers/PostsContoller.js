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
                model.remove('posts', { id: req.body.postId })
                let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(0, 4);
                res.send({ success: 'Ok', notification: `${r.name} ${r.surname} -ը իր հրապարակումներից մեկը հեռացրեց - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` })
                // res.send({ success: 'Ok', notification: `${r.name} ${r.surname} -ը իր հրապարակումներից մեկը հեռացրեց - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` })
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
                    let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                                + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                                + new Date().toJSON().slice(0, 10).slice(0, 4);
                    res.send({ success: 'Ok', notification: `${r.name} ${r.surname} -ը նոր հրապարակում կատարեց - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` })
                    // res.send({ success: 'Ok', notification: `${r.name} ${r.surname} -ը նոր հրապարակում կատարեց - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` })
                }
            })
        }
}

module.exports = new PostsController();

