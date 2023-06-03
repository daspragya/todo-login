const express = require("express");

const ItemCtrl = require("../controllers/todo-ctrl");
const LoginCtrl = require("../controllers/login-ctrl");

const router = express.Router();

router.post("/item", [LoginCtrl.verifyToken], ItemCtrl.createItem);
router.put("/item/:id", [LoginCtrl.verifyToken], ItemCtrl.updateItem);
router.delete("/item/:id", [LoginCtrl.verifyToken], ItemCtrl.deleteItem);
router.get("/item/:id", [LoginCtrl.verifyToken], ItemCtrl.getItemById);
router.get("/items", [LoginCtrl.verifyToken], ItemCtrl.getItems);

module.exports = router;
