import {Response, Request} from "express";
import {logger} from "@/utils/logger";

export const query_am = (req: Request, res: Response) => {
    logger.debug(req.body)
}
