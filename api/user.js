const user = {
    id: 1,
    token: Math.round(Math.random() * 100),
};

const users = [
    {
        id: 1,
        email: "jedacoding@gmail.com",
        password: "12345",
        token: "TK-285638",
    },
    {
        id: 1,
        email: "admin@gmail.com",
        password: "TK-325634",
        token: Math.round(Math.random() * 100),
    },
];

module.exports = { user, users };
