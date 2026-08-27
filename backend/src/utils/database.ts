import fs from "fs/promises";
import path from "path";
import { Database } from "../types/index.js";

const DB_PATH = path.join(process.cwd(), "db.json");

export async function readDatabase(): Promise<Database> {
    try {
        const data = await fs.readFile(DB_PATH, "utf-8");

        return JSON.parse(data);
    } catch {
        return {
            customers: [],
            orders: []
        };
    }
}

export async function writeDatabase(
    data: Database
): Promise<void> {
    await fs.writeFile(
        DB_PATH,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
}