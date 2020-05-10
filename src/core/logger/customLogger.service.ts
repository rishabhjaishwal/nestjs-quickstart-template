import * as winston from 'winston'
import * as path from 'path';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CustomLogger   {
private logger: winston.Logger;
    constructor(labelName= 'Application Log') {
        this.initializeLogger(labelName);
    }

    initializeLogger(labelName): winston.Logger {
      try {
        const {combine, timestamp, json, label} = winston.format
       return this.logger = winston.createLogger({
            level: 'info',
            exitOnError: false,
            format: combine(
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                  }),
                label({ label: labelName }),
               json(),
            ),
            transports:[
                new winston.transports.File({dirname : path.join(__dirname,'../../../log/error/'),filename:'error.log',level:'error', handleExceptions: true}),
                new winston.transports.File({dirname : path.join(__dirname,'../../../log/info/'),filename:'info.log',level:'info', handleExceptions: true}),
                new winston.transports.Console({ level: 'debug', handleExceptions: true }),
            ]
        })
      } catch(e) {
        console.log(e);
      }
    }

    error(message: any, trace = '') {
      if(JSON.parse(JSON.stringify(message))['operation']) {
        this.logger.error(message);
      } else {
        // console.log(trace);
        this.logger.error("Error : " + message);

      }
        // this.logger.error(message, trace);
      }
    
      warn(message: string) {
        this.logger.log("warn", "Warn : " + message);
        //this.logger.warn('warn', message);
      }

      debug(message: string) {
        this.logger.log("debug", "Debug : " + message);
        //this.logger.warn('warn', messa);
      }

      verbose(message: string) {
        this.logger.log("verbose", "Verbose : " + message);
        //this.logger.warn('warn', message);
      }
    
      log(message: any) {
        if(JSON.parse(JSON.stringify(message))['operation']) {
          this.logger.log('info',message);
        } else {
          this.logger.log('info',"info : " + message);
  
        }
        // this.logger.log('info', message);
      }
}
