import Database from "better-sqlite3";

const dbPath = require.resolve('@/db/storage.db'); // 获取数据库路径，数据库路径会被自动解析为绝对路径
const db = new Database(dbPath);
export {db};