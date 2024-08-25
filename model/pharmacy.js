const mongoose =require('mongoose');
const {Schema, model} = mongoose;

const pharmaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return v.length == 10;
          },
          message: props => `${props.value} is not a valid contact number! It should be exactly 10 digits.`
        }
    }
});

const Pharmacy = model("Pharmacy", pharmaSchema);
module.exports=Pharmacy;
