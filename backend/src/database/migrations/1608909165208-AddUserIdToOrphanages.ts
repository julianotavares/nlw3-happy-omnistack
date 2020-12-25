import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToOrphanages1608909165208 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'orphanages',
          new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          }),
        );
    
        await queryRunner.createForeignKey(
          'orphanages',
          new TableForeignKey({
            name: 'Users',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orphanages', 'User');
        await queryRunner.dropColumn('orphanages', 'user_id');
      }
    }
    