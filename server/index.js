const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_empleados"
});

app.post("/create", (req, res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const time = req.body.time;
    

    db.query(
        'INSERT INTO empleado (name, age, country, position, time) VALUES (?, ?, ?, ?, ?)',[name, age, country, position, time],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.get("/empleados", (req, res)=>{
    db.query('SELECT * FROM empleado',
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
        );
});

app.put("/update", (req, res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const time = req.body.time;  

    db.query(
        'UPDATE empleado SET name=?, age=?, country=?, position=?, time=? WHERE id=?',
        [name, age, country, position, time, id],
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});


app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;  

    db.query(
        'DELETE FROM empleado WHERE id=?', id,
        (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});


app.listen(3001, () =>{
    console.log("Running on port 3001")
})