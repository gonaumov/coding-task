import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { IRecord } from '../record.interface';

@Injectable()
export class RecordsService {
    private readonly fileName: string = 'storage.json';

    public async getRecordsList(): Promise<IRecord[]> {
        const filePath = path.resolve(this.fileName);
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    public async saveRecordsList(input: IRecord[]): Promise<IRecord[]> {
        const filePath = path.resolve(this.fileName);
        const inputData = JSON.stringify(input);
        return new Promise(function (resolve, reject) {
            fs.writeFile(filePath, inputData, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(input);
                }
            });
        });
    }
}
