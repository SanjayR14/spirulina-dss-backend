const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      enum: ["computed", "cache", "fallback"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", AnalysisSchema);
