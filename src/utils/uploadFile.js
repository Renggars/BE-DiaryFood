// const supabase = require("./supabase");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");

// /**
//  * Fungsi untuk upload file ke Supabase Storage
//  * @param {Object} file - File yang akan diupload (dari multer)
//  * @param {String} bucketName - Nama bucket di Supabase
//  * @returns {String} Public URL dari file yang diupload
//  */
// const uploadFile = async (file, bucketName) => {
//   if (!file) {
//     throw new Error("File tidak ditemukan.");
//   }

//   const filename = `${uuidv4()}${path.extname(file.originalname)}`;

//   const { data, error } = await supabase.storage
//     .from(bucketName)
//     .upload(filename, file.buffer);

//   if (error) {
//     throw new Error(
//       `Gagal mengupload ke bucket ${bucketName}: ${error.message}`
//     );
//   }

//   const { data: publicUrlData } = supabase.storage
//     .from(bucketName)
//     .getPublicUrl(filename);

//   return publicUrlData.publicUrl;
// };

// module.exports = uploadFile;
