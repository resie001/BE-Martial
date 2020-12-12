const mongoose  = require('mongoose');
const {schema} =require('./Drug');
const Schema = mongoose.Schema

var recipeSchema = new Schema({
    transaction_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        index:true,
    },
    Drugs:[schema],
},{
    timestamps:true
});

module.exports = mongoose.model('Recipe', recipeSchema);

// {
//     "_id":1,
//     "name":"name of the doctor",
//     "bio":"bio of the doctor",
//     "expertise":[
//        "Psikiatri",
//        "Orthopedi",
//        "cardiolog"
//     ],
//     "medical_experience":6,
//     "work_field":[
//        {
//           "id_hospital":1,
//           "job":"dentist"
//        }
//     ],
//     "rating":[
//        {
//           "user_id":4,
//           "rating":3,
//           "comment":"the comment must be here"
//        }
//     ]
//  }
 
 
//  {
//     "_id":1,
//     "name":"name of the user",
//     "birth_date":"12-09-1996",
//     "sex":"Female",
//     "address":"Jakarta",
//     "disease_history":[
//        {
//           "name":"bone cancer",
//           "detected_year":2014,
//           "status":"treatment"
//        },
//        {
//           "name":"Covid-19",
//           "detected_year":2020,
//           "status":"recover"
//        }
//     ]
//  }
 
//  {
//     "_id":1,
//     "name":"hospital name",
//     "bio":"hospital bio",
//     "address":"jalan bla bla bla",
//     "speciality":[
//        "cancer",
//        "pulmo",
//        "bone"
//     ],
//     "rating":[
//        {
//           "user_id":4,
//           "rating":3,
//           "comment":4
//        }
//     ],
//     "doctors":[
//        {
//           "doctor_id":2,
//           "job":"pulmo"
//        }
//     ]
//  }
 
//  {
//     "_id":1,
//     "status":"done",
//     "doctor_id":1,
//     "user_id":2
//  }
 
//  {
//  "_id":"awddaw",
//  "nama_obat":"dawdwa",
//  }
 
//  {
//  "_id":1,
//  "id_transaction":3,
//  "list_obat":[{"id_obat":0}]
//  }