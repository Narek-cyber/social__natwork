const model = require('../lib/model');

class NotificationController {
    ShowNotifications(req, res) {
        let token = req.body.token;
        // console.log(req.body);
        model.findAll('users', { token })
            .then(r => {
                r = r[0];
                model.findAll('notifications', { user1: r.id })
                    .then(r => {
                        res.send(r);
                    })
            })
    }
}

module.exports = new NotificationController();
