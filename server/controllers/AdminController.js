const model = require('../lib/model');

class AdminController {
    AdminDashboard(req, res) {
        model.findAllUsers('users', 0)
        .then(r => {
            res.send(r);
        })
    }

    AdminDashboardBlock(req, res) {
        let id = req.body.id;
        model.findAll('users', { id: id })
            .then(r => {
                return model.update("users", { id: id }, { block_status: 0 })
            })
            .then(rr => {
                res.send(rr);
            })
    }

    AdminDashboardUnblock(req, res) {
        let id = req.body.id;
        model.findAll('users', { id: id })
            .then(r => {
                return model.update("users", { id: id }, { block_status: 1 })
            })
            .then(rr => {
                res.send(rr);
            })
    }
}

module.exports = new AdminController();

