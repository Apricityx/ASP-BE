import {db, dbAM} from "@/utils/loadDB";
import {Request, Response} from "express";
import {logger} from "@/utils/logger";

interface AssignmentPreview {
    name: string
    deadline: string
    show?: boolean
    description: string
    total: number
    submitted: number
}

interface AssignmentDetailed {
    name: string
    deadline: string
    show?: boolean
    description: string
}

export const get_am = (req: Request, res: Response) => {
    // 应当设置requestType ?request_type=preview | detailed
    const requestType = req.query.request_type as "preview" | "detailed"
    if (requestType === "preview") {
        const AMList = db.prepare('SELECT name, deadline, description FROM AM').all() as AssignmentPreview[]
        for (const i in AMList) {
            const submission = dbAM.prepare(`SELECT COUNT(CASE WHEN is_submitted = 1 THEN 1 END) AS submitted,COUNT(*) AS total FROM ${AMList[i].name}`).get() as {
                submitted: number
                total: number
            }
            logger.debug(submission)
            AMList[i].total = submission.total
            AMList[i].submitted = submission.submitted
        }
        res.send(AMList)
        return
    } else if (requestType === "detailed") {
        const AMList = db.prepare('SELECT name, deadline, description FROM AM').all() as AssignmentPreview[]
        res.send(AMList)
        return;
    } else {
        res.status(400).send('Bad request')
        return;
    }
    // const AMList = db.prepare('SELECT name, deadline FROM AM').all()
    // res.send(AMList)
}