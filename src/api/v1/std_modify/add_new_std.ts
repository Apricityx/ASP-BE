import {logger} from "@/utils/logger";
import {db} from "@/utils/loadDB";
import {Request, Response} from "express";

interface Student {
    id: string
    name: string
}

export const add_new_std = (req: Request, res: Response) => {
    logger.connection(`New Students:${JSON.stringify(req.body)}`)
    const STDList: Student[] = req.body
    try {
        for (let i: number = STDList.length - 1; i >= 0; i--) {
            const STD = STDList[i]
            // 将id转为字符串
            STD.id = STD.id.toString();
            db.prepare("INSERT INTO StdData (StdID, StdName) VALUES (?, ?)").run(STD.id, STD.name);
        }
    } catch
        (e: any) {
        logger.error("数据库插入出错：" + e);
    }
    res.send({
        status: "success"
    })
}