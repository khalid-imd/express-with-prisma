import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import jwt from "jsonwebtoken";

interface RegisterData {
  email: string;
  name: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET belum dikonfigurasi");
}

export const registerUser = async (data: RegisterData) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Email atau password salah");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Email atau password salah");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
