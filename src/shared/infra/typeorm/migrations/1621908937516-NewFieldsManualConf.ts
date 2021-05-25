import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class NewFieldsManualConf1621908937516 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('manual_conf',
        new TableColumn({
          name: 'sombrite',
          type: 'boolean',
          default: false,
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('manual_conf', 'sombrite')
    }

}
