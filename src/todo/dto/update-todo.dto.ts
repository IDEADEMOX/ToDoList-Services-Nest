import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

// 继承 CreateTodoDto，所有字段变为可选
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
