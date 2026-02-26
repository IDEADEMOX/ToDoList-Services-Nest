import { Controller, Get, Post, Body } from '@nestjs/common';
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
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  /**
   * 查询所有待办事项
   * GET /todos/list
   */
  @Get('list')
  findAll() {
    return this.todoService.findAll();
  }

  /**
   * 更新待办事项
   * POST /todos/updateStatus
   */
  @Post('updateStatus')
  update(@Body() updateTodoDto: UpdateTodoDto) {
    const { id, ...rest } = updateTodoDto;
    return this.todoService.update(id || '', rest);
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
