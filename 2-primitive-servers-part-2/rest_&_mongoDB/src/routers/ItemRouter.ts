import {Router} from 'express';
import controller from '../controllers/ItemController';

const router = Router();

router.get("/api/v1/items", controller.readAllItems);
router.post("/api/v1/items", controller.createItem);
router.put("/api/v1/items", controller.updateItem);
router.delete("/api/v1/items", controller.deleteItem);

export = router;