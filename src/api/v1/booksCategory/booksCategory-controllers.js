const CategoryModel = require('./booksCategory-model.js');

exports.interceptIds = (req, res, next, id) => {
  // find category using mongoose findById method
  CategoryModel.findById({ _id: id }, (err, data) => {
    if (err) {
      return next(new Error('could not intercept category id'));
    }

    // add category property holding category data on req object
    req.category = data;
    next();
  });
};

exports.addCategory = (req, res, next) => {
  // collect category data from req.body object
  let categoryData = req.body,
    // instantiate categorymodel using categoryData form req.body
    categoryDetails = new CategoryModel(categoryData);

  // use save method on categoryDetails instance to persist category data
  categoryDetails.save((err, data) => {
    if (err) {
      return next(new Error('could not add category'));
    }

    res.status(200).json(data);
  });
};

exports.getCategories = (req, res, next) => {
  // use mongoose find method to find all categories persisted in db
  CategoryModel.find((err, data) => {
    if (err) {
      return next(new Error('could not fetch all categories'));
    }

    res.status(200).json(data);
  });
};

exports.getCategoryById = (req, res, next) => {
  // collect category data coming from category property on req object
  let categoryInfo = req.category;

  // check if categoryInfo holds data
  if (!categoryInfo) {
    return next(new Error('could not fetch category by Id'));
  }

  res.status(200).json(categoryInfo);
};

exports.deleteCategory = (req, res, next) => {
  // get categoryId from category object on req
  let categoryId = req.category._id;

  // use mongoose remove method to delete a category item
  CategoryModel.remove({ _id: categoryId }, (err) => {
    if (err) {
      return next(new Error('could not delete category by Id'));
    }

    res.status(200).json(req.category);
  });
};

exports.updateCategory = (req, res, next) => {
  let categoryId = req.category._id;

  // use mongoose update to update a category data by Id
  CategoryModel.update({ _id: categoryId }, req.body, { new: true }, (err) => {
    if (err) {
      return next(new Error('could not update category details'));
    }
  });

  res.status(200).json(req.body);
};
