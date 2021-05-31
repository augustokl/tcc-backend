import ICreateExecutedCommandDTO from "../dtos/ICreateExecutedCommandDTO";

export default interface IExecutedCommandRepository {
  create(data: ICreateExecutedCommandDTO): Promise<void>
  find(command: string): Promise<boolean>;
}
