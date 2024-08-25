const express=require("express");
const mongoose = require('mongoose');
const NodeCache=require('node-cache');
const Pharmacy=require("../model/pharmacy");
const authMiddleware=require("../middleware/authentication");
const router=express.Router();

const cache=new NodeCache({stdTTL: 3600});

const getAllPharmacies=async(req,res)=>{
    try{
        const cachedPharmacies=cache.get('pharmacies');
        if(cachedPharmacies){
            return res.status(200).json(cachedPharmacies);
        }

        const pharmacies=await Pharmacy.find();

        cache.set('pharmacies', pharmacies);
        res.status(200).json(pharmacies);
    } 
    catch(error){
        console.log("GS", error)
        res.status(500).json({error:error.message});
    }
};
  
const searchPharmacy=async(req,res) => {
    const {name}=req.query;
    console.log("GA", req.query)
    try{
        const pharmacies = await Pharmacy.find({name: new RegExp(name,'i')});
        res.status(200).json(pharmacies);
    } 
    catch(error) {
      res.status(500).json({error:error.message});
    }
  };

const createPharmacy=async(req,res) => {
    try{
        const newPharmacy=new Pharmacy({
            name: req.body.name,
            address: req.body.address,
            contact: req.body.contact,
        });
        const savedPharmacy=await newPharmacy.save();
        res.status(201).json(savedPharmacy);
    }
    catch(error){
        res.status(500).json({message: error.message});
    } 
};

router.get("/pharmacies",authMiddleware,getAllPharmacies);
router.get("/pharmacies/search",authMiddleware,searchPharmacy);
router.post("/pharmacies",authMiddleware,createPharmacy);

module.exports=router;


  