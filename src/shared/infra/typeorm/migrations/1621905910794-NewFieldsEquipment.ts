import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class NewFieldsEquipment1621905910794 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('equipment_data', [
        new TableColumn({
          name: 'soil_humidity',
          type: 'int',
          default: 0,
        }),
        new TableColumn({
          name: 'uv',
          type: 'decimal',
          default: 0,
        }),
        new TableColumn({
          name: 'water_flow',
          type: 'decimal',
          default: 0,
        }),
        new TableColumn({
          name: 'sombrite',
          type: 'boolean',
          default: false,
        }),
        new TableColumn({
          name: 'heater',
          type: 'boolean',
          default: false,
        }),
        new TableColumn({
          name: 'water_pump',
          type: 'boolean',
          default: false,
        }),
      ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('equipment_data', 'soil_humidity')
      await queryRunner.dropColumn('equipment_data', 'uv')
      await queryRunner.dropColumn('equipment_data', 'water_flow')
      await queryRunner.dropColumn('equipment_data', 'sombrite')
      await queryRunner.dropColumn('equipment_data', 'heater')
      await queryRunner.dropColumn('equipment_data', 'water_pump')
    }

}
