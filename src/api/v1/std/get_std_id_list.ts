import {Request, Response} from "express";
import {db} from "@/utils/loadDB";
import {logger} from "@/utils/logger";

export const get_std_id_list = (req: Request, res: Response) => {
    const stdList = db.prepare("SELECT StdID from StdData").all()
    logger.debug(stdList)
    res.send(stdList)
}