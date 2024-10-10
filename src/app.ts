// src/app.ts
import express from 'express';
import cors from 'cors'
import 'module-alias/register';
import {helloWorld} from "@/api/v1/ping";
import {upload_file} from "@/api/v1/files/upload_file";
import {logger} from "@/utils/logger";
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
import {get_std_list} from "@/api/v1/std/get_std_list";
import * as path from "node:path";
import {add_new_std} from "@/api/v1/std_modify/add_new_std";
import {delete_std} from "@/api/v1/std_modify/delete_std";

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
    // 初始化static_resources文件夹
    if (!fs.existsSync('static_resources/')) {
        fs.mkdirSync('static_resources/');
        logger.debug('创建static_resources文件夹');
    }
    // 将src/res文件夹下的文件复制到static_resources文件夹下
    const sourceFileDir = path.resolve(__dirname, 'res');
    const targetFileDir = path.resolve('./static_resources');
    fs.readdirSync(sourceFileDir).forEach(file => {
        fs.copyFileSync(sourceFileDir + '/' + file, targetFileDir + '/' + file);
        logger.debug('复制文件: ' + file);
    })
    logger.debug('sourceFileDir: ' + sourceFileDir);
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
        // 检查是否有uploads文件夹
        if (!fs.existsSync('uploads/')) {
            fs.mkdirSync('uploads/');
            logger.debug('创建uploads文件夹');
        }
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
app.use(bodyParser.json()); // 确保解析 JSON 请求体
app.post('/api/v1/files/upload_file', upload.array('file'), upload_file); // upload files
// ============================================================================================
// 新增学生API
app.post('/api/v1/std_modify/add_new_std', add_new_std)
// 删除学生API
app.put('/api/v1/std_modify/delete_std', delete_std)
// ============================================================================================
// 重置学生数据库
app.get('/api/v1/init_database', init_database)
// ============================================================================================
// 新增作业
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
// 获取学生ID列表
app.get('/api/v1/std/get_std_id_list', get_std_id_list)
// ============================================================================================
// 获取学生完整列表
app.get('/api/v1/students/get_std_list', get_std_list)
// ============================================================================================
// 下载示例文件
app.get('/download/:file', (req, res) => {
    res.download(`static_resources/${req.params.file}`);
    //输出完整访问路径
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    logger.debug(fullUrl)
})
// ============================================================================================
// 404
app.use((req, res) => {
    logger.error('Wrong URL request: ' + req.url);
    res.status(404).send({message: '404 Not Found'});
});
// ============================================================================================
