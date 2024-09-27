import {db} from "@/utils/loadDB";

export const get_am = (req: any, res: any) => {
    const AMList = db.prepare('SELECT name, deadline FROM AM').all()
    res.send(AMList)
}