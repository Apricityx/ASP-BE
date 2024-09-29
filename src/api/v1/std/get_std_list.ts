import {db} from "@/utils/loadDB";
import {Request, Response} from "express";

interface Student {
    id: number
    name: string
}

export const get_std_list = (req: Request, res: Response) => {
    const stdList = db.prepare('SELECT StdID as id,StdName as name FROM StdData').all() as Student[]
    res.send(stdList)
}