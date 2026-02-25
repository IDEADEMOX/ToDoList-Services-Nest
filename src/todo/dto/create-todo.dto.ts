import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateTodoDto {
  // 代办标题
  @IsString()
  @Length(1, 200, { message: '标题长度必须在 1-200 字符之间' })
  title: string;

  // 代办描述(可选)
  @IsOptional()
  @IsString()
  description?: string;

  // 完成状态(可选)
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
