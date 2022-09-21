const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3500;
const { users } = require("./user");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

function verifyUser(req, res, next) {
    const bearer = req.headers.bearer;
    jwt.verify(bearer, "secret", (err, data) => {
        if (err) {
            res.status(500);
            return res.json(err);
        }

        req.body = data;
        next();
    });
}

app.get("/", (req, res) => {
    res.send("Aplikasi telah dijalankan...");
});

app.get("/posts", verifyUser, (req, res) => {
    res.json([
        {
            id: 1,
            title: "Post 1",
        },
        {
            id: 2,
            title: "Post 2",
        },
    ]);
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    let user = users.find((u) => u.email == email);

    if (user) {
        if (password == user.password) {
            user = { id: user.id, token: user.token };

            jwt.sign(user, "secret", (err, token) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(304);
                }
                res.json({
                    message: "Your login success!",
                    token,
                });
            });
        } else {
            res.status(500);
            res.send("password not match!");
        }
    } else {
        res.status(500);
        res.send("user not found!");
    }
});

app.listen(port, () => console.log(`listening on port ${port}...`));
