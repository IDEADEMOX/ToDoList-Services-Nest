import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

// 统一响应格式拦截器
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 统一成功响应格式
        return {
          success: true,
          code: 200,
          message: '操作成功',
          data: (data as unknown) || {}, // 业务数据，无数据则为 null
        };
      }),
    );
  }
}
