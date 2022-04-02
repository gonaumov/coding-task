import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IRecord } from './record.interface';

@Controller('list')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getRecordsList(): Promise<IRecord[]> {
        return this.appService.getList();
    }

    @Get('/:id')
    getRecordsDetail(@Param('id', ParseIntPipe) id: number): Promise<IRecord> {
        return this.appService.getRecordDetail(id);
    }

    @Patch()
    updateRecord(
        @Body() userData: IRecord,
    ): Promise<IRecord> {
        return this.appService.updateRecord(userData);
    }

    @Post()
    saveRecord(
        @Body() userData: Omit<IRecord, "id">,
    ): Promise<IRecord> {
        return this.appService.saveRecord(userData);
    }
}
