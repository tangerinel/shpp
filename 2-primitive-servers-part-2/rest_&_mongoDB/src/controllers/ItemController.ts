import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import User, { IUser } from "../models/UserModel";
import Item from "../models/ItemModel";

const createItem = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) return res.status(500).json({ error: "no access" });
  const { text } = req.body;
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    text,
    checked: false,
  });
  await User.findOneAndUpdate({ _id: userId }, { $push: { items: item } });
  return res.status(201).json({ _id: item._id });
};

const readAllItems = (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) return res.status(500).json({ error: "forbidden" });
  User.findById(userId)
    .then((user) => {
      return res.status(200).json({ items: user?.items });
    })
    .catch((error) => res.status(500).json({ error }));
};

const updateItem = (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) return res.status(500).json({ error: "forbidden" });

  const itemId = new mongoose.Types.ObjectId(req.body._id);

  const item = new Item({
    _id: itemId,
    text: req.body.text,
    checked: req.body.checked,
  });

  return User.updateOne(
    { _id: userId },
    { $set: { "items.$[element]": item } },
    { arrayFilters: [{ "element._id": itemId }] }
  )
    .then(() => res.status(201).json({ ok: true }))
    .catch((error) => res.status(500).json({ error }));
};

const deleteItem = (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) return res.status(500).json({ error: "forbidden" });

  const itemId = new mongoose.Types.ObjectId(req.body._id);

  return User.updateOne({ _id: userId }, { $pull: { items: { _id: itemId } } })
    .then(() => res.status(201).json({ ok: true }))
    .catch((error) => res.status(500).json({ error }));
};
export default { createItem, readAllItems, updateItem, deleteItem };
