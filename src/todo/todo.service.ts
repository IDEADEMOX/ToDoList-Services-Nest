import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  /**
   * 创建待办事项
   * @param createTodoDto 创建待办的参数
   * @returns 创建后的待办数据
   */
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    console.log('createTodoDto', createTodoDto);
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  /**
   * 查询所有待办事项
   * @returns 待办事项列表
   */
  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * 根据 ID 查询单个待办事项
   * @param id 待办 ID
   * @returns 单个待办数据
   */
  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`待办事项 ID: ${id} 不存在`);
    }
    return todo;
  }

  /**
   * 更新待办事项
   * @param id 待办 ID
   * @param updateTodoDto 更新参数
   * @returns 更新后的待办数据
   */
  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // 先检查待办是否存在
    await this.findOne(id);
    // 执行更新操作
    await this.todoRepository.update(id, updateTodoDto);
    // 返回更新后的完整数据
    return await this.findOne(id);
  }

  /**
   * 删除待办事项
   * @param id 待办 ID
   * @returns 删除结果
   */
  async remove(id: string): Promise<{ success: boolean; message: string }> {
    // 先检查待办是否存在
    await this.findOne(id);
    // 执行删除操作
    const result = await this.todoRepository.delete(id);
    if (result.affected && result.affected > 0) {
      return {
        success: true,
        message: `待办事项 ID: ${id} 删除成功`,
      };
    }
    return {
      success: false,
      message: `待办事项 ID: ${id} 删除失败`,
    };
  }
}
