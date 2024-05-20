// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User],
        migrations: ['dist/migrations/*.js'],
        synchronize: configService.get('SYNCHRONIZE') === 'true',
        ssl:
          configService.get('SSL_ENABLED') === 'true'
            ? {
                rejectUnauthorized: false,
                ca: fs
                  .readFileSync(
                    path.join(__dirname, configService.get('SSL_CA_PATH')),
                  )
                  .toString(),
              }
            : false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
})
export class DatabaseModule {}
