const bcrypt = require('bcryptjs');
const User = require('../model/User');

/**
 * DESC to register the user (User, Dokter, superAdmin)
 */

const userRegister = async(userDets, role, res) => {
    try {
        //Validate username
    let usernameNotTaken = await validateUsername(userDets.username);
    if(!usernameNotTaken){
        
        return res.status(400).json({
            message: "Username is taken!",
            success: false
        });
    }
    //Validate email
    let emailNotRegistered = await validateEmail(userDets.email);
    if(!emailNotRegistered){
        return res.status(400).json({
            message: "Email already registered!.",
            success: false
        });
    }
    doctorModel.create(req.body).then((doctor)=>{
        console.log(doctor);
        // Get the hashed password
        const password = await bcrypt.hash(userDets.password, 12);
        //Create a new user
        userDets.password = password
        userDets.data_id = doctor._id
        const newUser = new User(userDets);

        await newUser.save();
        return res.status(201).json({
            message: "Successfully Register",
            success: true
        });
    }).catch((err)=>{
        console.log(err);
        res.statusCode = 400
        res.send({
            code : 400,
            msg:"Error : "+err._message,
            data : null
        })
    })  
    
    }catch (err){
        return res.status(500).json({
            message: "Unable to Register",
            success: false

    });
}   

};

const validateUsername = async username => {
    let user = await User.findOne({username});
    return user ? false : true;
};

const validateEmail = async email => {
    let user = await User.findOne({email});
    return user ? false : true;
};




module.exports = userRegister;