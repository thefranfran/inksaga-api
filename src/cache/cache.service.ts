import { Inject, Injectable } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import { CompressionProvider } from 'src/compression/compression.provider';

@Injectable()
export class CacheService {
  constructor(
    private readonly compression: CompressionProvider,
    @Inject('CACHE_INSTANCE') private readonly cache: Cacheable,
  ) {}

  async get(key: string): Promise<string | null> {
    const value = (await this.cache.get(key)) as string;

    if (!value) {
      return null;
    }

    return JSON.parse(this.compression.decompress(value)) as string;
  }

  async set<T>(key: string, value: T, ttl?: number | string): Promise<void> {
    const save = this.compression.compress(JSON.stringify(value));

    await this.cache.set(key, save, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.cache.delete(key);
  }
}
