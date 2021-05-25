import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class NewFieldsAutomaticConf1621908181067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('automatic_conf', [
        new TableColumn({
          name: 'activation_time',
          type: 'int',
          default: 0,
        }),
        new TableColumn({
          name: 'open_sombrite',
          type: 'varchar',
          default: "'10:00'",
        }),
        new TableColumn({
          name: 'close_sombrite',
          type: 'varchar',
          default: "'15:00'",
        }),

      ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('automatic_conf', 'activation_tiome')
      await queryRunner.dropColumn('automatic_conf', 'open_sombrite')
      await queryRunner.dropColumn('automatic_conf', 'close_sombrite')
    }

}
