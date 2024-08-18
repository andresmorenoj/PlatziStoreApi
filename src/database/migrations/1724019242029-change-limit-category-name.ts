import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLimitCategoryName1724019242029 implements MigrationInterface {
    name = 'ChangeLimitCategoryName1724019242029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" character varying(235) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "name" character varying(230) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")`);
    }

}
