const express = require("express");
const router = express.Router();
const FormController = require("../controller/form.controller");

// POST: Create new form
router.post("/storeform", FormController.createForm);

// GET: All forms (detailed list)
router.get("/forms", FormController.getFormsList);

// ✅ GET: Project preview (title, description, first image)
router.get("/projects", FormController.getAllProjectsPreview);

router.get('/get-project/:id', FormController.getFormById);

module.exports = router;
