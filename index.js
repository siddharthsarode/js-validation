require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

// Local Files
require("./database/config");
const Student = require("./models/student");
const auth = require("./middleware/auth");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, './views/partials'));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/registration", (req, res) => {
    res.render("registration");
});

app.get("/hide", auth, (req, res) => {
    console.log("My cookie", req.cookies.loginCookie);
    res.render("hide");
})



// Add Student data
app.post("/registration", auth, async (req, res) => {
    try {
        const { first_name, last_name, phone, email, password, gender } = req.body;
        // Convert password into hashed password
        const hashPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            fname: first_name,
            lname: last_name,
            email,
            phone,
            password: hashPassword,
            gender,
        });

        const token = await newStudent.generateAuthToken(); // it is defined by user on models/student.js schema
        // console.log(token);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + (30000 * 80000)),
            httpOnly: true,
        });

        const result = await newStudent.save();
        console.log(result);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error during registration");
    }
})

app.get("/login", (req, res) => {
    res.render("login");
});

// Check login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).send("Invalid login credentials");
        }

        const isPassMatch = await bcrypt.compare(password, student.password);
        console.log(isPassMatch);

        const token = await student.generateAuthToken(); // it is defined by user on models/student.js schema
        console.log(token);


        res.cookie("jwt", token, {
            expires: new Date(Date.now() + (1000 * 80000)),
            httpOnly: true,
        });

        if (isPassMatch) {
            res.status(201).redirect("/");
        } else {
            res.status(400).send("Invalid login credentials");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Invalid login credentials");
    }
})


app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`App is running on: ${port}`);
})
