import { createKeyv } from '@keyv/redis';
import { Module } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import { CompressionModule } from 'src/compression/compression.module';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CompressionModule.register({
      compress: true,
    }),
  ],
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      useFactory: () => {
        const secondary = createKeyv({
          username: 'default',
          password: '8kvgJPzCRZ97B0m3kMsu8xzbIQFqShpY',
          socket: {
            host: 'redis-13480.c339.eu-west-3-1.ec2.redns.redis-cloud.com',
            port: 13480,
          },
        });
        return new Cacheable({ secondary, ttl: '4h' });
      },
    },
    CacheService,
  ],
  exports: ['CACHE_INSTANCE', CacheService],
})
export class CacheModule {}
