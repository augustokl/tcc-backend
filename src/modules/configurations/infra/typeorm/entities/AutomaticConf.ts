import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('automatic_conf')
class AutomaticConf {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AutomaticConf;
