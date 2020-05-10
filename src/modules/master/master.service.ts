import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserData } from './entities/user.entity';
import { AbstractService } from './abstractService';
import * as puppeteer from 'puppeteer';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class ExampleService extends AbstractService {
  public serviceObj = new BehaviorSubject<any>(null);
    constructor(
        @InjectRepository(UserData)
        private usersRepository: Repository<UserData>,
        private httpService: HttpService
      ) {
        super();
      }
    
      async findAll(): Promise<UserData[]> {
        // this.httpService.get('http://dummy.restapiexample.com/api/v1/employees').subscribe(res => console.log(res));
        this.start();
        const log = await this.getLogStream('error');
        // console.log(log);
        return this.usersRepository.find();
      }
    
      findOne(id: string): any{
        this.stop();
        // this.usersRepository.findOne(id);
        return {hello:1};
      }
    
      async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
      }


  async getCustomStatistics() : Promise<any> {
    return;
  }

  async reportSuccess() : Promise<any> {
    return;

  }


  async reportError(error : string) : Promise<any> {
    return;

  }

  async reportWarning(warning : string) : Promise<any> {
    return;

  }

  async reportCompletion() : Promise<any> {
    return;

  }  
  
  async reportCrash() : Promise<any> {
    return;

  }  
  
  async startServiceImpl() : Promise<any> {
    return;

  }

  async getUpdatedRowsCount(days: number) : Promise<number> {

    return 1;
  }

  async runScheduledTask() : Promise<any> {
    return;
  }

  async performTask(): Promise<any> {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    this.serviceObj.next(browser);
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    await page.pdf({path: '../hn.pdf', format: 'A4'});
    return;
  }

  async restartTask(): Promise<any> {
    return;
  }

  async stopPerformTask(): Promise<any> {
    let instance;
    this.serviceObj.subscribe(res =>instance = res);
    instance.close();
    return;
  }
}
