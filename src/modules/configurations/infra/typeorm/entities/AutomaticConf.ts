import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('automatic_conf')
class AutomaticConf {
  @Exclude()
  @PrimaryColumn('int')
  id: number;

  @Column()
  min_humidity: number;

  @Column()
  max_humidity: number;

  @Column()
  min_temperature: number;

  @Column()
  max_temperature: number;

  @Column()
  activation_time: number;

  @Column()
  close_sombrite: String;

  @Column()
  open_sombrite: String

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default AutomaticConf;
