import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  // 主键，自动生成 UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 代办标题
  @Column({
    type: 'varchar',
    length: 255,
    comment: '代办标题',
  })
  title: string;

  // 代办描述(可选)
  @Column({
    type: 'text',
    length: 255,
    comment: '代办描述',
  })
  description: string;

  // 完成状态
  @Column({
    type: 'boolean',
    default: false,
    comment: '完成状态',
  })
  completed: boolean;

  // 创建时间
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createdAt: Date;

  // 更新时间
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })
  updatedAt: Date;
}
