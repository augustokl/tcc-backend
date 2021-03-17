import ICreateEquipmentDataDTO from '../dtos/ICreateEquipmentDataDTO';
import EquipmentData from '../infra/typeorm/entities/EquipmentData';

export default interface IEquipamanetRepository {
  create(data: ICreateEquipmentDataDTO): Promise<EquipmentData>;
  findLastData(): Promise<EquipmentData | undefined>;
}
