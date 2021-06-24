import mongoose from "mongoose";
import { Password } from "../services/password";

//properties for new User
interface UserAttrs {
  email: string;
  password: string;
  phone: string;
}

//describing the properties that User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//describing properties that User document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  phone: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

//middleware implemented in mongoose
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
