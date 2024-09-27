import {logger} from "@/utils/logger";
import {Response, Request} from "express";
import {db} from "@/utils/loadDB";

interface Query {
    std_id: string;
}

export const get_std_name = (req: Request<{}, {}, {}, Query>, res: Response) => {
    logger.debug(req.query as Query);
    const nameQuery = db.prepare("SELECT StdName FROM StdData WHERE StdID = ?").get(req.query.std_id);
    if (nameQuery) {
        const name = nameQuery as { StdName: string }
        res.send({
            name: name.StdName
        })
    } else {
        res.send({
            name: null
        })
    }
}
