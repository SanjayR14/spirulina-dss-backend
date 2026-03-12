const axios = require("axios");

const ML_SERVICE_URL = "https://spirulina-dss-ml.onrender.com/api/v1/site";

const analyzeSite = async (location) => {
  const response = await axios.get(`${ML_SERVICE_URL}/analyze`, {
    params: { location },
  });

  return response.data;
};

module.exports = { analyzeSite };
