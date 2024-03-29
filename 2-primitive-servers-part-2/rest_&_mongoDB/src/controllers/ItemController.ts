import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import User from "../models/UserModel";
import Item, { IItem } from "../models/ItemModel";

const createItem = (req: Request, res: Response): Response | undefined => {
  const userId: ObjectId | undefined = req.session.userId;
  if (!userId) return res.status(500).json({ error: "no access" });
  const { text } = req.body;
  const item: IItem = new Item({
    _id: new mongoose.Types.ObjectId(),
    text: text,
    checked: false,
  });
  User.findOneAndUpdate({ _id: userId }, { $push: { items: item } })
    .then(() => {
      res.status(201).json({ _id: item._id });
    })
    .catch((error): Response => res.status(500).json({ error }));
};

const readAllItems = (req: Request, res: Response): Response | undefined => {
  const userId: ObjectId | undefined = req.session.userId;
  if (!userId) return res.status(500).json({ error: "forbidden" });
  User.findById(userId)
    .then((user) => {
      res.status(201).json({ items: user?.items });
    })
    .catch((error) => res.status(500).json({ error }));
};

const updateItem = (
  req: Request,
  res: Response
): Promise<Response> | Response => {
  const userId: ObjectId | undefined = req.session.userId;
  if (!userId) return res.status(500).json({ error: "forbidden" });

  const itemId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
    req.body._id
  );

  const item: IItem = new Item({
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

const deleteItem = (
  req: Request,
  res: Response
): Promise<Response> | Response => {
  const userId: ObjectId | undefined = req.session.userId;
  if (!userId) return res.status(500).json({ error: "forbidden" });

  const itemId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
    req.body._id
  );

  return User.updateOne({ _id: userId }, { $pull: { items: { _id: itemId } } })
    .then(() => res.status(201).json({ ok: true }))
    .catch((error) => res.status(500).json({ error }));
};
export default { createItem, readAllItems, updateItem, deleteItem };
