import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [DBModule, JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
