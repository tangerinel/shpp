import  {Router} from 'express';
import user from "../controllers/UserController"

const router =Router();

router.post("/api/v1/login", user.login);
router.post("/api/v1/logout", user.logout);
router.post("/api/v1/register", user.register);

export = router;