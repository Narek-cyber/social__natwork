const model = require('../lib/model');

class MessagesController {
    sendmessage(req, res) {
        let id = req.body.id;
        let token = req.body.token;
        let myId = -1;
        model.findAll("users", { token: token })
            .then(r => {
                r = r[0];
                myId = r.id;
                return  model.add('chat', { user2: id, user1: myId, text: req.body.text, status: 0 })
            })
            .then(r => {
                if (r.affectedRows == 0) {
                    return  model.add('chat', { user1: id, user2: myId, text: req.body.text, status: 0 })
                } 
            })
            .then(r => {
                res.send({ success:"OK" });
            })
    }

    getMessages(req, res) {
        // console.log(req.body)
        let token = req.body.token;
        model.findAll("users", {token})
            .then(r=>{
                if(r.length){
                    r = r[0];
                    let id = r.id;

                    return model.getMessages(id, req.body.id)
                }
            })
            .then(r=>{
                res.send({messages:r})
            })
    }

    searchMessenger(req, res) {
        model.findUsers(req.body.text, req.body.token)
        .then(r => {
            res.send(r);
        })
    }
    
}

module.exports = new MessagesController();

