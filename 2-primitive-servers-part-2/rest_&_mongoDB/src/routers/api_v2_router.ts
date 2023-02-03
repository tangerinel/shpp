import { Router } from "express";
import itemController from "../controllers/ItemController";
import userController from "../controllers/UserController";

const router: Router = Router();

router.all("/", (req, res) => {
  let action: string = req.query.action as string;
  switch (action) {
    case "login": {
      userController.login(req, res);
      break;
    }
    case "logout": {
      userController.logout(req, res);
      break;
    }
    case "register": {
      userController.register(req, res);
      break;
    }
    case "getItems": {
      itemController.readAllItems(req, res);
      break;
    }
    case "deleteItem": {
      itemController.deleteItem(req, res);
      break;
    }
    case "createItem": {
      itemController.createItem(req, res);
      break;
    }
    case "editItem": {
      itemController.updateItem(req, res);
      break;
    }
    default:
      res.status(400).send({ error: `Unknown request command: ${action}` });
  }
});

export = router;
