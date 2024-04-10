const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express()

app.use(express.json())

app.get("/user", (req, res, next) => {
    db.query('SELECT * FROM usuarios;', (err, users) => {
        res.status(200).json(users);
    })
});

app.post("/user", (req, res, next) => {
    const body = req.body
    db.query(
        'INSERT INTO usuarios (name,email,password) VALUES (?, ?, ?);',
        [body.name, body.email, body.password]
        , (err, result) => {
            if (err) {
                res.status(412).send(err)
                return
            }
            res.status(201).json(result)
        })
});
app.delete("/user/:id", (req, res, next) => {
    const id = req.params.id
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.sendStatus(412)
            return
        }
        res.sendStatus(200)
    })
});

app.listen(8080, () => {
    console.log('servidor aberto em 8080')
})