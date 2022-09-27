const jwt = require("jsonwebtoken");
const { FAILURE_RESPONSE } = require("../common/responseBuilder");

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["access-token"] || req.headers["Authorization"];

    if (!token) {
        return res.status(403).send(FAILURE_RESPONSE("A token is required for authentication"));
    }
    try {
        const decoded = jwt.verify(token, "zerozilla");
        req.data = decoded;
    } catch (err) {
        return res.status(401).send(FAILURE_RESPONSE("Invalid Token"));
    }
    return next();
};

module.exports = verifyToken;