import Database from "better-sqlite3";
import {logger} from "@/utils/logger";

// logger.debug(require.resolve('@/db/storage .db'));
const db = new Database(require.resolve('@/db/storage.db'));
const dbAM = new Database(require.resolve('@/db/assignment.db'));
export {db, dbAM};