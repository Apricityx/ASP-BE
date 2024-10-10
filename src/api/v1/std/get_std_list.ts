import {db} from "@/utils/loadDB";
import {Request, Response} from "express";
import {logger} from "@/utils/logger";

interface Student {
    id: number
    name: string
}

export const get_std_list = (req: Request, res: Response) => {
    logger.connection('Get student list')
    const stdList = db.prepare('SELECT StdID as id,StdName as name FROM StdData').all() as Student[]
    res.send(stdList)
}