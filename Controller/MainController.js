// const Course =  require( "../Module/MainModule")

// const imagekit = require("../Utils/imageKit");



// const CourseSave = async (req, res) => {
//   try {
//     const {
 
//        Price, 
//       Durations, 
//       testmodule,
//       CourseDescription,
//       LastDate,
//       size,
//       category, // ✅ Destructure category
//     } = req.body;

//     // ✅ Parse JSON string if needed
//     let parsedSize;
//     try {
//       parsedSize = typeof size === 'string' ? JSON.parse(size) : size;
//     } catch (err) {
//       return res.status(400).json({ error: 'Invalid size format' });
//     }

//     // ✅ Handle image uploads only if images are provided
//     const uploadedImages = [];
//     const filesRaw = req.files?.images;

//     if (filesRaw) {
//       const files = Array.isArray(filesRaw) ? filesRaw : [filesRaw];

//       for (let file of files) {
//         const buffer = file.data;
//         const uploadResponse = await imagekit.upload({
//           file: buffer,
//           fileName: file.name,
//         });
//         uploadedImages.push(uploadResponse.url);
//       }
//     }

//     // ✅ Parse and validate LastDate
//     const parsedLastDate = new Date(LastDate);
//     if (isNaN(parsedLastDate)) {
//       return res.status(400).json({ error: 'Invalid LastDate format' });
//     }

//     // ✅ Create course
//     const course = await Course.create({
//         Price, 
//       Durations, 
//       URL,
//       CourseDescription,
//       testmodule,
//       category,
//       LastDate: parsedLastDate,
//       size: parsedSize,
//       category,
//       images: uploadedImages,
//     });

//     res.status(201).json(course);
//   } catch (error) {
//     console.error('CourseSave error:', error);
//     res.status(500).json({ error: error.message || 'Internal Server Error' });
//   }
// };



// const getAllCourse = async (req, res) => {
//     try {
//         const products = await Course.find().populate("category");
//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ message: error.message });
//     }
// };


// const PreDelete = async(req, res)=>{

//      const {id} = req.params;
//    await Course.findByIdAndDelete(id);

//     res.status(200).send("Task deleted")
// }


// const getCourseWithTestModules = async (req, res) => {
//   try {
//     const course = await Course.find()
//       // .populate("category")      
//       // .populate("testmodule");   

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json(course);
//   } catch (err) {
//     console.error("Error in getCourseWithTestModules:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };


// const editDisplay = async (req, res) => {
//   try {
//     const { id } = req.query;
//     if (!id) return res.status(400).json({ message: "ID is required." });

//     const record = await Course.findById(id)
//       .populate('category', 'name _id') // Only populate name and _id
//       .lean(); // Convert to plain JavaScript object

//     if (!record) return res.status(404).json({ message: "Record not found." });

//     // Ensure consistent category format
//     if (record.category && typeof record.category === 'object') {
//       record.category = record.category._id; // Send just the ID
//     }

//     res.status(200).json(record);
//   } catch (error) {
//     console.error("Error fetching record for edit:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const editDataSave = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { 
//       Price, 
//       testmodule, 
//       Durations, 
//       category, 
//       CourseDescription, 
//       LastDate 
//     } = req.body;

//     if (!id) {
//       return res.status(400).json({ message: "ID is required." });
//     }

//     // Validate required fields
//     if (!Price || !testmodule || !Durations || !CourseDescription) {
//       return res.status(400).json({ message: "Required fields are missing." });
//     }

//     const updateData = {
//       Price,
//       testmodule,
//       Durations,
//       CourseDescription,
//       ...(LastDate && { LastDate: new Date(LastDate) }),
//       ...(category && { category }) // Will accept either ObjectId or string
//     };

//     const updatedCourse = await Course.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true }
//     ).populate('category');

//     if (!updatedCourse) {
//       return res.status(404).json({ message: "Course not found." });
//     }

//     res.status(200).json({ 
//       message: "Course updated successfully", 
//       data: updatedCourse 
//     });
//   } catch (error) {
//     console.error("Error updating course:", error);
//     res.status(500).json({ 
//       message: error.message || "Internal server error",
//       error: error.stack 
//     });
//   }
// };

// module.exports = {

//      CourseSave,
//      getAllCourse,
//      PreDelete,
//      getCourseWithTestModules,
//      editDisplay,
//        editDataSave

     
// }

const Course = require("../Module/MainModule");
const imagekit = require("../Utils/imageKit");

const CourseSave = async (req, res) => {
  try {
    const {
      Price,
      Durations,
      testmodule,
      CourseDescription,
      LastDate,
      size,
      category,
      subCategory,
      subsubCategory
    } = req.body;

    // Parse JSON string if needed
    let parsedSize;
    try {
      parsedSize = typeof size === 'string' ? JSON.parse(size) : size;
    } catch (err) {
      return res.status(400).json({ error: 'Invalid size format' });
    }

    // Handle image uploads
    const uploadedImages = [];
    const filesRaw = req.files?.images;

    if (filesRaw) {
      const files = Array.isArray(filesRaw) ? filesRaw : [filesRaw];
      for (let file of files) {
        const buffer = file.data;
        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: file.name,
        });
        uploadedImages.push(uploadResponse.url);
      }
    }

    // Validate LastDate
    const parsedLastDate = new Date(LastDate);
    if (isNaN(parsedLastDate)) {
      return res.status(400).json({ error: 'Invalid LastDate format' });
    }

    // Create course with all category levels
    const course = await Course.create({
      Price,
      Durations,
      CourseDescription,
      testmodule,
      LastDate: parsedLastDate,
      size: parsedSize,
      category,
      subCategory: subCategory || null,
      subsubCategory: subsubCategory || null,
      images: uploadedImages,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('CourseSave error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const products = await Course.find()
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const PreDelete = async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  res.status(200).send("Task deleted");
};

const getCourseWithTestModules = async (req, res) => {
  try {
    const course = await Course.find()
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory")
      .populate("testmodule");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error("Error in getCourseWithTestModules:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required." });

    const record = await Course.findById(id)
      .populate('category', 'name _id')
      .populate('subCategory', 'name _id')
      .populate('subsubCategory', 'name _id')
      .lean();

    if (!record) return res.status(404).json({ message: "Record not found." });

    // Simplify category objects to just IDs
    if (record.category && typeof record.category === 'object') {
      record.category = record.category._id;
    }
    if (record.subCategory && typeof record.subCategory === 'object') {
      record.subCategory = record.subCategory._id;
    }
    if (record.subsubCategory && typeof record.subsubCategory === 'object') {
      record.subsubCategory = record.subsubCategory._id;
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching record for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Price,
      testmodule,
      Durations,
      category,
      subCategory,
      subsubCategory,
      CourseDescription,
      LastDate
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    // Validate required fields
    if (!Price || !testmodule || !Durations || !CourseDescription) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const updateData = {
      Price,
      testmodule,
      Durations,
      CourseDescription,
      ...(LastDate && { LastDate: new Date(LastDate) }),
      ...(category && { category }),
      ...(subCategory && { subCategory }),
      ...(subsubCategory && { subsubCategory })
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
    .populate('category')
    .populate('subCategory')
    .populate('subsubCategory');

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({
      message: "Course updated successfully",
      data: updatedCourse
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      message: error.message || "Internal server error",
      error: error.stack
    });
  }
};

module.exports = {
  CourseSave,
  getAllCourse,
  PreDelete,
  getCourseWithTestModules,
  editDisplay,
  editDataSave
};