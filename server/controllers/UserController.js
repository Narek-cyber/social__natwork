const model = require('../lib/model');
const uniqid = require("uniqid");
const bcrypt = require('bcrypt');

class UserController {
    add(req, res) {
        model.findAll("users", { login: req.body.login })
            .then(r => {
                let rand = Math.floor((Math.random() * 100) + 54);
                let host = req.get('host');
                let link = `http://${req.get('host')}/verify?mail=${req.body.login}&rand=${rand}&id=${rand}`;

                let mailOptions = {
                    from: 'socialnet130',
                    // to : `verdyanashxen1@gmail.com`,
                    to : `${req.body.login}`,
                    subject : "Please confirm your Email account",
                    html : `Hello,<br> Please Click on the link to verify your email.<br>
                            <a href="${link}">Click here to verify</a>
                            <br>[THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL]`
                }

                // model.sendMail(mailOptions);

                if (r.length == 0) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) throw err;
                        req.body.password = hash;
                        req.body.token = uniqid();
                        model.add("users", { login: req.body.login, password: req.body.password, name: req.body.name, surname: req.body.surname, verification_satus: 0 })
                        res.send({ success: "You have been signed up successfully" });
                    });
                } else {
                    res.send({ error: "Please choose another login!!!!" });
                }
            })
    }

    verifyEmail(req, res) {
        let host = req.get('host');
        // console.log(req.query.mail);

        if (`${req.protocol}://${req.get('host')}` == `http://${host}`) {
        // console.log("Domain is matched. Information is from Authentic email");
            if (req.query.id == req.query.rand) {
                // console.log("email is verified");
                model.findAll("users", { login: req.query.mail })
                    .then(r => {
                        model.update("users", { login: req.query.mail }, { verification_satus: 1 })
                    })
                res.end(`<h1>Email ${req.query.mail} is been Successfully verified</h1>`);
            } else {
                // console.log("email is not verified");
                res.end("<h1>Bad Request</h1>");
            }
        } else {
            res.end("<h1>Request is from unknown source");
        }
    }

    login(req, res) {
        model.findAll("users", { login: req.body.login })
            .then(r => {
                if (r[0].verification_satus == 0) {
                    return res.send({ error: "Your login is not verified!!!" });
                }

                if (r.length == 0) {
                    return res.send({ error: "Your login is wrong!!!!" });
                }
                
                else {
                    r = r[0];
                    bcrypt.compare(req.body.password, r.password, (err, result) => {
                        if (err) throw err;
                        if (!result) {
                            let count = r.block_count;
                            if (count < 3) {
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

    profile(req, res) {
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

    search(req, res) {
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

