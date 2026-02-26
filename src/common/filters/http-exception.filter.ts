import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessException } from '../exception/business.exception';

// 捕获所有 HttpException 及其子类
@Catch(HttpException, BusinessException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | BusinessException, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 区分自定义业务异常和内置 HTTP 异常
    let status: number, message: string;
    if (exception instanceof BusinessException) {
      status = exception.getErrorCode();
      message = exception.getResponse() as string;
    } else {
      // 内置异常（如参数校验失败、404等）
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        message = Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message.join('；')
          : (exceptionResponse.message as string);
      } else {
        message = exceptionResponse as string;
      }
    }

    // 统一错误响应格式
    const errorResponse = {
      success: false,
      timestamp: new Date().toISOString(),
      message: message || HttpStatus[status], // 兜底：用 HTTP 状态码名称作为描述,
      errorCode: status,
    };

    // 设置 HTTP 状态码并返回响应
    response.status(status).json(errorResponse);
  }
}

// 捕获所有未处理的异常（如代码运行时错误）
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 未知异常默认返回 500
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof Error ? exception.message : '服务器内部错误';

    const errorResponse = {
      success: false,
      code: status,
      message: status === 500 ? '服务器内部错误，请联系管理员' : message,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
