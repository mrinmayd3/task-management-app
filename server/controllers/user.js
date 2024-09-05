import User from "../models/user.js";
import { createJWT } from "../utils/createToken.js";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const availableUser = await User.findOne({ email });

    if (availableUser) {
      res.status(400);
      throw new Error("User already registered");
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const accessToken = createJWT({
      user: { username: user.username, email: user.email, id: user.id },
    });

    res.status(201).json({ success: true, accessToken });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const logInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const user = await User.logIn(email, password);

    const accessToken = createJWT({
      user: { username: user.username, email: user.email, id: user.id },
    });

    res.status(200).json({ success: true, accessToken });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const currentUser = async (req, res) => {
  res.json(req.user);
};

export { registerUser, logInUser, currentUser };
