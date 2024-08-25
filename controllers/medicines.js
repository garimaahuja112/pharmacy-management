const express = require("express");
const Pharmacy = require("../model/pharmacy");
const Medicine = require("../model/medicine");
const authMiddleware=require("../middleware/authentication");
const router = express.Router();

const getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find({ pharmacy: req.params.pharmacyId });
        res.status(200).json(medicines);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMedicine = async (req, res) => {
    try {
        const newMedicine = new Medicine({
            pharmacy: req.params.pharmacyId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount
        });
        const savedMedicine = await newMedicine.save();
        res.status(201).json(savedMedicine);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMedicine = async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findOneAndUpdate({ _id: req.params.medicineId, pharmacy: req.params.pharmacyId },
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                discount: req.body.discount
            },
            { new: true });
        if (!updatedMedicine) {
            res.status(404).json({ message: 'Medicine not found' });
        }

        res.status(200).json(updatedMedicine);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a specific medicine for a pharmacy
const deleteMedicine = async (req, res) => {
    try {
        const deletedMedicine = await Medicine.findOneAndDelete({ _id: req.params.medicineId, pharmacy: req.params.pharmacyId });
        if (!deletedMedicine) {
            res.status(404).json({ message: 'Medicine not found' });
        }

        res.status(200).json({ message: 'Medicine deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

router.get("/pharmacies/:pharmacyId/medicines",authMiddleware,getAllMedicines);
router.post('/pharmacies/:pharmacyId/medicines',authMiddleware,createMedicine);
router.put('/pharmacies/:pharmacyId/medicines/:medicineId',authMiddleware,updateMedicine);
router.delete('/pharmacies/:pharmacyId/medicines/:medicineId',authMiddleware,deleteMedicine);

module.exports = router;

