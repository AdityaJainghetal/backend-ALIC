const EnquiryModel = require('../Module/SylllabusModuleRegister');
const nodemailer = require('nodemailer'); // You missed this import

const ContactProduct = async (req, res) => {
    const { name, email, phone, city } = req.body; // Added productName here

    try {
        const enquiry = await EnquiryModel.create({
            name,
            email,
            phone,
        //    city,
            city,
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'adityajainghetal@gmail.com',  // Secure way: use environment variables
                pass: 'wjiv vwra gbpo mkgr' 
            }
        });

        const mailOptions = {
            from: email,
            to: 'adityajainghetal@gmail.com', 
           city: 'Enquiry Received', 
            text: `Thank you for your enquiry.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\ncity: ${city}`
        };

        await transporter.sendMail(mailOptions); // use await instead of callback function for better control

        res.status(201).json({
            success: true,
            city: "User enquiry successfully sent",
            data: enquiry
        });
        
    } catch (error) {
        console.error("Enquiry error:", error);
        res.status(500).json({
            success: false,
            city: "An error occurred during enquiry submission",
            error: error.city
        });
    }
};

const ContactDisplay = async (req, res) => {
    try {
        const myData = await EnquiryModel.find();
        res.status(200).json({
            success: true,
            data: myData
        });
    } catch (error) {
        console.error("Fetching enquiries error:", error);
        res.status(500).json({
            success: false,
            city: "Failed to fetch enquiries",
            error: error.city
        });
    }
};

const RecordDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEnquiry = await EnquiryModel.findByIdAndDelete(id);

        if (!deletedEnquiry) {
            return res.status(404).json({
                success: false,
                city: "Enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            city: "Enquiry deleted successfully",
            data: deletedEnquiry
        });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        res.status(500).json({
            success: false,
            city: "Failed to delete enquiry",
            error: error.city
        });
    }
};

const editDisplay = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "ID is required." });

    const record = await Course.findById(id).populate('category');
    if (!record) return res.status(404).json({ message: "Record not found." });

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching record for edit:", error);
    res.status(500).json({ message: error.message });
  }
};

const editDataSave = async (req, res) => {
  try {
    const { id, Coursename, category } = req.body;
    if (!id) return res.status(400).json({ message: "ID is required." });

    // Handle PDFbrochure upload if new file provided
    let PDFbrochure = req.body.PDFbrochure; // existing PDF url (if any)
    if (req.files?.PDFbrochure) {
      const file = req.files.PDFbrochure;
      const uploadResponse = await imagekit.upload({
        file: file.data,
        fileName: file.name,
      });
      PDFbrochure = uploadResponse.url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        Coursename,
        category,
        PDFbrochure,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Record not found." });
    }

    res.status(200).json({ message: "Record updated successfully", data: updatedCourse });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    ContactProduct,
    ContactDisplay,
    RecordDelete,
    editDisplay,
  editDataSave
};
