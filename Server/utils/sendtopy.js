const axios = require('axios');

const sendtopython = async (classimage , knownEncodings) =>{
    try{
        const response = await axios.post('http://localhost:5001/compare-faces', {
            image: classimage,
            known_faces: knownEncodings,
        });
        return response.data;
    }catch(err){
        console.error("Error calling python Api: ", err.response?.data || err.message);
        throw new Error("Face recognition failed");
    }
};

module.exports = sendtopython;