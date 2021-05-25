import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('manual_conf')
class ManualConf {
  @Exclude()
  @PrimaryColumn('int')
  id: number;

  @Column()
  active: boolean;

  @Column()
  fan: boolean;

  @Column()
  humidity: boolean;

  @Column()
  temperature: boolean;

  @Column()
  sombrite: boolean;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default ManualConf;
