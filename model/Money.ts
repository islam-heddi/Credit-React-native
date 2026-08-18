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
            CREATE TABLE IF NOT EXISTS money (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL, 
            amount NUMBER NOT NULL,
            createDate TEXT NOT NULL,
            returned BOOLEAN DEFAULT FALSE
            );
        `);
    };

    public async addNewMoney(db: SQLiteDatabase, name: string, amount: number) {
        
        try {
            const createDate = (new Date()).toISOString().split("T")[0];
            await db.runAsync("INSERT INTO money(name, amount, createDate) values (?,?,?)", [name, amount.toString(),createDate]);
            return "saved successfully";
        } catch (error) {
            return error;
        }
    }

    public async updateMoney(db: SQLiteDatabase, id: number, name: string, amount: string){
        try {
            await db.runAsync("UPDATE money SET name=$name, amount=$amount where id=$id", {
                $name: name,
                $amount: amount,
                $id: id
            })

            return "update successfull";
        } catch (error) {
            return error;
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