import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsService } from './file/records.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RecordsService],
})
export class AppModule {}
