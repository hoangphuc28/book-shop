import { Module } from '@nestjs/common'

import { PostgresModule } from './postgres/postgres.module'

@Module({
  imports: [PostgresModule],
})
export class DatabaseModule {}
