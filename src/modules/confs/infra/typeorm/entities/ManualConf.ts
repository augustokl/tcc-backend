import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('manual_conf')
class ManualConf {
  @PrimaryColumn('int')
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: number;

  @Column()
  active: boolean;

  @Column()
  fan: boolean;

  @Column()
  humidity: boolean;

  @Column()
  temperature: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ManualConf;
