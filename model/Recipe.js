const mongoose  = require('mongoose');
const Schema = mongoose.Schema

var itemRecipeSchema = new Schema({
    drug_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Drug"
    },
    quantity :{
        type:String,
        required:true
    }
});

var recipeSchema = new Schema({
    transaction_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        index:true,
    },
    note:{
        type:String,
        required:true
    },
    drugs:[itemRecipeSchema],
},{timestamps:true});

module.exports = {
    recipeModel :  mongoose.model('Recipe', recipeSchema),
    recipeSchema : recipeSchema,
    itemRecipeModel :  mongoose.model('itemRecipe', itemRecipeSchema),
    itemRecipeSchema : itemRecipeSchema
};

