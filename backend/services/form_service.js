const FormModel = require("../model/form_model");

class FormServices {
  // ✅ Create Form
  static async createForm(data) {
    const form = new FormModel(data);
    return await form.save();
  }

  // ✅ GET: All forms with images for frontend
  static async getFormsList() {
    try {
      const forms = await FormModel.find({}, "title description projectImages createdAt").sort({ createdAt: -1 });
      return forms.map(form => ({
        _id: form._id,
        title: form.title,
        description: form.description,
        projectImages: form.projectImages || [],
        createdAt: form.createdAt,
      }));
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET: Lightweight project preview
  static async getAllProjectsPreview() {
    try {
      const forms = await FormModel.find({}, "title description projectImages");
      return forms.map(form => ({
        _id: form._id,
        title: form.title,
        description: form.description,
        projectImages: form.projectImages && form.projectImages.length > 0
          ? [{ url: form.projectImages[0].url }]
          : [],
      }));
    } catch (error) {
      throw error;
    }
  }

  // ✅ GET: Single project full details
static async getFormById(id) {
  try {
    const form = await FormModel.findById(id);
    return form;
  } catch (error) {
    throw error;
  }
}

}



module.exports = FormServices;
