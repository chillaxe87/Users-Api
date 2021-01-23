const express = require('express')
const User = require("../models/userModel")

const router = new express.Router()

router.post('/users/new', async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save();
        res.send(user);
    }catch(err){
        res.status(400).send({
            status: 400,
            message: err.message,
        })
    }
})

router.get('/users/get', async (req,res) => {
    const _id = req.query._id
    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send({
                status: 404,
                message: "wrong id"
            })
        }
        res.send(user)
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/users/all', async (req,res) => {
    try{
        const allUsers = await User.find({})
        if(allUsers.length > 0){
            res.send(allUsers)
        } else{
            res.status(404).send({
                status: 404,
                message: "no users"
            })
        }
    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
})

router.patch('/user/edit', async (req, res) => {
    const _id = req.query._id
    // validation of existing parameters
    // const propertiesList = ["name", "age", "password", "email"]
    // const patchProperties = Object.getOwnPropertyNames(req.body)
    // for(let i = 0 ; i < patchProperties.length; i++){
    //     if(!propertiesList.includes(patchProperties[i])){
    //         return res.status(400).send({
    //             status: 400,
    //             message: "bad input"
    //         })
    //     }
    // }
    // //
    const allowedUpdate = ["name", "age", "password", "email"]
        for(let update in req.body){
            if(!allowedUpdate.includes(update)){
                return res.status(400).send({
                    status: 400,
                    message: "bad input"
                });
            }
        }
    try{
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true,   // send the updated document
            runValidators: true,    // do the validator in the schema
        });
        if(!user) {
            return res.status(404).send({
                status: 404,
                message: "wrong id"
            })       
        }
        res.send(user);
    }catch(err){
        res.status(400).send({
            status: 400,
            message: err.message
        })
    }
})

router.delete("/users/delete", async (req, res) => {
    const _id = req.query.id;
    try {
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send({
                status: 404,
                message: "wrong id"
            })
        }
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get("/users/custom-search", async(req, res) => {
    const searchParams = ["name", "age", "password", "email"]
        for(let parameter in req.body){
            if(!searchParams.includes(parameter)){
                return res.status(400).send({
                    status: 400,
                    message: "invalid search"
                });
            }
        }
    try{
        const users = await User.find(req.body)
        res.send(users)
    }catch(err){
        res.status(500).send(err)
    }

})
module.exports = router