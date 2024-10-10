import {logger} from "@/utils/logger";
import {db} from "@/utils/loadDB";
import {Request, Response} from "express";

interface Student {
    id: string
    name: string
}

export const delete_std = (req: Request, res: Response) => {
    logger.warn(`Delete Students:${JSON.stringify(req.body)}`)
    const STDList: Student[] = req.body
    try {
        for (const STD of STDList) {
            db.prepare('DELETE FROM StdData WHERE StdID = ?').run(STD.id);
        }
    } catch (e: any) {
        logger.error("数据库删除学生出错：" + e);
    }
    res.send({
        status: "success"
    })
}