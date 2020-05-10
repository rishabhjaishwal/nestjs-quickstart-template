import { categoryEnum } from './enum/category.enum';
import {CustomLogger} from '../../core/logger/customLogger.service';
import { ScrapperStatistics } from '../../constants/data';
import { readFile, readFileSync } from 'fs';
import * as path from 'path';
import { promisify } from 'util';

export abstract class AbstractService {
    name;
    category: categoryEnum;
    config;
    logger: CustomLogger;
    scheduleinfo: string;
    statistic: ScrapperStatistics;

    constructor() {
        this.logger = new CustomLogger('Service Log');
        this.statistic = {
            running : false,
            lastStartTime: null,
            error : false,
            lastErrorTime: null,
            lastStopTime: null,
            lastRestartTime: null
        }
    }
    
    public async start(): Promise<any> {
        try {
            this.statistic.running = true;
            await this.performTask();
            this.statistic.lastStartTime = new Date();
            this.statistic.error = false;
            const fullLog = {errorStatus: false, operation: 'start', timestamp: this.statistic.lastStartTime};
            this.logger.log(fullLog);
            return true;
        } catch(e) {
            const errorLog = {error:e.message , operation: 'start', errorStatus:true, timestamp: new Date()};
            this.logger.error(errorLog);
            this.statistic.running = false;
            this.statistic.error = true;
            this.statistic.lastErrorTime = new Date();
            this.logger.log(errorLog);
            return false;
        }
    }
    
    public async stop(): Promise<any> {
        try {
            this.statistic.running = false;
            await this.stopPerformTask();
            this.statistic.lastStopTime = new Date();
            this.statistic.error = false;
            const fullLog = {errorStatus: false, operation: 'stop', timestamp: this.statistic.lastStopTime};
            this.logger.log(fullLog);
            return true;
        } catch(e) {
            const errorLog = {error:e.message , operation: 'stop', errorStatus:true, timestamp: new Date()};
            this.logger.error(errorLog);
            this.statistic.running = false;
            this.statistic.error = true;
            this.statistic.lastErrorTime = new Date();
            this.logger.log(errorLog);
            return false;
        }
    }

    public async restart(): Promise<any> {
        try {
            this.statistic.running =false;
            await this.restartTask();
            this.statistic.lastRestartTime = new Date();
            this.statistic.error = false;
            const fullLog = {errorStatus: false, operation: 'restart', timestamp: this.statistic.lastRestartTime};
            this.logger.log(fullLog);
            return true;
        } catch(e) {
            const errorLog = {error:e.message , operation: 'restart', errorStatus:true, timestamp: new Date()};
            this.logger.error(errorLog);
            this.statistic.running = false;
            this.statistic.error = true;
            this.statistic.lastErrorTime = new Date();
            this.logger.log(errorLog);
            return false; 
        }
    }

    public  getStatistic(): ScrapperStatistics {
        return this.statistic;     
    }

    public  getLogger(): CustomLogger {
        return this.logger;
    }

    public async  getLogStream(logName: string): Promise<any> {
        const promisified = promisify(readFile);
        const reading  = await  promisified(path.join(__dirname,`../../../log/error/${logName}.log`),'UTF8');
        return reading.split(/\r?\n/);
    }

    public abstract performTask(): Promise<any>;
    public abstract stopPerformTask(): Promise<any>;
    public abstract restartTask() : Promise<any>;

    public abstract getCustomStatistics(): Promise<any>;
    public abstract reportSuccess(): Promise<any>;
    public abstract reportError(error : string): Promise<any>;
    public abstract reportWarning(warning : string): Promise<any>;
    public abstract reportCompletion(): Promise<any>;
    public abstract reportCrash(): Promise<any>;
    public abstract getUpdatedRowsCount(days:number): Promise<number>;
    public abstract startServiceImpl(): Promise<void>;
    public abstract runScheduledTask(): Promise<void>;




}