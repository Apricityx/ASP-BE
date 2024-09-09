import {logger} from "@/utils/logger";
import {dbModifier} from '@/utils/modifyDatabase'
interface resType {
    stdID: string
    stdName: string
    stdPasswd: string
}

export const addSingleNewStd = (res: resType, req: any) => {
    dbModifier.addSingleNewStd(res.stdID,res.stdName,res.stdPasswd)
}