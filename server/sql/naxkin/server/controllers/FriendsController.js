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
                    res.send({ success: "OK" });
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
                        res.send({ success: "OK" });
                    })
            })
    }

    friendReject (req, res) {
        let id = req.body.id;
        let token = req.body.token;
    
        model.findAll("users", { token: token })
            .then(r => {
                r = r[0];
                return  model.remove('requests', { user1: id, user2: r.id })
            })
            .then(r=>{
                res.send({ success: "OK" });
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
                return  model.remove('friends', { user1: id, user2: myId })
            })
            .then(r => {
                if (r.affectedRows == 0) {
                    return  model.remove('friends', { user2: id, user1: myId })
                } 
            })
            .then(r => {
                res.send({ success:"OK" });
            })
    }

    requestCancel (req, res) {
        let id = req.body.id;
        let token = req.body.token;
    
        model.findAll("users", { token: token })
            .then(r => {
                r = r[0];
                return  model.remove('requests', { user1: r.id, user2: id })
            })
            .then(r=>{
                res.send({ success: "OK" });
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
                return  model.remove('friends', { user1: id, user2: myId })
            })
            .then(r => {
                if (r.affectedRows == 0) {
                    return  model.remove('friends', { user2: id, user1: myId })
                } 
            })
            .then(r => {
                res.send({ success:"OK" });
            })
    }
}

module.exports = new FriendsController();

