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

@Controller('todos') // 基础路由：/todos
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * 创建待办事项
   * POST /todos
   */
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  /**
   * 查询所有待办事项
   * GET /todos
   */
  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  /**
   * 根据 ID 查询单个待办事项
   * GET /todos/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  /**
   * 更新待办事项
   * PATCH /todos/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  /**
   * 删除单个待办事项
   * DELETE /todos/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }

  /**
   * 批量删除待办事项
   * DELETE /todos
   * 请求示例：DELETE /todos?ids=uuid1,uuid2,uuid3
   */
  @Delete()
  removeBatch(@Query('ids') ids: string) {
    const idArray = ids.split(','); // 将逗号分隔的字符串转为数组
    return this.todoService.removeBatch(idArray);
  }
}
