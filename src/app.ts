// src/app.ts
import express from 'express';
import cors from 'cors'
import 'module-alias/register';
import {helloWorld} from "@/api/v1/ping";
import {upload_file} from "@/api/v1/files/upload_file";
import {logger} from "@/utils/logger";
import {addSingleNewStd} from "@/api/v1/std_modify/add_single_std";
import {init_database} from "@/api/v1/std_modify/init_database";
import Config from "@/utils/loadConfig";
// 从utils里引入辅助调试的工具：对象logger
// logger对象有error,warn,info,debug四个函数
// 四个函数对应不同的颜色输出文本到控制台
// 用于调试的信息输出务必使用debug()
// 例：logger.debug("Server started.")

logger.warn('读取配置' + JSON.stringify(Config()));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

// 这是注册API的方式 app.get(path, fun);
// path是url的路径，fun需要有req和res两个参数
// ============================================================================================
// 测试API
app.get('/api/v1/', helloWorld); // ping server
// ============================================================================================
// 文件上传API（未实现）
app.post('/api/v1/files/upload_file', upload_file); // upload files
// ============================================================================================
// 新增学生API
// 单个
app.put('/api/v1/std_modify/add_single_std', addSingleNewStd)
app.listen(PORT, () => {
    logger.info(`Server is running on port http://127.0.0.1:${PORT}.`);
});
// 重置学生数据库
app.get('/api/v1/std_modify/init_database', init_database)

