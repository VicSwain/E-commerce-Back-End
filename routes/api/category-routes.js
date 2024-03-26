const router = require("express").Router();
//import needed models
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories including its associated Products
router.get("/", async (req, res) => {
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

// find one category by its `id` value, including its associated Products
router.get("/:id", async (req, res) => {
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

// create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => { 
  const categoryID = req.params.id;
  const { category_name } = req.body;
    
    try {
      const category = await Category.findByPk(categoryID);
      if (!category) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      category.category_name = category_name;
      await category.save();

      res.json(category);
    } catch (err) {
      res.status(400).json(err);
    }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
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
