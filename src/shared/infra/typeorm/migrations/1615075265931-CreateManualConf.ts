import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateManualConf1615075265931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'manual_conf',
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
            name: 'active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'fan',
            type: 'boolean',
            default: false,
          },
          {
            name: 'humidity',
            type: 'boolean',
            default: false,
          },
          {
            name: 'temperature',
            type: 'boolean',
            default: false,
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('manual_conf');
  }
}
