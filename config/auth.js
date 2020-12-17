const bcrypt = require('bcryptjs');
const { doctorModel, doctorSchema } = require('../model/Doctor');
const { patientModel } = require('../model/Patient');
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
    
    var data_id ="";
    var msg = "";
    switch (role) {
        case "dokter":
            let requestDoctorCheck = await validateDoctorRequest(userDets);
            if(!requestDoctorCheck){
                return res.status(400).json({
                    message: "Bad Request",
                    success: false
                });
            }
            var newDoctor = {
                name:userDets.name,
                bio:userDets.bio,
                expertise:userDets.expertise,
                medical_experience:userDets.medical_experience,
                work_field:null
            }
            if (userDets.work_field != undefined) {
                newDoctor.work_field = userDets.work_field;
            }
            doctorModel.create(newDoctor).then((doctor)=>{
                console.log(doctor);
                data_id=doctor._id;
                msg = "doctor";
            }).catch((err)=>{
                console.log(err);
                res.statusCode = 400
                return res.send({
                    message: "Bad Request",
                    success: false
                })
            })  
            break;
        case "pasien":
            let requestCheck = await validatePatientRequest(userDets);
            if(!requestCheck){
                return res.status(400).json({
                    message: "Bad Request",
                    success: false
                });
            }
            var newPatient = {
                name:userDets.name,
                birth_date:userDets.birth_date,
                sex:userDets.sex,
                address:userDets.address,
                disease_history:[]
            }
            if (userDets.disease_history != undefined) {
                newPatient.disease_history = userDets.disease_history;
            }
            patientModel.create(newPatient).then((patient)=>{
                console.log(patient);
                data_id=patient._id
                msg = "patient"
            }).catch((err)=>{
                return res.status(400).json({
                    message: "Bad Request",
                    success: false
                });
            })
            break;
        default:
            return res.status(400).json({
                message: "Unknown EndPoint",
                success: false
            });
            break;
    }
    
    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    
    //Create a new user
    const newUser = new User({
        email : userDets.email,
        username : userDets.username,
        password : password,
        role : msg,
        data_id : data_id
    });

    await newUser.save();
    return res.status(201).json({
        message: "Successfully Register "+msg,
        success: true
    });
    }catch (err){
        return res.status(500).json({
            message: "Unable to Register : "+err,
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

const validatePatientRequest = async req =>{
    if (req.email != undefined || 
        req.username != undefined || 
        req.password != undefined ||
        req.name != undefined ||
        req.birth_date != undefined ||
        req.sex != undefined ||
        req.address != undefined) {
        return true
    }
    return false
}
const validateDoctorRequest = async req =>{
    if (req.email != undefined || 
        req.username != undefined || 
        req.password != undefined ||
        req.name != undefined ||
        req.bio != undefined ||
        req.expertise != undefined ||
        req.medical_experience != undefined ) {
        return true
    }
    return false
}



module.exports = userRegister;