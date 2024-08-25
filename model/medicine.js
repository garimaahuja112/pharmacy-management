// import { float } from 'webidl-conversions';

const mongoose=require('mongoose');
const {Schema, model} = mongoose;

const medicineSchema=new Schema({
    pharmacy:{
        type: Schema.Types.ObjectId,
        ref: 'Pharmacy'
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
    }
});

const Medicine = model("Medicine", medicineSchema);
module.exports=Medicine;
