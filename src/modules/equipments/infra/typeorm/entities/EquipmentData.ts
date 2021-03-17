import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('equipment_data')
class EquipmentData {
  @PrimaryColumn('int')
  id: number;

  @Column()
  fan: boolean;

  @Column()
  humidity: number;

  @Column()
  temperature: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

export default EquipmentData;
