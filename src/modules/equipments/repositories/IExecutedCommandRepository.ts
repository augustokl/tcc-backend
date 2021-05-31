import ICreateExecutedCommandDTO from "../dtos/ICreateExecutedCommandDTO";
import ExecutedCommand from '../infra/typeorm/entities/ExecutedCommand';

export default interface IExecutedCommandRepository {
  create(data: ICreateExecutedCommandDTO): Promise<void>
  find(command: string): Promise<boolean>;
}
