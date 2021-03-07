import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAutomaticConf1615075255683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'automatic_conf',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'min_humidity',
            type: 'int',
            default: 0,
          },
          {
            name: 'max_humidity',
            type: 'int',
            default: 0,
          },
          {
            name: 'min_temperature',
            type: 'int',
            default: 0,
          },
          {
            name: 'max_temperature',
            type: 'int',
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
            name: 'UserRepository',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('automatic_conf');
  }
}
