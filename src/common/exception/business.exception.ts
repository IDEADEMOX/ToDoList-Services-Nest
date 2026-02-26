import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  // 自定义错误码（可选，可区分不同业务错误）
  private readonly errorCode: number;

  constructor(message: string, errorCode: number = HttpStatus.BAD_REQUEST) {
    // 调用父类构造器，传递错误信息和 HTTP 状态码
    super(message, errorCode);
    this.errorCode = errorCode;
  }

  // 提供获取错误码的方法
  getErrorCode(): number {
    return this.errorCode;
  }
}
