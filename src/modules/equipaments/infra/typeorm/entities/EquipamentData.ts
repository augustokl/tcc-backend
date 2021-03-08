import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('')
class EquipamentData {
  @PrimaryColumn('int')
  id: number;

  @Column()
  fan: boolean;

  @Column()
  humidity: number;

  @Column()
  temperature: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EquipamentData;
