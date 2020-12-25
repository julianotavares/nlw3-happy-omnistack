import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1608845892480 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password_hash',
            type: 'varchar',
          },
        ]
    }))
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}