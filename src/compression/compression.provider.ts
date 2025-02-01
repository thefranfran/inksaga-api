import { Injectable } from '@nestjs/common';
import { brotliCompressSync, brotliDecompressSync } from 'zlib';

@Injectable()
export class CompressionProvider {
  private readonly COMPRESSION_ENCODING = 'base64';

  constructor(private readonly controls: { active: boolean }) {}

  public compress(data: string): string {
    try {
      if (this.controls.active && data) {
        const compressed = brotliCompressSync(data).toString(
          this.COMPRESSION_ENCODING,
        );

        return compressed;
      }

      return data;
    } catch (error) {
      throw new Error(`Error compressing data: ${error}`);
    }
  }

  public decompress(data: string): string {
    try {
      if (this.controls.active && data) {
        return brotliDecompressSync(
          Buffer.from(data, this.COMPRESSION_ENCODING),
        ).toString();
      }
    } catch (error) {
      throw new Error(`Error decompressing data: ${error}`);
    }

    return data;
  }
}
