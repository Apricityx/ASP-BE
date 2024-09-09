import {logger} from "@/utils/logger";
import {dbModifier} from '@/utils/modifyDatabase'

export const init_database = (res: any, req: any) => {
    try{
        logger.info('Init std database.');
        // logger.debug(JSON.stringify(dbModifier));
        dbModifier.dbInit()
        req.send({result: 'Std database initialized.'});
    }
    catch (e){
        logger.error('Std database init failed.' + e)
        req.send({result: 'Std database init failed.'});
    }
}