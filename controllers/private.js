exports.getPrivateData = async (req, res, next) => {
  res.status(200).json({
    success: true,
    Data: "You got access to the data of this private route",
  });
};
