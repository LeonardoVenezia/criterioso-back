const express = require('express');

const router = express.Router()

const userModel = require('../userSchema.js')

/*get all cities*/
router.post('/login',
(req, res) => {
    userModel.findOne({user: req.body.user, pass: req.body.pass}, (err, user) => {
        // console.log(userModel)
        if (err) {
            res.status(500).send({message: 'Error en la petición'})
        } else {
            if (!user) {
                res.status(400).send({message: 'El usuario no existe'})
            } else {
                res.status(200).send(user)
            }
        }
    })
});

router.post('/register', (req, res) => {
    // console.log("------------------------")
    // console.log(req.body)
    // console.log("------------------------")
    userModel.find(req.body)
        .then(file => {
            if(file.length) {
                res.json({success: false})
            } else{
                // console.log(JSON.stringify(file[0]))
                console.log("--------------------------------------------")
                // console.log(file.json())
                const newCriterio = new userModel(req.body);
                // console.log("newCriterio=>", newCriterio)
                newCriterio.save()
                .then(cri => {
                    res.send(cri)
                })
                .catch(err => {
                    // console.log(err)
                    // console.log("------------------------")
                        res.status(500).send("Server error", err)
                    }) 
            }
        })
});

router.put('/user', (req, res) => {
    console.log("------------------------PUT")
    console.log(req.body)
    console.log("------------------------")
    userModel.findByIdAndUpdate(req.body._id, req.body, (err, user)=> {
        if (err) {
            res.status(500).send({message: "Error al actualizar el usuario", err: err})
        } else {
            if(!user) {
                res.status(404).send({message: "No se pudo actualizar el usuario"})
            } else {
                res.status(200).send({user})
            }
        }
    })
    // userModel.findOne({user: req.body.user}, (err, user) => {
    //     if (err) {
    //         console.log("if")
    //         res.status(500).send({message: 'Error en la petición'})
    //     } else {
    //         console.log("else")

    //         if (!user) {
    //             console.log("else if")
    //             res.status(400).send({message: 'El usuario no existe'})
    //         } else {
    //         console.log("else else")
    //             const newCriterio = new userModel(req.body);
    //             newCriterio.update()
    //             res.send(200, "datos actualizados")
    //             // res.status(200).send("datos actualizados" ,user)
    //         }
    //     }
    // })
    /*userModel.find(req.body)
    .then(file => {
        console.log("------------------------PUT-MODEL")
            if(file.length) {
                console.log("------------------------PUT-DENTRO-DEL-IF")
                res.json({success: false})
            } else{
                // console.log(JSON.stringify(file[0]))
                // console.log("--------------------------------------------")
                // console.log(file.json())
                const newCriterio = new userModel(req.body);
                // console.log(newCriterio)
                newCriterio.updateOne()
                .then(cri => {
                    res.send(cri)
                })
                .catch(err => {
                    // console.log(err)
                    // console.log("------------------------")
                        res.status(500).send("Server error", err)
                    }) 
            }
        })*/
});

module.exports = router;