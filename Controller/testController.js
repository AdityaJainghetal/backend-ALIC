// const Course = require("../Module/TestModule")

// const imagekit = require("../Utils/imageKit");



// const TestSeries = require("../Module/Coursemodule")


// const CourseSave = async (req, res) => {
//   try {
//     const {

//       Price,
//       Durations,
//       testmodule,
//       CourseDescription,
//       LastDate,
//       subCategory,
//       subsubCategory,
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
//       Price,
//       Durations,
//       URL,
//       CourseDescription,
//       testmodule,
//       category,
//       LastDate: parsedLastDate,
//       size: parsedSize,
//       subCategory,
//       subsubCategory,
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
//   try {
//     const products = await Course.find().populate("category").populate("subCategory").populate("subsubCategory"); // Add subcategory population;
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const PreDelete = async (req, res) => {

//   const { id } = req.params;
//   await Course.findByIdAndDelete(id);

//   res.status(200).send("Task deleted")
// }


// const pretestseriesById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id).populate("category")
//       .populate("subCategory")
//       .populate("subsubCategory"); // Add subcategory population
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }
//     res.status(200).json(course);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// const maintestseriesById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id).populate("category")
//       .populate("subCategory")
//       .populate("subsubCategory"); // Add subcategory population
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }
//     res.status(200).json(course);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };


// const getCourseWithTestModules = async (req, res) => {

//   try {
//     const testSeries = await TestSeries.find();
//     if (!testSeries) {
//       return res.status(404).send();
//     }
//     res.send(testSeries);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }





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

//   CourseSave,
//   getAllCourse,
//   PreDelete,
//   pretestseriesById,
//   maintestseriesById,
//   getCourseWithTestModules,
//   editDisplay,
//   editDataSave


// }


const Course = require("../Module/TestModule"); // Ensure TestModule is the actual model for courses
const imagekit = require("../Utils/imageKit");

// Save Course with all category levels
const CourseSave = async (req, res) => {
  console.log(req.body, 'request body')
  try {
    const {
      Price,
      Durations,
      testmodule,
      CourseDescription,
      LastDate,
      category,
      altText,
      subcategory,
      subsubcategory,
      size,
    } = req.body;

    if (!Price || !Durations || !testmodule || !CourseDescription || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let parsedSize;
    try {
      parsedSize = typeof size === "string" ? JSON.parse(size) : size;
    } catch {
      return res.status(400).json({ error: "Invalid size format" });
    }

    const uploadedImages = [];
    if (req.files?.images) {
      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      for (const file of files) {
        const uploadResponse = await imagekit.upload({
          file: file.data,
          fileName: file.name,
        });
        uploadedImages.push(uploadResponse.url);
      }
    }

    const parsedLastDate = new Date(LastDate);
    if (isNaN(parsedLastDate)) {
      return res.status(400).json({ error: "Invalid LastDate format" });
    }

    const newCourse = await Course.create({
      Price,
      Durations,
      testmodule,
      altText,
      CourseDescription,
      LastDate: parsedLastDate,
      category,
      subCategory: subcategory,
      subsubCategory: subsubcategory,
      size: parsedSize,
      images: uploadedImages,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });

  } catch (error) {
    console.error("CourseSave error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};

// Get all courses
const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    console.error("Get by ID error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// Delete course
const PreDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit course (GET)
const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required.",
      });
    }

    const course = await Course.findById(id)
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Edit display error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit course (POST)
const editDataSave = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Price,
      testmodule,
      Durations,
      category,
      altText,
      subCategory,
      subsubCategory,
      CourseDescription,
      LastDate,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required.",
      });
    }

    const updateData = {
      Price,
      testmodule,
      Durations,
      altText,
      CourseDescription,
      ...(LastDate && { LastDate: new Date(LastDate) }),
      ...(category && { category }),
      ...(subCategory && { subCategory }),
      ...(subsubCategory && { subsubCategory }),
    };

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("category")
      .populate("subCategory")
      .populate("subsubCategory");

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Edit save error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};



const getCourseWithTestModules = async (req, res) => {
  try {
    // Validate the ID parameter
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }

    const course = await Course.findById(req.params.id)
   .populate("category")
            .populate("subCategory")
            .populate("subsubCategory"); // Add subcategory population

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Optional: Format the response data
    const responseData = {
      ...course._doc,
      category: course.category || null,
      subCategory: course.subCategory || null
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ 
      message: "Server Error", 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};


// Get all courses with test modules
// const getCourseWithTestModules = async (req, res) => {
//   try {
//     const testSeries = await Course.find()
//       .populate("category")
//       .populate("subCategory")
//       .populate("subsubCategory");

//     if (!testSeries || testSeries.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No test series found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: testSeries.length,
//       data: testSeries,
//     });
//   } catch (error) {
//     console.error("Test series error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  CourseSave,
  getAllCourse,
  PreDelete,
  getCourseById,
  getCourseWithTestModules,
  editDisplay,
  editDataSave,
};
