import ICreateEquipamentDataDTO from '../dtos/ICreateEquipamentDataDTO';
import EquipamentData from '../infra/typeorm/entities/EquipamentData';

export default interface IEquipamanetRepository {
  create(data: ICreateEquipamentDataDTO): Promise<EquipamentData>;
  findLastData(): Promise<EquipamentData | undefined>;
}
