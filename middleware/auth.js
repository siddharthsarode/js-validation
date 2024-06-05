const jwt = require("jsonwebtoken");
// local file
const Student = require("../models/student");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const data = jwt.verify(token, process.env.SECRET_KEY);
        console.log(data);

        const studentData = await Student.findOne({ _id: data._id });
        console.log(studentData);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
}

module.exports = auth;