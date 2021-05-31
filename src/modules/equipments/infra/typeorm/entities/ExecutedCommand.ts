import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('equipment_data')
class EquipmentData {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  command: string;

  @CreateDateColumn()
  created_at: Date;
}

export default EquipmentData;
