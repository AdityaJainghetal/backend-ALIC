const Banner = require("../Module/MemberModule");
const imagekit = require("../Utils/imageKit");

const Sucesserstudent = async (req, res) => {
  try {
    const {
       Membername,
     phone,
     email,
     address,
     desciption,
      Teamposition,
      size,

    } = req.body;

    const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;

    // Handle image uploads
    const uploadedImages = [];
    const files = Array.isArray(req.files?.images)
      ? req.files.images
      : [req.files?.images].filter(Boolean); // Ensure single file still gets handled

    for (let file of files) {
      const buffer = file.data;
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
      });
      uploadedImages.push(uploadResponse.url);
    }


    const banner = await Banner.create({
       Membername,
      Teamposition,
      phone,
      email,
      address,
      desciption,
      images: uploadedImages,
      size: parsedSize
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


const Successerdisplay = async (req, res) => {
    try {
        const products = await Banner.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message });
    }
};

const StoryDelete = async(req, res)=>{

     const {id} = req.params;
   await Banner.findByIdAndDelete(id);

    res.status(200).send("Task deleted")
}


const getMemberById = async (req, res) => {
  try {
    const product = await Banner.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required." });

    const record = await Banner.findById(id);
    if (!record) return res.status(404).json({ message: "Record not found." });

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching record for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

// Save updated record
const editDataSave = async (req, res) => {
  try {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ 
        success: false,
        message: "ID is required." 
      });
    }

    // Validate required fields
    if (!req.body.Membername || !req.body.Teamposition) {
      return res.status(400).json({
        success: false,
        message: "Member name and position are required fields"
      });
    }

    // Process the update
    const updatedData = {
      Membername: req.body.Membername,
      Teamposition: req.body.Teamposition,
      desciption: req.body.desciption || '',
      phone: req.body.phone || '',
      email: req.body.email || '',
      address: req.body.address || '',
    };

    // Handle image upload if files are present
    if (req.files?.images) {
      const file = req.files.images;
      const uploadResponse = await imagekit.upload({
        file: file.data,
        fileName: file.name,
      });
      updatedData.images = [uploadResponse.url];
    }

    const updated = await Banner.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ 
        success: false,
        message: "Member not found" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Member updated successfully",
      data: updated 
    });
    
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ 
      success: false,
      message: error.message || "Internal server error" 
    });
  }
};

module.exports = {
  Sucesserstudent,
  Successerdisplay,
  StoryDelete,
  getMemberById,
  editDisplay,
  editDataSave
};
