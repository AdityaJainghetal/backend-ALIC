// // const userModel = require("../../Module/Admin/AdminModule");
// // const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");

// // const register = async (req, res) => {
// //   const { name, email, password } = req.body;

// //   try {
// //     // Check if user exists
// //     const existingUser = await userModel.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ 
// //         success: false,
// //         message: "Email already in use" 
// //       });
// //     }

// //     // Hash password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     // Create user
// //     const user = await userModel.create({
// //       name,
// //       email,
// //       password: hashedPassword
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "User registered successfully",
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email
// //       }
// //     });

// //   } catch (error) {
// //     console.error("Registration error:", error);
// //     res.status(500).json({ 
// //       success: false,
// //       message: "Server error during registration",
// //       error: error.message 
// //     });
// //   }
// // };

// // const login = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Find user
// //     const user = await userModel.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({ 
// //         success: false,
// //         message: "User not found" 
// //       });
// //     }

// //     // Compare passwords
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(401).json({ 
// //         success: false,
// //         message: "Invalid credentials" 
// //       });
// //     }

// //     // Create token
// //     const token = jwt.sign(
// //       { 
// //         id: user._id, 
// //         email: user.email, 
// //         name: user.name 
// //       },
// //       process.env.JWT_SECRET || "your_stronger_secret_here",
// //       { expiresIn: "1d" }
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Login successful",
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email
// //       }
// //     });

// //   } catch (error) {
// //     console.error("Login error:", error);
// //     res.status(500).json({ 
// //       success: false,
// //       message: "Server error during login",
// //       error: error.message 
// //     });
// //   }
// // };


// // //Reset Password
// // // In your backend route file (e.g., adminRoutes.js)
// // const resetPassword = async (req, res) => {
// //   try {
// //     const { oldPassword, newPassword, id } = req.body;
    
// //     // Validate inputs
// //     if (!oldPassword || !newPassword || !id) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     const User = await userModel.findById(id);
// //     if (!User) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     const passwordMatch = await bcrypt.compare(oldPassword, User.password);
// //     if (!passwordMatch) {
// //       return res.status(400).json({ message: "Invalid old password" });
// //     }

// //     // Validate new password strength if needed
// //     if (newPassword.length < 6) {
// //       return res.status(400).json({ message: "Password must be at least 6 characters" });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(newPassword, salt);

// //     await userModel.findByIdAndUpdate(id, { password: hashedPassword });

// //     res.json({ message: "Password reset successfully" });
// //   } catch (error) {
// //     console.error("Reset password error:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // };



// // module.exports = { register, login,resetPassword };





// const userModel = require("../../Module/Admin/AdminModule");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // Register Controller
// const register = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user exists
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Email already in use" 
//       });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const user = await userModel.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Server error during registration",
//       error: error.message 
//     });
//   }
// };

// // Login Controller
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ 
//         success: false,
//         message: "User not found" 
//       });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ 
//         success: false,
//         message: "Invalid credentials" 
//       });
//     }

//     // Create token
//     const token = jwt.sign(
//       { 
//         id: user._id, 
//         email: user.email, 
//         name: user.name 
//       },
//       process.env.JWT_SECRET || "your_stronger_secret_here",
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Server error during login",
//       error: error.message 
//     });
//   }
// };

// // Reset Password Controller
// // const resetPassword = async (req, res) => {
// //   try {
// //     const { oldPassword, newPassword, id } = req.body;
    
// //     // Validate inputs
// //     if (!oldPassword || !newPassword || !id) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     // Find user by ID
// //     const User = await userModel.findById(id);
// //     if (!User) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Compare old password
// //     const passwordMatch = await bcrypt.compare(oldPassword, User.password);
// //     if (!passwordMatch) {
// //       return res.status(400).json({ message: "Invalid old password" });
// //     }

// //     // Validate new password
// //     if (newPassword.length < 6) {
// //       return res.status(400).json({ message: "Password must be at least 6 characters" });
// //     }

// //     // Hash new password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(newPassword, salt);

// //     // Update user password
// //     await userModel.findByIdAndUpdate(id, { password: hashedPassword });

// //     res.json({ message: "Password reset successfully" });
// //   } catch (error) {
// //     console.error("Reset password error:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // };


// const resetPassword = async (req, res, next) => {
//   try {
//     const { userId, newPassword, oldPassword } = req.body;

//     // Only allow admins (should already be checked by middleware)
//     const targetUser = await User.findById(userId);
//     if (!targetUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // If admin is changing their own password, verify old password
//     const isSelf = req.user._id.toString() === userId.toString();

//     if (isSelf) {
//       const isMatch = await targetUser.comparePassword(oldPassword);
//       if (!isMatch) {
//         return res.status(400).json({ message: "Old password is incorrect" });
//       }
//     }

//     // Change password
//     targetUser.password = newPassword;
//     await targetUser.save();

//     res.status(200).json({
//       success: true,
//       message: `Password updated successfully for ${
//         isSelf ? "yourself" : targetUser.email
//       }`,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { register, login, resetPassword };



const userModel = require("../../Module/Admin/AdminModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Controller
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "Email already in use" 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error during registration",
      error: error.message 
    });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Create token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        name: user.name 
      },
      process.env.JWT_SECRET || "your_stronger_secret_here",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error during login",
      error: error.message 
    });
  }
};
// Reset Password Controller
const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword, email } = req.body;

    // Validate inputs
    if (!oldPassword || !newPassword || !confirmPassword || !email) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: "New passwords do not match" 
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Old password is incorrect" 
      });
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters" 
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    await userModel.findOneAndUpdate({ email }, { password: hashedPassword });

    res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error during password reset",
      error: error.message 
    });
  }
};
module.exports = { register, login, resetPassword };