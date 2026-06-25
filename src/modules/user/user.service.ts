import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";
import bcrypt from "bcryptjs";

const registerUserInDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, profilePhoto } = payload;

  const isUserExit = await prisma.uSER.findUnique({
    where: { email },
  });

  if (isUserExit) {
    throw new Error("User with this email already exist");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.uSER.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile:{
        create:{
            profilePhoto
        }
      }
    },
  });

  

  const user = await prisma.uSER.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

export const UserService = {
  registerUserInDB,
};
