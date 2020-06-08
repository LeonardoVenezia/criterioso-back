const express = require('express');

const router = express.Router()

const criterioModel = require('../criterioSchema.js')

/*get user*/
router.get('/user',
(req, res) => {
    criterioModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
});

router.post('/user', (req, res) => {
    // console.log("------------------------")
    // console.log(req.body)
    // console.log("------------------------")
    criterioModel.find(req.body)
        .then(file => {
            if(file.length) {
                res.json({success: false})
            } else{
                // console.log(JSON.stringify(file[0]))
                console.log("--------------------------------------------")
                // console.log(file.json())
                const newCriterio = new criterioModel(req.body);
                console.log(newCriterio)
                newCriterio.save()
                .then(cri => {
                    res.send(cri)
                })
                .catch(err => {
                    console.log(err)
                    console.log("------------------------")
                        res.status(500).send("Server error", err)
                    }) 
            }
        })
});

// router.put('/user', (req, res) => {
//     // console.log("------------------------")
//     // console.log(req.body)
//     // console.log("------------------------")
//     criterioModel.find(req.body)
//         .then(file => {
//             if(file.length) {
//                 res.json({success: false})
//             } else{
//                 // console.log(JSON.stringify(file[0]))
//                 // console.log("--------------------------------------------")
//                 // console.log(file.json())
//                 const newCriterio = new criterioModel(req.body);
//                 console.log(newCriterio)
//                 newCriterio.updateOne()
//                 .then(cri => {
//                     res.send(cri)
//                 })
//                 .catch(err => {
//                     // console.log(err)
//                     // console.log("------------------------")
//                         res.status(500).send("Server error", err)
//                     }) 
//             }
//         })
// });


router.get('/criterios',
(req, res) => {
    criterioModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
});

module.exports = router;