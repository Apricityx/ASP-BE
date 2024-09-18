class Logger {
    error(message: any, ...args: any) {
        // 红色控制台信息
        if (args.length > 0) {
            console.log("\x1b[31m", message);
            console.log(args);
            for (let i = 0; i < args.length; i++) {
                console.log(args[i]);
            }
            console.log("\x1b[0m");
        } else {
            console.log("\x1b[31m", message, "\x1b[0m");
        }
    }

    warn(message: any, ...args: any) {
        // 黄色控制台信息
        if (args.length > 0) {
            console.log("\x1b[33m", message);
            console.log(args);
            for (let i = 0; i < args.length; i++) {
                console.log(args[i]);
            }
            console.log("\x1b[0m");
        } else {
            console.log("\x1b[33m%s\x1b[0m", message);
        }
    }

    info(message: any, ...args: any) {
        // 白色控制台信息
        if (args.length > 0) {
            console.log(message);
            console.log(args);
            for (let i = 0; i < args.length; i++) {
                console.log(args[i]);
            }
        } else {
            console.log(message);
        }
    }

    debug(message: any, ...args: any) {
        // 青色控制台信息
        if (args.length > 0) {
            console.log("\x1b[36m[Debug]", message);
            console.log(args);
            for (let i = 0; i < args.length; i++) {
                console.log(args[i]);
            }
            console.log("\x1b[0m");
        } else {
            console.log("\x1b[36m[Debug]", message, "\x1b[0m")
        }
    }

    connection(message: any, ...args: any) {
        // 蓝色控制台信息
        console.log("\x1b[34m[New Connection] %s\x1b[0m", message);
        if (args.length > 0) {
            console.log(args);
            for (let i = 0; i < args.length; i++) {
                console.log(args[i]);
            }
        }
        console.log("\x1b[34m[Connection End]\x1b[0m");
    }
}

const logger = new Logger();
export {logger};