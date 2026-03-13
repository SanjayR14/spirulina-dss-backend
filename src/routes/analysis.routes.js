const express = require("express");
const router = express.Router();
const { analyzeSite } = require("../services/mlService");
const Analysis = require("../models/Analysis");

router.post("/analyze-site", async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({
        message: "Location is required",
      });
    }

    const mlResponse = await analyzeSite(location);
    console.log("hi", mlResponse);
    // If ML returned error, do NOT store
    if (mlResponse.status === "error") {
      return res.json({
        analysis: mlResponse,
      });
    }

    // STORE ANALYSIS
    const analysisDoc = new Analysis({
      location,
      summary: mlResponse.analysis.summary,
      source: "computed",
    });

    await analysisDoc.save();

    return res.json({
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