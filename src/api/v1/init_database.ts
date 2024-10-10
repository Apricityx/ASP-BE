import {logger} from "@/utils/logger";
import {db} from "@/utils/loadDB";
// import {dbModifier} from '@/utils/modifyDatabase'

export const init_database = (req: any, res: any) => {
    try {
        logger.info('Init std database.');
        // logger.debug(JSON.stringify(dbModifier));
        // 删除学生表
        db.prepare('DROP TABLE IF EXISTS StdData;').run();
        db.prepare('DROP TABLE IF EXISTS AM;').run();
        // 创建学生表
        db.prepare('CREATE TABLE StdData(' +
            'StdID TEXT PRIMARY KEY,' +
            'StdName TEXT);').run();

        db.prepare('CREATE TABLE AM (' +
            'id TEXT PRIMARY KEY,' +
            'name TEXT,' +
            'deadline TEXT,' +
            'description TEXT' +
            'create_time timestamp default (datetime(\'now\', \'localtime\'))' +
            ')').run();
        db.prepare('INSERT INTO StdData (StdID, StdName) VALUES (?, ?);').run('2017212210', '张三');
        db.prepare('INSERT INTO StdData (StdID, StdName) VALUES (?, ?);').run('2017212211', '李四');
        db.prepare('INSERT INTO StdData (StdID, StdName) VALUES (?, ?);').run('2017212212', '王五');
        db.prepare('INSERT INTO StdData (StdID, StdName) VALUES (?, ?);').run('2017212213', '赵六');
        db.prepare('INSERT INTO StdData (StdID, StdName) VALUES (?, ?);').run('2017212214', '孙七');

        logger.warn("数据库已初始化");
        res.send({result: 'Std database initialized.'});
    } catch (e) {
        logger.error('Std database init failed.' + e)
        res.send({result: 'Std database init failed.'});
    }
}