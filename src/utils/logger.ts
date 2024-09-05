class Logger {
    error(message: string) {
        // 红色控制台信息
        console.log("\x1b[31m%s\x1b[0m", message);
    }

    warn(message: string) {
        // 输出黄色控制台信息
        console.log("\x1b[33m%s\x1b[0m", message);
    }

    info(message: string) {
        // 白色控制台信息
        console.info(message);
    }

    debug(message: string) {
        // 青色控制台信息
        console.log("\x1b[36m[Debug] %s\x1b[0m", message);
    }
}

const logger = new Logger();
export {logger};