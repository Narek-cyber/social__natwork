const model = require('../lib/model');
const uniqid = require("uniqid");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class SettingsController {
    changeLogin(req, res) {
        let token = req.body.token;
        // console.log(token);
        model.findAll("users", { token })
            .then(r => {
                model.update("users", { id: r.id }, { active_time: Math.floor(Date.now() / 1000), token: token })
                if (r.length == 0) {
                    res.send({ error: "No such user" });
                } else {
                    r = r[0];
                    bcrypt.compare(req.body.data.password, r.password, (err,data) => {
                        if (err) throw err;
                        if (!data) {
                            res.send({ error: "Password դաշտը սխալ է լրացված" });
                        } else {
                            model.findAll("users", { login:req.body.data.login })
                                .then(rr => {
                                    if (rr.length > 0){
                                        res.send({ error: "login -ը զբաղված է" });
                                    } else {
                                        model.update("users", {id: r.id }, { login: req.body.data.login })
                                            .then(result => {
                                                res.send({ user: r, success: "Login -ը հաջողությամբ թարմացվեց", token: token  })
                                            })
                                    }
                                })
                        }
                    })
                }
        })
    }

    changePassword(req, res) {
        let token = req.body.token;
        // console.log(req.body.data.newPassword);
        model.findAll("users", { token })
            .then(r => {
                r = r[0];
                bcrypt.compare(req.body.data.oldPassword, r.password, (err, data) => {
                    if (err) throw err;
                    if (!data) {
                        res.send({ error: "Password դաշտը սխալ է լրացված" });
                    } else {
                        bcrypt.hash(req.body.data.newPassword, saltRounds, (err, hash) => {
                            if (err) throw err;
                            req.body.data.newPassword = hash;
                            req.body.token = uniqid();

                            model.findAll("users", { token })
                                    .then(rr => {
                                        let now = Math.floor((new Date().getTime())/1000);
                                        model.update("users", { id: r.id }, { active_time: now, token: token, password: req.body.data.newPassword })
                                            .then(a => {
                                                res.send({ success: "Password -ը հաջողությամբ թարմացվեց", r });
                                            })
                                    })
                        })
                    }
                })
            })
    }

    UploadUserPic(req, res) {
        let token = req.body.user;
        model.findAll("users", { token })
            .then(r => {
                 if(r.length > 0) {
                    r = r[0];
                    let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                    + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                    + new Date().toJSON().slice(0, 10).slice(0, 4);

                    model.update("users", { id: r.id }, { photo: req.file.filename })
                        .then(rr => {
                            model.add('notifications', {
                                user1: r.id,
                                notification: `Դուք փոխեցիք ձեր գլխավոր էջի նկարը`,
                                time: `${nDate} ${new Date().toTimeString().replace(/ .*/, '')}`,
                                note_type: 0,
                                myphoto: req.file.filename
                            })

                            model.findAll('notifications', { note_type: 0 })
                                .then(r => {
                                    res.send({ success: "OK", r });
                                })

                            // let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                            //             + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                            //             + new Date().toJSON().slice(0, 10).slice(0, 4);
                            // res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը փոխեց իր գլախվոր էջի նկարը - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                            // res.send({ success: "OK", notification: `${r.name} ${r.surname} -ը փոխեց իր գլախվոր էջի նկարը - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
                        })
                }
            })
    }
}

module.exports = new SettingsController();




