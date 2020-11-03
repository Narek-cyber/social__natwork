const model = require('../lib/model');

class OtherUserController {
    OtherUserProfile (req, res) {
        let id = req.params.id
        // console.log(id);
        // console.log(req.body);   
        let myid;

        model.findAll("users", { token: req.body.token })
            .then(r => {
                r = r[0];
                myid = r.id;
                if (myid == id){
                    return res.send({error:"same person"})
                }
                return  model.findAll("users", { id: id })
            })
            .then(r => {
                if (r.length == 0) {
                    return res.send({ error: "NO SUCH USER!" });
                } else if (r.length > 0) {
                    r = r[0];
                    return res.send({ user: r, success: "You found the user successfully!!!" });
                }
            })
    }

    OtherUserPosts(req, res) {
        let id = req.params.id;

        model.findAll("users", { id: id })
            .then(r=>{
                r = r[0];
                return  model.findAll('posts', { user_id: id })
            })   
            .then(r => {
                res.send(r);
            })
    }

    SharePost(req, res) {
        let id = req.body.id;
        let token = req.body.token;
        let index = req.body.index;
        model.findAll("users", { id: id })
            .then(r => {
                r = r[0];
                model.findAll('posts', { user_id: id })
                    .then(rr => {
                        model.findAll("users", { token })
                            .then(a => {
                                a = a[0];
                                model.add("posts", { text: rr[index].text, content: rr[index].content, user_id: a.id  })
                                if (a.id == id) {
                                    let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                                                + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                                                + new Date().toJSON().slice(0, 10).slice(0, 4);
                                    res.send({ success: 'post was shared', notification: `${a.name} ${a.surname} -ը կիսվեց իր հրապարակումով - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                                    // res.send({ success: 'post was shared', notification: `${a.name} ${a.surname} -ը կիսվեց իր հրապարակումով - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
                                } else {
                                    let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                                                + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                                                + new Date().toJSON().slice(0, 10).slice(0, 4);                      
                                    res.send({ success: 'post was shared', notification: `${a.name} ${a.surname} -ը կիսվեց ${r.name} ${r.surname} -ի հրապարակումով - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                                    // res.send({ success: 'post was shared', notification: `${a.name} ${a.surname} -ը կիսվեց ${r.name} ${r.surname} -ի հրապարակումով - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
                                }
                                
                            })
                    })
            })   
        }
} 

module.exports = new OtherUserController();

