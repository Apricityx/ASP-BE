import {db, dbAM} from "@/utils/loadDB";
import {logger} from "@/utils/logger";
import {SqliteError} from "better-sqlite3";

export const delete_am = (req: any, res: any) => {
    const AMName = req.params.id
    logger.connection("Deleting", req.params)
    try {
        db.prepare('DELETE FROM AM WHERE name = ?').run(AMName)
        dbAM.prepare('DROP TABLE ' + AMName).run()
    } catch (e) {
        logger.warn("删除表失败：" + e)
        res.send({message: 'AM delete failed'})
    }
    res.send({message: 'AM deleted'})
}