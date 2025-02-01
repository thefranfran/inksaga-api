import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private readonly cacheService: CacheService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ttl =
      this.reflector.get<string>('cache-ttl', context.getHandler()) || '10m';

    const request = context.switchToHttp().getRequest<Request>();
    const key = this.generateCacheKey(request);

    return from(this.cacheService.get(key)).pipe(
      switchMap((cache) => {
        if (cache) {
          return of(cache);
        }

        return this.handleNewRequest(next, key, ttl);
      }),
      catchError(() => throwError(() => new BadGatewayException())),
    );
  }

  private handleNewRequest(
    next: CallHandler,
    key: string,
    ttl: string,
  ): Observable<any> {
    return next.handle().pipe(
      tap((response: Response) => {
        this.compressCacheStrategy(response, key, ttl).catch(() => {});
      }),
    );
  }

  private async compressCacheStrategy(
    response: Response,
    key: string,
    ttl: string,
  ) {
    try {
      await this.cacheService.set(key, response, ttl);
    } catch (error) {
      console.error('Compression/cache error:', error);
    }
  }

  private generateCacheKey(request: Request): string {
    const method = request.method;
    const url = request.url;
    const params = url.split('?')[1];

    if (!params) {
      return `${method}:${url}`;
    }

    const values = params.split('&').map((param) => param.split('=')[1]);

    return `${method}:chapters-${values.join('-')}`;
  }
}
