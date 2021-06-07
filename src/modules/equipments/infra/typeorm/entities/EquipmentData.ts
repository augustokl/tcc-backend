import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('equipment_data')
class EquipmentData {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fan: boolean;

  @Column('numeric')
  humidity: number;

  @Column('numeric')
  temperature: number;

  @Column('numeric')
  soil_humidity: number;

  @Column('numeric')
  uv: number;

  @Column('numeric')
  water_flow: number;

  @Column()
  sombrite: boolean;

  @Column()
  heater: boolean;

  @Column()
  water_pump: boolean;

  @CreateDateColumn()
  created_at: Date;
}

export default EquipmentData;
