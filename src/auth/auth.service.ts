
import bcrypt from "bcryptjs";
import { pool } from "../dataBase";
import jwt from "jsonwebtoken"
import config from "../middleware/config";


export const singinUserDB = async (payload: any) => {

  const { name, email, password, role } = payload;


  const hashPassword = await bcrypt.hash(password, 10);


  const result = await pool.query(

    `
    INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING*
     `, [name, email, hashPassword, role]);

  const user = result.rows[0];


  delete user.password;

  return user;
};

export const loginUserDB = async (payload: { email: string, password: string }) => {

  const { email, password } = payload;


  const hashedPassword = await bcrypt.hash(password, 10);


  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email,]
  );
  if (userData.rows.length === 0) {
    throw new Error("Invalid Credential!")

  }
  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid Credential!")
  }


  delete user.password;
  const jwtPayload = { id: user.id, name: user.name, role: user.role, email: user.email }

  const Token = jwt.sign(jwtPayload, config.secret as string, { expiresIn: "1d" })

  return { Token, user };

};

export const authService = {
  singinUserDB,
  loginUserDB
}