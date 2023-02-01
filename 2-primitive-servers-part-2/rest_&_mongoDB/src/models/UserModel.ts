import mongoose, { Schema, Document, Callback } from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
  comparePassword(pass: string, arg1: (err: any, isMatch: any) => void): unknown;
  login: string;
  pass: string;
 items: [];
}
const User: Schema = new mongoose.Schema({
  login: { type: "string", required: true, unique: true },
  pass: { type: "string" , required: true },
  items: {type:"array"}
});

User.pre('save', function(next) {
  let user = this;

if (!user.isModified('pass')) return next();

bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
  if (err) return next(err);

  bcrypt.hash(user.pass, salt, function(err, hash) {
      if (err) return next(err);
   
      user.pass = hash;
      next();
  });
});


});

User.methods.comparePassword = function(candidatePass:string, cb: Callback) {
  bcrypt.compare(candidatePass, this.pass, function(err, isMatch) {
      if (err) return cb(err, null);
      cb(null, isMatch);
  });
};

export default mongoose.model<IUser>("User", User);
