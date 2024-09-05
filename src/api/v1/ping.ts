import Database from 'better-sqlite3'
import * as path from 'path';
import {logger} from '@/utils/logger'
import 'module-alias/register';

export const helloWorld = (res: any, req: any) => {
    req.send({message: 'Sever is running'});
    // 此文件中，将会展示如何使用better-sqlite3库进行数据库操作，并介绍了一些TS的基本规则
    // 若需要在import之外的地方使用@别名路径，需要使用require.resolve
    const dbPath = require.resolve('@/db/storage.db'); // 获取数据库路径，数据库路径会被自动解析为绝对路径
    // logger.debug(dbPath);
    const db = new Database(dbPath);
    db.prepare('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)').run();
    db.prepare('INSERT INTO test (name) VALUES (?)').run('Hello World'); // Hello World会替换掉问号
    const result = db.prepare('SELECT * FROM test').all();
    // 检查result是否为object类型
    // 若这一步不检查，TS编译器会报错，因为logger.info()方法的参数类型为string, 而result可能为undefined类型, 和String类型不符合导致编译不过
    if (typeof result === 'object') {
        logger.debug('Database is working :D Result is:' + JSON.stringify(result));
    } else {
        logger.debug('Database is not working :(');
    }
    db.prepare('DROP TABLE test').run(); // 删除表
    db.close();

}