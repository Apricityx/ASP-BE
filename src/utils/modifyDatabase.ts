// 主要实现两个功能：学生的删除与添加

import Database from "better-sqlite3";
import {logger} from "@/utils/logger";

const dbPath = require.resolve('@/db/storage.db'); // 获取数据库路径，数据库路径会被自动解析为绝对路径
const db = new Database(dbPath);

class DBModifierClass {
    addSingleNewStd(StdID: string, StdName: string, StdPasswd: string) {
        // 添加学生
        try {
            db.prepare('INSERT INTO StdData (StdID, StdName, StdPasswd) VALUES (?, ?, ?)').run(StdID, StdName, StdPasswd);
        } catch (e: any) {
            logger.error("数据库插入出错：" + e);
        }
    }

    dbInit() {
        // 删除学生表
        db.prepare('DROP TABLE IF EXISTS StdData;').run();
        // 创建学生表
        db.prepare('CREATE TABLE StdData(' +
            'StdID TEXT PRIMARY KEY,' +
            'StdName TEXT,' +
            'StdPasswd TEXT,' +
            'ATLoginCheck TIMESTAMP DEFAULT CURRENT_TIMESTAMP);').run();
        db.prepare('INSERT INTO StdData (StdID, StdName, StdPasswd) VALUES (?, ?, ?)').run('2017212210', '张三', '123456')
        db.prepare('INSERT INTO StdData (StdID, StdName, StdPasswd) VALUES (?, ?, ?)').run('2017212212', '张三', '123456')
        const result = db.prepare('SELECT * FROM StdData').all();
        logger.debug("数据库初始化成功：" + JSON.stringify(result));
        logger.warn("数据库已初始化");
    }
}

const dbModifier = new DBModifierClass();
export {dbModifier};