const model = require('../lib/model');

class FriendsController {
    friendship (req, res) {
        // console.log(req.body.id);
        model.findAll("users", { token: req.body.token })
            .then(r => {
                r = r[0];
                if (r.id === req.body.id) {
                    res.send({ error: "You can't send friendship yourself" });
                }
                else if (r.id !== req.body.id || r.length > 0) {
                    // console.log(r);
                    let obj = {
                        user1: r.id,
                        user2: req.body.id
                    }
                    model.add("requests", obj)
                    let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                                + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                                + new Date().toJSON().slice(0, 10).slice(0, 4);

                    res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը ընկերության հայտ ներկայացրեց - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                    // res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը ընկերության հայտ ներկայացրեց - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
                }
            })
    }

    friendRequests (req, res) {
        model.findAll("users", { token: req.body.token })
            .then(r => {
                r = r[0];
                return model.findRequests(r.id);               
            })
            .then(r => {
                res.send(r);
            })
    }

    friendAccept (req, res) {
        let id = req.body.id;
        let token = req.body.token;
    
        model.findAll("users", { token: token })
            .then(r => {
                r = r[0];
    
                model.add('friends', { user1: id, user2: r.id })
                    .then(rr => {
                        return  model.remove('requests', { user1: id, user2: r.id })
                    })
                    .then(rrrr => {
                        let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                                    + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                                    + new Date().toJSON().slice(0, 10).slice(0, 4);
                        res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը հաստատեց ընկերության առաջարկը ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                        // res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը հաստատեց ընկերության առաջարկը ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
                    })
            })
    }
    
    friendReject (req, res) {
        let id = req.body.id;
        let token = req.body.token;
    
        model.findAll("users", { token: token })
            .then(r => {
                r = r[0];
                model.remove('requests', { user1: id, user2: r.id })
                let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(0, 4);
                res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը մերժեց ընկերության առաջարկը ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                // res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը մերժեց ընկերության առաջարկը ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
            })
    }

    friendFriends (req, res) {
        model.findAll("users", { token: req.body.token })
            .then(r => {
                r = r[0];
                model.findFriends(r.id)
                    .then(r => {
                        res.send(r);
                    })               
            })
    }
    
    friendMessagnerfriends(req, res) {
        model.findAll("users", { token: req.body.token })
            .then(r => {
                r = r[0];
                model.findFriends(r.id, req.body.token)
                    .then(r => {
                        res.send(r);
                    })               
            })
    }

    friendRemove (req, res) {
        let id = req.body.id;
        let token = req.body.token;
        let myId = -1;
        
        model.findAll("users", { token: token })
            .then(r => {
                r = r[0];
                myId = r.id;
                model.removeMany(id, myId)
                let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(0, 4);
                res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը իր ընկերների ցանկից օգտատիրոջ է ջնջել - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                // res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը իր ընկերների ցանկից օգտատիրոջ է ջնջել - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
            })
    }

    requestCancel (req, res) {
        let id = req.body.id;
        let token = req.body.token;
    
        model.findAll("users", { token: token })
            .then(r => {
                r = r[0];
                model.remove('requests', { user1: r.id, user2: id })
                let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(0, 4);
                res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը ընկերության հայտը չեղարկեց - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                // res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը ընկերության հայտը չեղարկեց - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
            })
    }

    friendUnfriend (req, res) {
        let id = req.body.id;
        let token = req.body.token;
        let myId = -1;
        
        model.findAll("users", { token: token })
            .then(r => {
                r = r[0];
                myId = r.id;
                model.removeMany(id, myId)
                let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                            + new Date().toJSON().slice(0, 10).slice(0, 4);
                res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը իր ընկերների ցանկից օգտատիրոջ է հեռացրել - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                // res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը իր ընկերների ցանկից օգտատիրոջ է հեռացրել - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
            })
    }
}

module.exports = new FriendsController();

