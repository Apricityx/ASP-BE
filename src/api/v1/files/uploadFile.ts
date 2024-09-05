import multer from 'multer'
import cors from 'cors'
import {logger} from "@/utils/logger";
import {stringify} from "node:querystring";
export const uploadFile = (res: any, req: any) => {
    logger.info('File uploaded.');
}

