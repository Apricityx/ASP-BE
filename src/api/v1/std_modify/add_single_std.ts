import {logger} from "@/utils/logger";
import {db} from "@/utils/loadDB";
interface resType {
    stdID: string
    stdName: string
    stdPasswd: string
}

export const addSingleNewStd = (req: resType, res: any) => {
    try {
        db.prepare('INSERT INTO StdData (StdID, StdName, StdPasswd) VALUES (?, ?, ?)').run(req.stdID,req.stdName,req.stdPasswd);
    } catch (e: any) {
        logger.error("数据库插入出错：" + e);
    }
}