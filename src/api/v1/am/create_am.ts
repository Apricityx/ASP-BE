import {logger} from "@/utils/logger";
import {db, dbAM} from "@/utils/loadDB";

interface Assignment {
    name: string
    deadline: string
    description: string
}

export const createAM = (req: any, res: any) => {
    logger.connection('AM created: ', req.body)
    const AM: Assignment = req.body
    // 检查是否有重复的作业
    const isDuplicate = db.prepare('SELECT * FROM AM WHERE name = ?').get(AM.name)
    if (isDuplicate) {
        res.send({message: 'AM already exists'})
        return
    }
    db.prepare('INSERT INTO AM (name, deadline, description) VALUES (?, ?, ?)').run(AM.name, AM.deadline, AM.description)
    dbAM.prepare('CREATE TABLE ' + AM.name + "(StdID TEXT,StdName TEXT,is_submitted BOOLEAN DEFAULT(0), submit_time TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')))").run()

    interface STD {
        StdID: string
        StdName: string
    }

    const getStdList = () => {
        return db.prepare('SELECT StdID,StdName FROM StdData').all() as STD[]
    }
    const Stds = getStdList()


    for (const Std of Stds) {
        // logger.debug('INSERT TABLE "' + AM.name + '" (StdID, StdName) VALUES (?, ?)')
        dbAM.prepare('INSERT INTO "' + AM.name + '" (StdID, StdName) VALUES (?, ?)').run(Std.StdID, Std.StdName)
    }
    res.send({message: 'AM created'})
}