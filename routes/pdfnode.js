const express = require("express");
const router = express.Router();

const {
    readPdf,
  } = require("../controllers/pdfnode");


router.get("/pdf/readpdf", readPdf);


module.exports = router;