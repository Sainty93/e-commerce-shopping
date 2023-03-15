const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });

    res.json(categoryData);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  });
  //stored categories w/ associated product details

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    const category = categoryData.get({ plain: true });
    res.json(category);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
// single category details

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// creates new categories

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, { where: 
      {id: req.params.id} });

    res.status(200).json(updateCategory);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
//uses id to target row and updated the specified fields for the object

router.delete('/:id', async(req, res) => {
  try {
    const delCategory = await Category.destroy({ where: {id: 
      req.params.id} });

    res.status(200).json(delCategory);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
