import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresSQLService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  private _LOG = new Logger(PostgresSQLService.name);

  createTypeOrmOptions(): TypeOrmModuleOptions {
    try {
      const _host = this.configService.get<string>('DATABASE_HOST');
      const _user = this.configService.get<string>('DATABASE_USER');
      const _port = this.configService.get<string>('DATABASE_PORT');
      const _pass = this.configService.get<string>('DATABASE_PASSWORD');
      const _dbName = this.configService.get<string>('DATABASE_NAME');
      const url = `postgres://${_user}:${_pass}@${_host}:${_port}/${_dbName}`;

      return {
        type: 'postgres',
        url: url,
        autoLoadEntities: true,
        logging: true,
        synchronize: false,
      };
    } catch (error) {
      this._LOG.error(error);
      throw error;
    }
  }
}
