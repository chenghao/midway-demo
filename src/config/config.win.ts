import {MidwayAppInfo, MidwayConfig} from "@midwayjs/core";

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  return {
    koa: {
      port: 7001
    },
    // 日志
    midwayLogger: {
      default: {
        level: "debug",
        transports: {
          file: {
            dir: "/home/logs/midway-demo"
          },
          error: {
            dir: "/home/logs/midway-demo"
          }
        }
      },
    },
    // 数据库Ï
    typeorm: {
      dataSource: {
        // 自定义数据源名称
        testDataSource: {
          host: "192.168.0.106",
          logging: true // 启用失败查询的日志记录
        }
        // 更多的数据源配置
      }
    },
    sequelize: {
      dataSource: {
        // 自定义数据源名称
        testDataSource: {
          host: "192.168.0.106",
          timezone: "+08:00",
        }
        // 更多的数据源配置
      }
    },
    mikro: {
      dataSource: {
        // 自定义数据源名称
        testDataSource: {
          host: "192.168.0.106",
        }
        // 更多的数据源配置
      }
    },
    // redis
    redis: {
      clients: {
        instance1: {
          host: "192.168.0.106",
          db: 1,
        },
        instance2: {
          host: "192.168.0.106",
          db: 2,
        }
      }
    },
    // 任务队列
    bull: {
      defaultQueueOptions: {
        // 这些任务存储的 key，都是相同开头，以便区分用户原有 redis 里面的配置
        redis: {
          host: "192.168.0.106",
          db: 3,
        }
      }
    },
    // grpc
    grpcServer: {
      // 定义grpc的请求地址和端口
      url: "192.168.0.103:7001",
    },
    // consul
    consul: {
      provider: {
        // consul server 服务地址
        host: "192.168.0.106",
      },
      service: {
        // 项目注册到consul的id，默认是 name:address:port
        // id: "",
        // 此处是当前这个 midway 应用的地址
        address: "192.168.0.106",
        // 当前 midway 应用的端口
        port: 7001,
        // 名称
        name: "midway-demo"
        // others consul service definition
      }
    }
  };
}
