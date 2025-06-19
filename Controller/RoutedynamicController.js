const Dynamic = require("../Module/DynamicModule/DynamicModule"); // Adjust the path as needed

// Create a new Dynamic entry
exports.createDynamic = async (req, res) => {
    try {
        const { DynamicName } = req.body;
        
        if (!DynamicName) {
            return res.status(400).json({ error: "DynamicName is required" });
        }

        const newDynamic = new Dynamic({ DynamicName });
        const savedDynamic = await newDynamic.save();

        res.status(201).json(savedDynamic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Dynamic entries
exports.getAllDynamics = async (req, res) => {
    try {
        const dynamics = await Dynamic.find();
        res.status(200).json(dynamics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single Dynamic entry by ID
exports.getDynamicById = async (req, res) => {
    try {
        const dynamic = await Dynamic.findById(req.params.id);
        
        if (!dynamic) {
            return res.status(404).json({ error: "Dynamic not found" });
        }

        res.status(200).json(dynamic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Dynamic entry
exports.updateDynamic = async (req, res) => {
    try {
        const { DynamicName } = req.body;
        
        if (!DynamicName) {
            return res.status(400).json({ error: "DynamicName is required" });
        }

        const updatedDynamic = await Dynamic.findByIdAndUpdate(
            req.params.id,
            { DynamicName },
            { new: true, runValidators: true }
        );

        if (!updatedDynamic) {
            return res.status(404).json({ error: "Dynamic not found" });
        }

        res.status(200).json(updatedDynamic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Dynamic entry
exports.deleteDynamic = async (req, res) => {
    try {
        const deletedDynamic = await Dynamic.findByIdAndDelete(req.params.id);
        
        if (!deletedDynamic) {
            return res.status(404).json({ error: "Dynamic not found" });
        }

        res.status(200).json({ message: "Dynamic deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};