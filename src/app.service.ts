import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RecordsService } from './file/records.service';
import { IRecord } from './record.interface';

@Injectable()
export class AppService {
  constructor(
      private readonly recordsService: RecordsService,
  ) {}

  async getList(): Promise<IRecord[]> {
    return await this.recordsService.getRecordsList();
  }

  async saveRecord(input: Omit<IRecord, "id">): Promise<IRecord> {
     const list = await this.recordsService.getRecordsList();
     const id = list.length > 0 ? ++list.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).shift().id : 1;
     const record = {
       username: input.username,
       id,
     };
     await this.recordsService.saveRecordsList([...list, record]);
     return Promise.resolve(record);
  }

  async getRecordDetail(id: number): Promise<IRecord> {
    const list = await this.recordsService.getRecordsList();
    const record = list.find((listItem) => listItem.id === id);
    if (!record) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'There is no such a record in the system',
      }, HttpStatus.FORBIDDEN);
    }
    return Promise.resolve(record);
  }

  async updateRecord(input: IRecord): Promise<IRecord> {
    const list = await this.recordsService.getRecordsList();
    const record = list.find((listItem) => listItem.id === input.id);
    if (!record) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'There is no such a record in the system',
      }, HttpStatus.FORBIDDEN);
    }
    const records = list.filter((listItem) => listItem.id !== input.id);
    await this.recordsService.saveRecordsList([...records, {
      ...input
    }]);
    return Promise.resolve(input);
  }
}
