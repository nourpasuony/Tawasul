const uploadImages = (req, res) => {
  const imageUrls = req.files.map((file) => file.path); // Get the URLs of uploaded images
  res.json({
    message: "Images uploaded successfully",
    images: imageUrls,
  });
};

export default uploadImages;
