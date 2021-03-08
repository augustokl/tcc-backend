import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEquipmentData1615075289609
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'equipament_data',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'equipament_id',
            type: 'int',
          },
          {
            name: 'fan',
            type: 'boolean',
            default: false,
          },
          {
            name: 'humidity',
            type: 'int',
            default: 0,
          },
          {
            name: 'temperature',
            type: 'numeric',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'EquipamentRepository',
            referencedTableName: 'equipaments',
            referencedColumnNames: ['id'],
            columnNames: ['equipament_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('equipament_data');
  }
}
