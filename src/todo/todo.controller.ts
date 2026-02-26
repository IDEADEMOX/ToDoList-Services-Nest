import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('api/todos') // 基础路由：/api/todos
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * 创建待办事项
   * POST /todos/create
   */
  @Post('create')
  async create(@Body() createTodoDto: CreateTodoDto) {
    const res = await this.todoService.create(createTodoDto);
    return {
      success: true,
      data: res,
    };
  }

  /**
   * 查询所有待办事项
   * GET /todos/list
   */
  @Get('list')
  async findAll() {
    const res = await this.todoService.findAll();
    return {
      success: true,
      data: res,
      count: res.length,
    };
  }

  /**
   * 更新待办事项
   * POST /todos/updateStatus
   */
  @Post('updateStatus')
  async update(@Body() updateTodoDto: UpdateTodoDto) {
    const { id, ...rest } = updateTodoDto;
    const res = await this.todoService.update(id || '', rest);
    return {
      success: true,
      data: res,
    };
  }

  /**
   * 删除单个待办事项
   * POST /todos/delete
   */
  @Post('delete')
  remove(@Body('id') id: string) {
    return this.todoService.remove(id);
  }
}
