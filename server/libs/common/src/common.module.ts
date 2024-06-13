import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';

@Module({
  providers: [DatabaseModule],
  exports: [],
})
export class CommonModule {}
