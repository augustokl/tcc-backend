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

@Entity('automatic_conf')
class AutomaticConf {
  @PrimaryColumn('int')
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: number;

  @Column()
  min_humidity: number;

  @Column()
  max_humidity: number;

  @Column()
  min_temperature: number;

  @Column()
  max_temperature: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AutomaticConf;
