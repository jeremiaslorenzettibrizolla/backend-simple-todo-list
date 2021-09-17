import {
    MigrationInterface,
    QueryRunner,
    Table,
} from 'typeorm';

export class CreateTableListScraps1631815196278 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'list_scraps',
                columns: [
                    {
                        name: 'uid',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('list_scraps', true, true, true);
    }
}
