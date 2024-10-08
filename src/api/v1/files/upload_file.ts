import multer from 'multer'
import cors from 'cors'
import {logger} from "@/utils/logger";
import {stringify} from "node:querystring";
import * as path from "node:path";
import {dbAM} from "@/utils/loadDB";

export const upload_file = (req: any, res: any) => {
    try {
        // logger.debug(req.body)
        const {id, name, assignment_id} = req.body;
        const files = req.files as Express.Multer.File[];
        if (!id || !name || files.length === 0) {
            return res.status(400).send('缺少必要的字段');
        }
        logger.connection(JSON.stringify(req.body));
        // 将学生标记为已提交
        dbAM.prepare(`UPDATE ${assignment_id} SET is_submitted = 1 WHERE StdID = ?`).run(id);
        res.status(200).send({message: '上传成功', files: files.map(file => file.filename)});
    } catch (error) {
        console.error('上传失败', error);
        res.status(500).send('上传失败');
    }
}

