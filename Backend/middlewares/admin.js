const { Admin } = require("Database\database.js")

function adminMiddleware(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({
        username: username,
        password: password
    })
        .then(function (value) {
            if (value) {
                next();
            }
            else {
                res.status(403).json({
                    message: "Admin doesnot exist"
                })
            }
        })
}

module.exports = adminMiddleware;