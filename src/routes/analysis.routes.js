const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { analyzeSite } = require("../services/mlService");
const Analysis = require("../models/Analysis");

router.post("/analyze-site", authMiddleware, async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({
        message: "Location is required",
      });
    }

    const mlResponse = await analyzeSite(location);

    // If ML returned error, do NOT store
    if (mlResponse.status === "error") {
      return res.json({
        userId: req.user,
        analysis: mlResponse,
      });
    }

    // ✅ STORE ANALYSIS
    const analysisDoc = new Analysis({
      userId: req.user,
      location,
      summary: mlResponse.analysis.summary,
      source: "computed", // assuming computed for now
    });

    await analysisDoc.save();

    return res.json({
      userId: req.user,
      analysis: mlResponse,
      saved: true,
    });

  } catch (error) {
    console.error("ANALYSIS STORE ERROR:", error.message);
    return res.status(500).json({
      message: "Failed to analyze site",
    });
  }
});

module.exports = router;
