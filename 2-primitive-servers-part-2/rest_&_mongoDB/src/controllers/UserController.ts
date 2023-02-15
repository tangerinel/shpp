import { Request, Response } from "express";
import User, { IUser } from "../models/UserModel";

const login = (req: Request, res: Response): void => {
  const { login, pass } = req.body;

  User.findOne({ login: login }, function (err: Error, user: IUser):
    | Response
    | undefined {
    if (err) {
      return res.status(500).send({ error: err });
    }
    if (!user) {
      return res.status(404).send({error: 'not found'});
    }
    user.comparePassword(pass, function (err: Error, isMatch: boolean):
      | Response
      | undefined {
      if (err) throw err;
      if (isMatch) {
        req.session.userId = user._id;
        return res.json({ ok: true });
      }
    });
  });
};

const register = async (req: Request, res: Response): Promise<Response> => {
  const { login, pass } = req.body;

  let existedUser = await User.findOne({ login: login });
  if(existedUser) return res.status((500)).json({ error: "User already exist" });

  let user: IUser = new User({
    login: login,
    pass: pass,
  });

  return user
    .save()
    .then(() => res.json({ ok: true }))
    .catch(() => res.status(500).json({ error: "Failed to register" }));
};

const logout = (req: Request, res: Response): void => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
};

export default { login, register, logout };
