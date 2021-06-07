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
            isGenerated: true,
            generationStrategy: 'increment',
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
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('automatic_conf');
  }
}
