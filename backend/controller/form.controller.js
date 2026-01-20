const multer = require('multer');
const { uploadFormFiles } = require('../uploadFile');
const FormServices = require("../services/form_service");

// ✅ CREATE FORM
exports.createForm = async (req, res, next) => {
  try {
    uploadFormFiles.fields([
      { name: 'projectImage1', maxCount: 1 },
      { name: 'projectImage2', maxCount: 1 },
      { name: 'projectImage3', maxCount: 1 },
      { name: 'projectImage4', maxCount: 1 },
      { name: 'memberImage1', maxCount: 1 },
      { name: 'memberImage2', maxCount: 1 },
      { name: 'memberImage3', maxCount: 1 },
      { name: 'memberImage4', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'ppt', maxCount: 1 },
      { name: 'pdf', maxCount: 1 }
    ])(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.json({ success: false, message: err.message });
      } else if (err) {
        return res.json({ success: false, message: err });
      }

      const {
        userId,
        title,
        description,
        link,
        mntorname,
        mmbrno,
        mmbrname,
        category,
        year
      } = req.body;

      // ✅ Required text fields check
      if (!title || !description || !link || !mntorname || !mmbrno || !mmbrname || !category || !year) {
        return res.status(400).json({
          success: false,
          message: "All required text fields must be filled (title, description, link, mentor, member, category, year)."
        });
      }

      // ✅ Project Images
      const projectImages = [];
      for (let i = 1; i <= 4; i++) {
        const field = `projectImage${i}`;
        if (req.files[field] && req.files[field].length > 0) {
          const file = req.files[field][0];
          const imageUrl = `http://192.168.1.8:3000/uploads/projectImages/${file.filename}`;
          projectImages.push({ image: i, url: imageUrl });
        }
      }

      // ✅ Member Images
      const memberImages = [];
      for (let i = 1; i <= 4; i++) {
        const field = `memberImage${i}`;
        if (req.files[field] && req.files[field].length > 0) {
          const file = req.files[field][0];
          const imageUrl = `http://192.168.1.8:3000/uploads/memberImages/${file.filename}`;
          memberImages.push({ image: i, url: imageUrl });
        }
      }

      if (projectImages.length === 0) {
        return res.status(400).json({ success: false, message: "At least one project image is required." });
      }
      if (memberImages.length === 0) {
        return res.status(400).json({ success: false, message: "At least one member image is required." });
      }

      // ✅ File fields
      if (!req.files['video'] || !req.files['video'][0]) {
        return res.status(400).json({ success: false, message: "Video file is required." });
      }
      if (!req.files['ppt'] || !req.files['ppt'][0]) {
        return res.status(400).json({ success: false, message: "PPT file is required." });
      }
      if (!req.files['pdf'] || !req.files['pdf'][0]) {
        return res.status(400).json({ success: false, message: "PDF file is required." });
      }

      const videoUrl = `http://192.168.1.8/uploads/videos/${req.files['video'][0].filename}`;
    const pptUrl = `http://192.168.1.8:3000/uploads/ppts/${req.files['ppt'][0].filename}`;
    const pdfUrl = `http://192.168.1.8:3000/uploads/pdfs/${req.files['pdf'][0].filename}`;

      const formData = {
        userId,
        title,
        description,
        link,
        mntorname,
        mmbrno,
        mmbrname,
        category,
        year,
        projectImages,
        memberImages,
        video: videoUrl,
        ppt: pptUrl,
        pdf: pdfUrl
      };

      const form = await FormServices.createForm(formData);
      res.json({ status: true, success: form });
    });
  } catch (error) {
    next(error);
  }
};

// ✅ GET: All Forms List
exports.getFormsList = async (req, res) => {
  try {
    const forms = await FormServices.getFormsList();
    res.status(200).json(forms);
  } catch (error) {
    console.error("❌ Error in getFormsList:", error);
    res.status(500).json({ message: "Failed to fetch forms" });
  }
};

// ✅ GET: All Project Preview
exports.getAllProjectsPreview = async (req, res, next) => {
  try {
    const forms = await FormServices.getAllProjectsPreview();
    res.json({ success: true, data: forms });
  } catch (error) {
    next(error);
  }
};

// ✅ GET: Single Project Details by ID
exports.getFormById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const form = await FormServices.getFormById(id);

    if (!form) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, data: form });
  } catch (error) {
    console.error("❌ Error in getFormById:", error);
    res.status(500).json({ success: false, message: "Failed to fetch project details" });
  }
};
