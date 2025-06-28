const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/verfy' , async (req , res)=>{
    const {known_image , unknown_image} = req.body;

    try{
        const reponse = await axios.post('http://localhost:5001/compare-faces', {
            known_image, unknown_image
        });

        res.json(response.data);
    }catch(err){
        console.error('Error calling Python API:', error.response?.data || error.message);
        res.status(500).json({ Success : false, error: "Face recognition Failed"});
    }
}) 

module.exports = router;