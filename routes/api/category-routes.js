const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // passes basic check, would like to removed products id and category_id
  try {
    const categoryData = await Category.findAll({
      include: Product,
      attributes: { exclude: ["Products(id)", "category_id"] },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value,be sure to include its associated Products
  // passes basic check
  try {
    const category = await Category.findByPk(req.params.id, { include: Product,});
    
    if (!category) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
    console.log('Logging Category Create');
    console.log(categoryData);
  } catch (err) {
    console.log('Logging error');
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const { categoryName } = req.body;
  res.json("update route");
  // try {
  //   const categoryId = await Category.findByPk(req.params.id);

  //   if (!categoryId) {
  //     res.status(404).json({ message: 'No category with this id found'});
  //     return;
  //   }
  //   res.
  // },
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
