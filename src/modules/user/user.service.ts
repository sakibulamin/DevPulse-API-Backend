import { pool } from "../../dataBase"
import type { Iuser } from "./user.interface"
import bcrypt from "bcryptjs"


const createDB = async (payload: Iuser) => {
    const { name, email, password, role } = payload
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
                INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING*
                `, [name, email, hashPassword, role]);

    const user = result.rows[0];

    delete user.password;
    return result;
}

const allUserDB = async () => {
    const result = await pool.query(`
            SELECT * FROM users
            `,)
    const user = result.rows[0];

    delete user.password;
    return result
}

const singleDB = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
            `, [id]);
    const user = result.rows[0];

    delete user.password;

    return result;
}

const updateDB = async (payload: Iuser, id: string) => {
    const { name, email, password, role } = payload
    const result = await pool.query(`
            UPDATE users SET name=COALESCE($1,name),
            email=COALESCE($2,email),
            role=COALESCE($3,role) WHERE id=$4 RETURNING*
            `, [name, email, role, id])
    return result

}
const deleteDB = async (id: string) => {
    const result = await pool.query(`
           DELETE FROM users WHERE  id=$1
            `, [id])
    return result;
}


export const userService = {
    createDB,
    allUserDB,
    updateDB,
    singleDB,
    deleteDB
}