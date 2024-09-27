// src/app.ts
import express from 'express';
import cors from 'cors'
import 'module-alias/register';
import {helloWorld} from "@/api/v1/ping";
import {upload_file} from "@/api/v1/files/upload_file";
import {logger} from "@/utils/logger";
import {add_single_new_std} from "@/api/v1/std_modify/add_single_std";
import {init_database} from "@/api/v1/init_database";
import Config from "@/utils/loadConfig";
import multer from "multer";
import * as fs from "node:fs";
import {createAM} from "@/api/v1/am/create_am";
import bodyParser from "body-parser";
import {delete_am} from "@/api/v1/am/delete_am";
import {get_am} from "@/api/v1/am/get_am";
import {get_std_name} from "@/api/v1/std/get_std_name";
import {get_std_id_list} from "@/api/v1/std/get_std_id_list";
// 从utils里引入辅助调试的工具：对象logger
// logger对象有error,warn,info,debug四个函数
// 四个函数对应不同的颜色输出文本到控制台
// 用于调试的信息输出务必使用debug()
// 例：logger.debug("Server started.")
// 清屏
console.clear();
const app = express();
const server = app.listen(Config.port, () => {
    logger.info(`=====================================================`);
    logger.info(`|| Server is running on port http://127.0.0.1:${Config.port} ||`);
    logger.info(`=====================================================`);
    // 在此编写初始化代码
    logger.warn('读取配置' + JSON.stringify(Config));


});
server.on('error', (e: NodeJS.ErrnoException) => {
    if (e.code === 'EADDRINUSE') {
        console.clear();
        logger.error(`${Config.port} 端口被占用，请更换端口或者关闭占用该端口的程序`);
    } else {
        logger.error(`服务器错误: ${e.message}`);
    }
});
server.on('close', () => {
    logger.error('服务器关闭');
});
// const PORT = process.env.PORT || Config.port;

app.use(cors())

// 这是注册API的方式 app.get(path, fun);
// path是url的路径，fun需要有req和res两个参数，req管理请求，res管理响应
// ============================================================================================
// 测试API
app.get('/api/v1/', helloWorld); // ping server
// ============================================================================================
// 文件上传API（未实现）
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 创建文件夹
        if (!fs.existsSync('uploads/' + req.body.assignment_id + '/')) {
            fs.mkdirSync('uploads/' + req.body.assignment_id + '/');
            logger.debug(`${req.body.assignment_id}不存在创建文件夹`);
        }
        cb(null, 'uploads/' + req.body.assignment_id + '/');
    },
    filename: function (req, file, cb) {
        const {id} = req.body;
        const extension = file.originalname.split('.').pop();
        const fileName = `${req.body.id}-${req.body.name}-${req.body.assignment_id}.${extension}`;
        // 判断，如果文件已经存在，移动老的文件到old文件夹
        if (fs.existsSync('uploads/' + req.body.assignment_id + '/' + fileName)) {
            if (!fs.existsSync('uploads/' + req.body.assignment_id + '/old/')) {
                fs.mkdirSync('uploads/' + req.body.assignment_id + '/old/');
                logger.debug(`创建OLD文件夹`);
            }
            const random = Math.floor(Math.random() * 1000);
            fs.renameSync('uploads/' + req.body.assignment_id + '/' + fileName, 'uploads/' + req.body.assignment_id + '/old/' + `${req.body.id}-${req.body.name}-${req.body.assignment_id}-${random}.${extension}`);
            logger.debug(`文件${fileName}已存在，移动文件到OLD文件夹`);
        }
        cb(null, fileName);
    }
})
const upload = multer({storage: storage});
app.post('/api/v1/files/upload_file', upload.array('file'), upload_file); // upload files
// ============================================================================================
// 新增学生API
// 单个
app.put('/api/v1/std_modify/add_single_std', add_single_new_std)
// ============================================================================================
// 重置学生数据库
app.get('/api/v1/init_database', init_database)
// ============================================================================================
// 新增作业
app.use(bodyParser.json()); // 确保解析 JSON 请求体
app.post('/api/v1/am/create_am', createAM)
// ============================================================================================
// 删除作业
app.delete('/api/v1/am/delete_am/:id', delete_am)
// ============================================================================================
// 获取作业
app.get('/api/v1/am/get_am', get_am)
// ============================================================================================
// 获取学生名字
app.get('/api/v1/std/get_std_name', get_std_name)
// ============================================================================================
// 获取学生列表
app.get('/api/v1/std/get_std_id_list', get_std_id_list)
// 404
app.use((req, res) => {
    logger.error('Wrong URL request: ' + req.url);
    res.status(404).send({message: '404 Not Found'});
});
// ============================================================================================
