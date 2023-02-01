import { Router } from "express";
import itemController from "../controllers/ItemController";
import userController from "../controllers/UserController";

const router = Router();

//item router
router.get("/items", itemController.readAllItems);
router.post("/items", itemController.createItem);
router.put("/items", itemController.updateItem);
router.delete("/items", itemController.deleteItem);

// session controller
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/register", userController.register);

export = router;
