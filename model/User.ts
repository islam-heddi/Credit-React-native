import { IUser } from '@/types/User';
import { hashPassword, verifyPassword } from '@/utils/encryptions';
import { SQLiteDatabase } from 'expo-sqlite';

class UserModel{
    private db!: SQLiteDatabase;
    private static instance: UserModel | null = null;
    private isConnected: boolean = false;
    private constructor(db: SQLiteDatabase){
        console.log("preparing user table ...");
        this.db = db;
        this.isConnected = true;
        this.createTable(db);
    }

    private async createTable(db: SQLiteDatabase) {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            username TEXT NOT NULL UNIQUE, 
            password TEXT NOT NULL
            );
        `);
    }

    public async addUser(username: string,  password: string): Promise<unknown>{
        try {
            const hashedPassword: string| undefined = await hashPassword(password);
            if(hashPassword === undefined) throw new Error("unable to hash the password");
            const db = this.db;
            await db.runAsync("INSERT INTO users(username, password) values (?,?)", [username, hashedPassword as string]);
        } catch (error) {
            return error;
        }
    }

    public  async findUser(id: string): Promise<IUser | unknown>{
        try {
            const db = this.db;
            const user: IUser[] = await db.getAllAsync<IUser>("SELECT * from users where id=?", [id]);

            return user[0];
        } catch (error) {
            return error;
        }
    }

    public async findUserPassword(username: string, password: string): Promise<IUser|unknown> {
        try {
            const db = this.db;
            const user: IUser[] = await db.getAllAsync<IUser>("SELECT * from users where username=?", [username]);
            const check: boolean|undefined = await verifyPassword(password, user[0].password!);
            if(check === undefined) throw new Error("unable to check the password");
            if(!(check as boolean)) throw new Error("the password is wrong");
            return user[0];
        } catch (error) {
            return error;
        }   
    }

    public async deleteUser(id: string, password: string): Promise<string | unknown> {
        try {
            const userExisted: IUser | unknown  = await this.findUser(id);
            if(!userExisted) throw new Error("user not found");
            const check: boolean = await verifyPassword(password, (userExisted as IUser).password!) as boolean;
            if(!check) throw new Error("the password does not match"); 
            const db = this.db;
            await db.runAsync("DELETE from users where id=?",[id]);
            return "deleted successfully";
        } catch (error) {
            return error;
        }
    }

    public async updateUsername(id: string,username: string, password: string): Promise<string| unknown>{
         try {
            const userExisted: IUser | unknown  = await this.findUser(id);
            if(!userExisted) throw new Error("user not found");
            const check: boolean = await verifyPassword(password, (userExisted as IUser).password!) as boolean;
            if(!check) throw new Error("the password does not match"); 
            const db = this.db;
            await db.runAsync("UPDATE users SET (username=$username) where id=$id ", {$username:username, $id: id});
            return "updated successfully";
        } catch (error) {
            return error;
        }
    }

    public async updatePassword(id: string, oldPassword: string, newPassword: string){
         try {
            const userExisted: IUser | unknown  = await this.findUser(id);
            if(!userExisted) throw new Error("user not found");
            const check: boolean = await verifyPassword(oldPassword, (userExisted as IUser).password!) as boolean;
            if(!check) throw new Error("the password does not match"); 
            const db = this.db;
            const newHashedPassword: string| undefined = await hashPassword(newPassword) as string;
            if(hashPassword === undefined) throw new Error("unable to hash the password, try later");

            await db.runAsync("UPDATE users (password=$password) where id=$id ", {$password: newHashedPassword, $id: id});
            return "updated successfully";
        } catch (error) {
            return error;
        }
    }

    public static getInstance(db: SQLiteDatabase): UserModel{
        if(this.instance == null){
            this.instance = new UserModel(db);
        }

        return this.instance;
    }

    public  getStatus(){
        return this.isConnected;
    }

}

export {
    UserModel
};
