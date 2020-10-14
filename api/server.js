const express = require("express");
const welcome = require("../welcome/welcomeRouter");
const accountsRouter = require("../accounts/accountsRouter");

const server = express();

server.use(express.json());

server.use(welcome);
server.use("/api/accounts", accountsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server;
