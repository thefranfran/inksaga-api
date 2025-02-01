import { SetMetadata } from '@nestjs/common';

export const CacheTTL = (ttl: string | number) => SetMetadata('cache-ttl', ttl);
