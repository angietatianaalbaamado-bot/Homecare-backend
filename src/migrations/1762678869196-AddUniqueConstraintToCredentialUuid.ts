import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintToCredentialUuid1762678869196 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE credential ADD CONSTRAINT UQ_credential_uuid UNIQUE(uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE credential DROP CONSTRAINT UQ_credential_uuid;
    `);
  }
}
