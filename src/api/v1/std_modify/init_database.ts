import {logger} from "@/utils/logger";
import {db} from "@/utils/loadDB";
// import {dbModifier} from '@/utils/modifyDatabase'

export const init_database = (req: any, res: any) => {
    try{
        logger.info('Init std database.');
        // logger.debug(JSON.stringify(dbModifier));
        // 删除学生表
        db.prepare('DROP TABLE IF EXISTS StdData;').run();
        // 创建学生表
        db.prepare('CREATE TABLE StdData(' +
            'StdID TEXT PRIMARY KEY,' +
            'StdName TEXT').run();
        logger.warn("数据库已初始化");
        res.send({result: 'Std database initialized.'});
    }
    catch (e){
        logger.error('Std database init failed.' + e)
        res.send({result: 'Std database init failed.'});
    }
}