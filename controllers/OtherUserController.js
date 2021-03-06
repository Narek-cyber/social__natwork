const model = require('../lib/model');

class OtherUserController {
    OtherUserProfile(req, res) {
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

                                let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                                + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                                + new Date().toJSON().slice(0, 10).slice(0, 4);

                                model.add("posts", {
                                    text: rr[index].text, 
                                    content: rr[index].content, 
                                    user_id: a.id, 
                                    post_status: 1,
                                    time: `${nDate} ${new Date().toTimeString().replace(/ .*/, '')}`,
                                })

                                model.findAll('posts', { user_id: a.id }) 
                                    .then(t => {
                                        // console.log(t);
                                        if (a.id == id) {
                                            model.update("posts", { id: t[t.length - 1].id }, { notification: `???????? ???????????????? ?????? ?????????????????????????? -`, note_type: 2 })
                                        } else {
                                            model.update("posts", { id: t[t.length - 1].id }, { notification: `???????? ???????????????? ${r.name} ${r.surname} -?? ?????????????????????????? -`, note_type: 3 })
                                        }
                                    })

                                // console.log(rr[rr.length - 1].id);

                                // if (a.id == id) {
                                //     let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                                //                 + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                                //                 + new Date().toJSON().slice(0, 10).slice(0, 4);
                                //     res.send({ success: 'post was shared', notification: `${a.name} ${a.surname} -?? ???????????? ???? ?????????????????????????? - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                                //     // res.send({ success: 'post was shared', notification: `${a.name} ${a.surname} -?? ???????????? ???? ?????????????????????????? - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
                                // } else {
                                //     let nDate = new Date().toJSON().slice(0, 10).slice(8, 10) + '/'  
                                //                 + new Date().toJSON().slice(0, 10).slice(5, 7) + '/'  
                                //                 + new Date().toJSON().slice(0, 10).slice(0, 4);                      
                                //     res.send({ success: 'post was shared', notification: `${a.name} ${a.surname} -?? ???????????? ${r.name} ${r.surname} -?? ?????????????????????????? - ${nDate} ${new Date().toTimeString().replace(/ .*/, '')}` });
                                //     // res.send({ success: 'post was shared', notification: `${a.name} ${a.surname} -?? ???????????? ${r.name} ${r.surname} -?? ?????????????????????????? - ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} ${new Date().toTimeString().replace(/ .*/, '')}` });
                                // }
                                
                            })
                    })
            })   
    }

    // OtherUserFriends(req, res) {
    //     let id = req.params.id;
    //     model.findAll("users", { id: id })
    //         .then(r => {
    //             r = r[0];
    //             model.findFriends(r.id)
    //                 .then(rr => {
    //                     res.send(rr);
    //                 })               
    //     })
    // }

    OtherUserFriends(req, res) {
        let id = req.params.id;
        model.findUsers1(req.body.token, id)
            .then(r => {
                res.send(r);
            })
    }


    chatRoom(req, res) {
        let token = req.body.token;
        model.findAll("users", { token })
            .then(r => {
                r = r[0]
                let obj = {
                    user1: r.id,
                    user2: req.params.id
                }
                model.add("chatroom", obj)
                    .then(r => {
                        res.send({ success: 'ok' })
                    })
            })
    }

    chatRoomUsers(req, res) {
        let token = req.body.token;
        model.findAll("users", { token })
            .then(r => {
                r = r[0];
                model.findChatRoomUsers(r.id)
                    .then(r => {
                        res.send(r);
                    })               
            })
    }
} 

module.exports = new OtherUserController();
