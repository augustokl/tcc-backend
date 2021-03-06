import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('executed_command')
class ExecutedCommand {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  command: string;

  @CreateDateColumn()
  created_at: Date;
}

export default ExecutedCommand;
