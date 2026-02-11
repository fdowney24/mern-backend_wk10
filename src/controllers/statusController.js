// src/controllers/statusController.js
exports.getStatus = (req, res) => {
    res.json({
       status: "Online",
       message: "AWS Backend is reachable!",
       // ... rest of the object
    });
  };