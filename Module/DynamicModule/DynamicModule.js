// const mongoose= require("mongoose");
// const DynamicSchema = new mongoose.Schema({

//       DynamicName : {
//             type: String
//         },

// })

// module.exports = mongoose.model("Dynamic", DynamicSchema);

const mongoose = require("mongoose");

const dynamicRouteSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,

      unique: true,
      trim: true,
      lowercase: true,
    },
    element: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DynamicRoute", dynamicRouteSchema);
