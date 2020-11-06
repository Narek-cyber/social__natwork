const model = require('../lib/model');
const uniqid = require("uniqid");
const bcrypt = require('bcrypt');

class UserController {
    add (req, res) {
        model.findAll("users", { login: req.body.login })
            .then(r => {
                let rand = Math.floor((Math.random() * 100) + 54);
                let host = req.get('host');
                let link = `http://${req.get('host')}/verify?id=${rand}`;

                let mailOptions = {
                    from: 'socialnet130',
                    // to : `verdyanashxen1@gmail.com`,
                    to : `${req.body.login}`,
                    subject : "Please confirm your Email account",
                    html : `Hello,<br> Please Click on the link to verify your email.<br>
                            <a href="${link}">Click here to verify</a>
                            <br>[THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL]`
                }

                model.sendMail(mailOptions);

                if (r.length == 0) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) throw err;
                        req.body.password = hash;
                        req.body.token = uniqid();
                        model.add("users", { login: req.body.login, password: req.body.password, name: req.body.name, surname: req.body.surname })
                        res.send({ success: "You have been signed up successfully" });
                    });
                } else {
                    res.send({ error: "Please choose another login!!!!" });
                }
            })
    }

    login (req, res) {
        model.findAll("users", { login: req.body.login })
            .then(r => {
                if (r.length == 0) {
                    return res.send({ error: "Your login is wrong!!!!" });
                }
                else {
                    r = r[0];
                    bcrypt.compare(req.body.password, r.password, (err, result) => {
                        if (err) throw err;
                        if (!result) {
                            let count = r.block_count;
                            if (count < 3){
                                count++
                                model.update("users", { id: r.id }, { block_count: count })
                            } else {
                                let time = Date.now() / 1000;
                                model.update("users", {id: r.id }, { block_time: time })
                            }
                            return res.send({ error: "Your password is wrong!!!!" });
                        } else {
                            if (r.block_status == 0) {
                                return res.send({error:"SORRY YOU ARE BLOOOOOCKED!"});
                            }
                            let token = uniqid();
                            let time = Date.now()/1000;
                            let diff = time - r.block_time;
                            if (diff > 600) {
                                if (r.type == 0) {
                                    let now = Math.floor((new Date().getTime())/1000);
                                    model.update("users", { id: r.id }, { active_time: now, token: token, block_count: 0, block_time: 0 })
                                        .then(a => {
                                            res.send({ success: "You have been logedin up successfully", token: token });
                                        })
                                } else if (r.type == 1) {
                                    let now = Math.floor((new Date().getTime())/1000);
                                    model.update("users", { id: r.id }, { active_time: now, token: token, block_count: 0, block_time: 0 })
                                        .then(a => {
                                            res.send({ successadmin: "You have been logedin up successfully", token: token });
                                        })
                                } 
                            } else {
                                return res.send({ error: `Your accaunt was blocked for ${Math.floor(10 - Math.floor(diff / 60))} minutes!!!!` });
                            }
                        }
                    });
                }
            })
    }

    profile (req, res) {
        let token = req.body.token;
            
        let user = model.findAll("users", { token })
                        .then(r => {
                            if (r.length == 0){
                                return res.send({ error:"NO SUCH USER!" });
                            } else {
                                r = r[0];
                                let now = Date.now() / 1000;
                                let diff = (now - r.active_time);
                                // console.log(diff);
                                if (diff > 3600) {   // 20 seconds, 3600 - 1 hour
                                    model.update("users", { id : r.id }, { active_time: 0, token: "" })
                                        .then(r => {
                                            return res.send({ error:"NO SUCH USER!" });
                                        })
    
                                } else {
                                    let token = uniqid();
                                    model.update("users", { id: r.id }, { active_time: Math.floor(Date.now() / 1000), token: token })
                                        .then(a => {
                                            res.send({ user: r, success: "You have been logedin up successfully", token: token });
                                        })
                                }
                            }
                        })
    }

    search (req, res) {
        // console.log(req.body);
        model.findUsers(req.body.text, req.body.token)
            .then(r => {
                res.send(r);
            })
    }

    allUsersList(req, res) {
        model.findAllUsersList('users')
            .then(r => {
                res.send(r);
            })
        }
}

module.exports = new UserController();

