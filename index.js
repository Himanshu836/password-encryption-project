const express = require("express");
const app = express()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const model = require("./model/model")

mongoose.connect("mongodb://localhost/password")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get("/", (req, res) => {
   res.send("hello")
})

// "name":"Himanshu_sekhar",
// "password":"Chintu_ji"

app.post("/", async (req, res) => {
    let hashedpassword = await bcrypt.hash(req.body.password, 5)
    const db = new model({
        name: req.body.name,
        password: hashedpassword
    })
    try {
        const newdata = await db.save()
        console.log("done")
        res.status(201).json({ message: hashedpassword })
    } catch (error) {
        console.log(error)
    }

    // console.log(req.body.password+"\n"+hashedpassword)  
    // res.send("password hashed")
})

app.get("/all_data",async (req, res) => {
    let data =await model.find()

    res.send(data)
})

app.post("/compare", async (req, res) => {
    let encryptedPassword = await model.findOne({ name: req.body.name })
    console.log(encryptedPassword.password)
    let isequal = await bcrypt.compare(req.body.password, encryptedPassword.password)
    if (isequal) {
        res.send("its correct")
    } else {
        res.send("wrong password")
    }
})

app.listen(2000, () => {
    console.log("server on")
})