const get404 = (_req, res) => {
  res.status(404).send('Page not found');
};

const errorHandler = (error, _req, res) => {
  console.log(`Catched error: ${error}`);
  res.status(500).json(error.message);
};

export default {
  get404,
  errorHandler,
};
