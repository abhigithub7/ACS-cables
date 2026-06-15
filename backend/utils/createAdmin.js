import Admin from "../Model/Admin.js";

const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      username: process.env.ADMIN_USERNAME,
    });

    if (!existingAdmin) {
      await Admin.create({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      });

      console.log("Admin created successfully");
    }
  } catch (err) {
    console.log(err);
  }
};

export default createAdmin;