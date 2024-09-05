import mongoose from "mongoose";
import bcrypt from "bcrypt";

const emailRegx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [emailRegx, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// hash the password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// add a static logIn fn
userSchema.statics.logIn = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");
  if (user) {
    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      return user;
    }
    throw new Error("Invalid credentials");
  }

  throw new Error("Email is not registered");
};

export default mongoose.model("User", userSchema);
