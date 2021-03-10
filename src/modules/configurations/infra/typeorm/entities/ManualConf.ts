import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('manual_conf')
class ManualConf {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ManualConf;
