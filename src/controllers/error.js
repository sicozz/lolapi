const get404 = (req, res, next) => {
  res.status(404).send("Page not found");
};

const errorHandler = (error, _req, res, _next) => {
  console.log(`Catched error: ${error}`);
  res.status(500).json(error.message);
};

export default {
  get404,
  errorHandler
};
