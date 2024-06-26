import { MidwayAppInfo, MidwayConfig } from "@midwayjs/core";
import { join } from "path";
import { LoggerInfo } from "@midwayjs/logger";
import { getCurrentDateStrSync } from "../interface";
import { MySqlDriver } from "@mikro-orm/mysql";

export default (appInfo: MidwayAppInfo): MidwayConfig => {
    return {
        keys: "1705388071665_1649",
        koa: {
            port: 7001,
            //自定义配置上下文日志
            contextLoggerFormat: (info) => {
                const ctx = info.ctx;
                // 处理ip, 只取ip4
                let ip = ctx.ip;
                ip = ip.substring(ip.lastIndexOf(":") + 1);

                return `${getCurrentDateStrSync()} ${info.LEVEL} [${ip}] [${ctx.header.traceid} ${ctx.spanid}] [${ctx.path} ${ctx.method}] ${
                    Date.now() - ctx.startTime
                }ms -- ${info.message}`;
            },
        },
        // 跨域配置
        cors: {
            // 设置 Access-Control-Allow-Methods 的值
            // 允许跨域的方法，【默认值】为 GET,HEAD,PUT,POST,DELETE,PATCH
            allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
            // 设置 Access-Control-Allow-Origin 的值，【默认值】会获取请求头上的 origin
            // 也可以配置为一个回调方法，传入的参数为 request，需要返回 origin 值
            // 如果设置了 credentials，则 origin 不能设置为 *
            origin: "*",
            // 设置 Access-Control-Allow-Headers 的值，【默认值】会获取请求头上的 Access-Control-Request-Headers
            allowHeaders: "*",
            // 设置 Access-Control-Allow-Credentials，【默认值】false
            // 也可以配置为一个回调方法，传入的参数为 request，返回值为 true 或 false
            credentials: false,
            // 设置 Access-Control-Max-Age
            maxAge: 3600,
        },
        // 数据库
        typeorm: {
            dataSource: {
                // 自定义数据源名称
                testDataSource: {
                    type: "mysql",
                    charset: "utf8mb4",
                    host: "192.168.1.55",
                    port: 3306,
                    username: "root",
                    password: "123456",
                    database: "test", // 数据库名
                    synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
                    logging: ["error"], // 启用失败查询的日志记录
                    maxQueryExecutionTime: 1000, // 记录所有运行超过1秒的查询
                    poolSize: 10,
                    dateStrings: true, // mysql 返回时间按 DATETIME 格式返回，只对 mysql 生效
                    // 或者扫描形式
                    entities: ["**/entity/*.entity{.ts,.js}"],
                    // 传入订阅类
                    // subscribers: [EverythingSubscriber]
                },
                // 更多的数据源配置
            },
            // 多个数据源时可以用这个指定默认的数据源
            defaultDataSourceName: "testDataSource",
        },
        // sequelize
        sequelize: {
            dataSource: {
                // 第一个数据源，数据源的名字可以完全自定义
                testDataSource: {
                    database: "test",
                    username: "root",
                    password: "123456",
                    host: "192.168.1.55",
                    port: 3306,
                    dialect: "mysql",
                    define: {
                        charset: "utf8mb4",
                        // 默认情况下, Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 这些字段会自动进行管理
                        // 每当你使用Sequelize 创建或更新内容时, 这些字段都会被自动设置.
                        // createdAt 字段将包含代表创建时刻的时间戳,
                        // updatedAt 字段将包含最新更新的时间戳.
                        // 对于带有 timestamps: false 参数的模型,可以禁用此行为，调用数据库自带的创建时间和更新时间
                        timestamps: false,
                        // 不想要 createdAt
                        createdAt: false,
                        // 不想要 updatedAt
                        updatedAt: false,
                    },
                    timezone: "+08:00",
                    dialectOptions: {
                        dateStrings: true,
                        typeCast: true,
                    },
                    logging: true,
                    entities: ["**/sequelize_entity/*.entity{.ts,.js}"],
                    repositoryMode: true,
                    // 本地的时候，可以通过 sync: true 直接 createTable
                    sync: false,
                },
            },
            // 多个数据源时可以用这个指定默认的数据源
            defaultDataSourceName: "testDataSource",
        },
        // mikro
        mikro: {
            dataSource: {
                testDataSource: {
                    host: "192.168.1.55",
                    port: 3306,
                    user: "root",
                    password: "123456",
                    charset: "utf8mb4",
                    timezone: "+08:00",
                    entities: ["**/mikro_entity/*.entity{.ts,.js}"],
                    dbName: "test",
                    debug: true,
                    persistOnCreate: true,
                    driver: MySqlDriver, // 这里使用了 sqlite 做示例
                    allowGlobalContext: true,
                },
            },
            // 多个数据源时可以用这个指定默认的数据源
            defaultDataSourceName: "testDataSource",
        },
        // 日志
        midwayLogger: {
            default: {
                level: "info",
                format: (info: LoggerInfo) => {
                    return `${getCurrentDateStrSync()} ${info.LEVEL} -- ${info.message}`;
                },
                contextLoggerFormat: {},
                transports: {
                    file: {
                        dir: `/home/logs/midway-demo`,
                        maxSize: "50m",
                        maxFiles: "3d",
                        fileLogName: "midway-demo-app.log",
                        zippedArchive: true,
                    },
                    error: {
                        dir: "/home/logs/midway-demo",
                        maxSize: "50m",
                        maxFiles: "3d",
                        fileLogName: "midway-demo-error.log",
                        zippedArchive: true,
                    },
                },
            },
        },
        // redis
        redis: {
            clients: {
                instance1: {
                    host: "192.168.1.55",
                    port: 6379,
                    password: "123456",
                    db: 1,
                    commandTimeout: 10000,
                    connectTimeout: 10000,
                },
                instance2: {
                    host: "192.168.1.55",
                    port: 6379,
                    password: "123456",
                    db: 2,
                    commandTimeout: 10000,
                    connectTimeout: 10000,
                },
            },
        },
        // 监控
        prometheus: {
            labels: {
                APP_NAME: "midway-demo",
            },
        },
        // http请求
        axios: {
            default: {
                // 所有实例复用的配置
                timeout: 3000, // default is `0` (no timeout)
                // `withCredentials` indicates whether or not cross-site Access-Control requests
                // should be made using credentials
                withCredentials: false, // default
            },
            clients: {
                default: {
                    // `headers` are custom headers to be sent
                    headers: {},
                },
                // 自定义实例，可以配置多个
                tronAxios: {
                    baseURL: "https://api.trongrid.io",
                    // `headers` are custom headers to be sent
                    headers: {},
                },
            },
        },
        // 任务队列
        bull: {
            // 自动清理启动时前一次未调度的 重复执行任务, 默认 true
            clearRepeatJobWhenStart: true,
            defaultQueueOptions: {
                // 默认的任务配置
                defaultJobOptions: {
                    // 保留成功的 10 条记录
                    removeOnComplete: 10,
                    // 保留失败的 10 条记录
                    removeOnFail: 10,
                },
                // 这些任务存储的 key，都是相同开头，以便区分用户原有 redis 里面的配置
                prefix: "{midway-demo}",
                redis: {
                    host: "192.168.1.55",
                    port: 6379,
                    password: "123456",
                    db: 3,
                    commandTimeout: 10000,
                    connectTimeout: 10000,
                },
            },
            contextLoggerFormat: (info) => {
                const { jobId, from } = info.ctx;
                return `${getCurrentDateStrSync()} ${info.LEVEL} [${jobId} ${from.name}] -- ${info.message}`;
            },
        },
        // grpc
        grpcServer: {
            // 定义grpc的请求地址和端口
            url: "192.168.1.55:7701",
            services: [
                {
                    protoPath: join(appInfo.appDir, "proto/demo.proto"),
                    package: "protocol",
                },
            ],
        },
        // consul
        consul: {
            provider: {
                // 注册本服务
                register: true,
                // 应用正常下线反注册
                deregister: true,
                // consul server 服务地址
                host: "192.168.1.55",
                // consul server 服务端口
                port: "8500",
                // 调用服务的策略(默认选取 random 具有随机性)
                strategy: "random",
            },
            service: {
                // 项目注册到consul的id，默认是 name:address:port
                // id: "",
                // 此处是当前这个 midway 应用的地址
                address: "192.168.1.55",
                // 当前 midway 应用的端口
                port: 7001,
                // 做泳道隔离等使用
                tags: ["tag1", "tag2"],
                // 名称
                name: "midway-demo",
                // others consul service definition
            },
        },
    };
};
