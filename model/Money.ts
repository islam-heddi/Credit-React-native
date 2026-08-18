import { IMoney } from "@/types/Money";
import { SQLiteDatabase } from "expo-sqlite";
class MoneyModel {
    
    private db!: SQLiteDatabase
    private static instance: MoneyModel | null = null;
    private isConnected: boolean = false;

    private constructor(db: SQLiteDatabase){
        console.log("preparing money table ...");
        this.db = db;
        this.isConnected= true;
        this.createTable(db);
    }

    private async createTable(db: SQLiteDatabase) {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            PRAGMA foreign_keys = ON;
            CREATE TABLE IF NOT EXISTS money (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            fromPerson TEXT NOT NULL, 
            amount NUMBER NOT NULL,
            createDate TEXT NOT NULL,
            isDone BOOLEAN DEFAULT FALSE,
            user_id INTEGER REFERENCES users(id)
            );
        `);
    };

    public async findMoney(user_id: number) {
        try {
            const money: IMoney[] = await this.db.getAllAsync<IMoney>("SELECT * from users where user_id=?", [user_id]);
            return money;
        } catch (error) {
            return error;
        }
    }

    public async addNewMoney(db: SQLiteDatabase, user_id: number,fromPerson: string, amount: number) {
        
        try {
            const createDate = (new Date()).toISOString().split("T")[0];
            await db.runAsync("INSERT INTO money(fromPerson, amount, createDate, user_id) values (?,?,?,?)", [fromPerson, amount.toString(),createDate, user_id]);
            return "saved successfully";
        } catch (error) {
            return error;
        }
    }

    public async updateMoney(db: SQLiteDatabase, id: number, fromPerson: string, amount: string){
        try {
            await db.runAsync("UPDATE money SET fromPerson=$fromPerson, amount=$amount where id=$id", {
                $fromPerson: fromPerson,
                $amount: amount,
                $id: id
            })

            return "update successfull";
        } catch (error) {
            return error;
        }
    }
    /**
     * Update isDone attribute to true
     * @param id 
     * @param user_id 
     * @returns Promise<string, unknown>
     */
    public async updateDoneToTrueMoney(id: number, user_id: number){
        try {
            await this.db.runAsync("UPDATE money SET isDone=TRUE where id=$id and user_id=$user_id", {
                $id:id,
                $user_id: user_id
            })

            return "updated successfully";
        } catch (error) {
            return error;
        }
    }
    
    /**
     * Update isDone attribute to false
     * @param id 
     * @param user_id 
     * @returns Promise<string, unknown>
     */
    public async updateDoneToFalseMoney(id: number, user_id: number){
        try {
            await this.db.runAsync("UPDATE money SET isDone=FALSE where id=$id and user_id=$user_id", {
                $id:id,
                $user_id: user_id
            })

            return "updated successfully";
        } catch (error) {
            return error;
        }
    }
    /**
     * delete a table row depending on user id and id of that row
     * @param id 
     * @param user_id 
     * @returns Promise<string, unknown>
     */
    public async deleteMoney(id: number, user_id: number){
        try {
            await this.db.runAsync("DELETE from money where id=$id and user_id=$user_id", {
                $id: id,
                $user_id: user_id
            })
            
            return "deleted successfully";
        } catch (error) {
            return error
        }
    }

    public static getInstance(db: SQLiteDatabase): MoneyModel{
        if(this.instance == null){
            this.instance = new MoneyModel(db);
            return this.instance;
        }
        return this.instance;
    }


    public getStatus(): boolean {
        return this.isConnected;
    }
}


export {
    MoneyModel
};
