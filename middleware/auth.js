const jwt = require("jsonwebtoken");
// local file
const Student = require("../models/student");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const data = jwt.verify(token, process.env.SECRET_KEY);

        const studentData = await Student.findOne({ _id: data._id });

        req.token = token;
        req.student = studentData;
        next();
    } catch (error) {
        res.status(401).json(error);
    }
}

module.exports = auth;