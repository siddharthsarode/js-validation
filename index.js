const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");

// Local Files
require("./database/config");
const Student = require("./models/student");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, './views/partials'));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/registration", (req, res) => {
    res.render("registration");
});

// Add Student data 
app.post("/registration", async (req, res) => {
    try {
        const { first_name, last_name, phone, email, password, gender } = req.body;
        console.log(req.body);
        const newStudent = Student({
            fname: first_name,
            lname: last_name,
            email,
            phone,
            password,
            gender,
        });

        const result = await newStudent.save();
        console.log(result);
        res.send("post request");
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
})

app.get("/login", (req, res) => {
    res.render("login");
});

// check login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await Student.findOne({ email });

        if (result.password == password)
            res.status(201).send("Valid login");
        else
            res.status(400).send("Invalid Login");

    } catch (error) {
        res.status(400).send("Invalid login");
    }
})


app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`App is running on: ${port}`);
})