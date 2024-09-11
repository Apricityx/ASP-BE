// 读取toml文件
import * as fs from 'fs';
import {logger} from "@/utils/logger";
import * as yaml from 'js-yaml';





const Config = () => {
// 从文件中读取字符串
    const tomlPath = require.resolve('@/config.yaml'); // 获取数据库路径，数据库路径会被自动解析为绝对路径
    const tomlStr = fs.readFileSync(tomlPath, 'utf8');
    // logger.debug('读取字符串\n' + tomlStr);
    // 配置文件的默认值
    let defaultConfig: {} = {
        server: '127.0.0.1',
        port: 3000,
        connection_max: 5000
    }
    // 将toml的字符串解析为对象
    let yamlConfig;
    try {
// 解析字符串
        yamlConfig = yaml.load(tomlStr);
    } catch (e: any) {
        logger.error("载入配置出错" + e);
        yamlConfig = {};
    }
    // logger.debug('读取配置' + JSON.stringify(yamlConfig));
    // 将toml的对象合并到config中
    defaultConfig = Object.assign(defaultConfig, yamlConfig);
    // 写回配置到文件
    // logger.debug('写回配置' + yaml.dump(defaultConfig));
    fs.writeFileSync(tomlPath, yaml.dump(defaultConfig));

    return defaultConfig;
}
export default Config;