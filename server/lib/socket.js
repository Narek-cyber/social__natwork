const model = require('./model');

class Socket {
    constructor(socket) {
        this.socket = socket;
        this.socket.on("startChat", (data) => this.getMessages(data));
        this.socket.on("norNamak", (data) => this.addMessage(data));

        this.socket.on("startComment", (data) => this.getCommentMessages(data));
        this.socket.on("newComment", (data) => this.addCommentMessage(data));

        this.socket.on("startOtherComment", (data) => this.getOtherMessages(data));
        this.socket.on("newOtherComment", (data) => this.addOtherMessage(data));
    }

    getMessages(data) {
        model.findAll("users", { token: data.me })
            .then(r => {
                if(r.length > 0) {
                    r = r[0];
                    return model.getMessages(r.id, data.id)
                }
            })
            .then(r => {
                this.socket.emit("vekalNamakner", r)
            })
    }

    addMessage(data) {
        let myid;
        model.findAll("users", { token: data.token })
            .then(r => {
                if (r.length > 0) {
                    r = r[0];
                    myid = r.id;
                    return model.add("chat", { user1: r.id, user2: data.id, text: data.text, status: 0 })
                }
            })
            .then(r => {
                model.getMessages(myid, data.id)
                    .then(r => {
                        this.socket.broadcast.emit("norNamak", r);
                        this.socket.emit("norNamak", r);
                    })
            })
    }

    getCommentMessages(data) {
        model.findAll("users", { token: data.me })
            .then(r => {
                if(r.length > 0) {
                    r = r[0];
                    return model.getCommentMessages(r.id, data.id, data.post_id)
                }
            })
            .then(r => {
                this.socket.emit("takeComment", r)
            })
    }

    addCommentMessage(data) {
        let myid;
        model.findAll("users", { token: data.token })
            .then(r => {
                if (r.length > 0) {
                    r = r[0];
                    myid = r.id;
                    return model.add("comments", { user1: r.id, user2: data.id, post_id: data.post_id, comment: data.text })
                }
            })
            .then(r => {
                model.getCommentMessages(myid, data.id, data.post_id)
                    .then(r => {
                        this.socket.broadcast.emit("newComment", r);
                        this.socket.emit("newComment", r);
                    })
            })
    }

    getOtherMessages(data) {
        model.findAll("users", { token: data.me })
            .then(r => {
                if(r.length > 0) {
                    r = r[0];
                    return model.getOtherMessages(r.id, data.id, data.post_id)
                }
            })
            .then(r => {
                this.socket.emit("takeOtherComment", r)
            })
    }

    addOtherMessage(data) {
        let myid;
        model.findAll("users", { token: data.token })
            .then(r => {
                if (r.length > 0) {
                    r = r[0];
                    myid = r.id;
                    return model.add("comments", { user1: r.id, user2: data.id, post_id: data.post_id, comment: data.text })
                }
            })
            .then(r => {
                model.getOtherMessages(myid, data.id, data.post_id)
                    .then(r => {
                        this.socket.broadcast.emit("newOtherComment", r);
                        this.socket.emit("newOtherComment", r);
                    })
            })
    }
}

module.exports = Socket;