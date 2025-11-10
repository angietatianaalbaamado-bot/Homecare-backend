import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1762679654961 implements MigrationInterface {
    name = 'InitialMigration1762679654961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."credential_roles_enum" AS ENUM('admin', 'user', 'manager')
        `);
        await queryRunner.query(`
            CREATE TABLE "credential" (
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userName" character varying(100) NOT NULL,
                "password" character varying(100) NOT NULL,
                "roles" "public"."credential_roles_enum" NOT NULL DEFAULT 'user',
                CONSTRAINT "UQ_0cb7b48f98a359e0cad74f5412f" UNIQUE ("userName"),
                CONSTRAINT "PK_16db69f8eee7772e7d0a07ac946" PRIMARY KEY ("uuid")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "products" (
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "price" numeric NOT NULL,
                "description" text NOT NULL,
                "imgUrl" text NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/74/74472.png',
                "stock" integer NOT NULL,
                "createAt" TIMESTAMP NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"),
                CONSTRAINT "PK_98086f14e190574534d5129cd7c" PRIMARY KEY ("uuid")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "orders_detail" (
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "cant" integer NOT NULL,
                "subTotal" numeric(10, 2) NOT NULL,
                "iva" numeric(10, 2) NOT NULL,
                "discount" numeric(10, 2) NOT NULL,
                "shippingFees" numeric(10, 2) NOT NULL,
                "order_id" uuid,
                "product_id" uuid,
                CONSTRAINT "PK_33d9939965323b226aceb1274c6" PRIMARY KEY ("uuid")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."orders_statusorder_enum" AS ENUM(
                'created',
                'processing',
                'completed',
                'cancelled'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "addressDelivery" character varying(100) NOT NULL,
                "dateCreated" TIMESTAMP NOT NULL DEFAULT now(),
                "deliveryDate" TIMESTAMP,
                "statusOrder" "public"."orders_statusorder_enum" NOT NULL DEFAULT 'created',
                "user_id" uuid,
                CONSTRAINT "PK_04a64e7c04376e27182f8c0fa17" PRIMARY KEY ("uuid")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "lastName" character varying(100) NOT NULL,
                "address" character varying(255),
                "email" character varying(100) NOT NULL,
                "phoneNumber" bigint NOT NULL,
                "birthDate" TIMESTAMP NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "credentialIdUuid" uuid,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"),
                CONSTRAINT "REL_fbbf3b4211f0033aa5bcdfb0e5" UNIQUE ("credentialIdUuid"),
                CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "categories_products_products" (
                "categoriesUuid" uuid NOT NULL,
                "productsUuid" uuid NOT NULL,
                CONSTRAINT "PK_35044b57207d39ae2d6c160b661" PRIMARY KEY ("categoriesUuid", "productsUuid")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bbb4cf91b515e6fc938fdda025" ON "categories_products_products" ("categoriesUuid")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_553455b32290171bc75d2d6aaa" ON "categories_products_products" ("productsUuid")
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD CONSTRAINT "PK_a4b5917e7297f757879582e1458" PRIMARY KEY ("uuid")
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD "name" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "orders_detail"
            ADD CONSTRAINT "FK_5b0e6f7131af630c7ab92400fe0" FOREIGN KEY ("order_id") REFERENCES "orders"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders_detail"
            ADD CONSTRAINT "FK_b86d62e2c98b558e4acf531f9ef" FOREIGN KEY ("product_id") REFERENCES "products"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_fbbf3b4211f0033aa5bcdfb0e57" FOREIGN KEY ("credentialIdUuid") REFERENCES "credential"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "categories_products_products"
            ADD CONSTRAINT "FK_bbb4cf91b515e6fc938fdda0251" FOREIGN KEY ("categoriesUuid") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "categories_products_products"
            ADD CONSTRAINT "FK_553455b32290171bc75d2d6aaa6" FOREIGN KEY ("productsUuid") REFERENCES "products"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "categories_products_products" DROP CONSTRAINT "FK_553455b32290171bc75d2d6aaa6"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories_products_products" DROP CONSTRAINT "FK_bbb4cf91b515e6fc938fdda0251"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_fbbf3b4211f0033aa5bcdfb0e57"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders_detail" DROP CONSTRAINT "FK_b86d62e2c98b558e4acf531f9ef"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders_detail" DROP CONSTRAINT "FK_5b0e6f7131af630c7ab92400fe0"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP COLUMN "createAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP CONSTRAINT "PK_a4b5917e7297f757879582e1458"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP COLUMN "uuid"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_553455b32290171bc75d2d6aaa"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_bbb4cf91b515e6fc938fdda025"
        `);
        await queryRunner.query(`
            DROP TABLE "categories_products_products"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."orders_statusorder_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "orders_detail"
        `);
        await queryRunner.query(`
            DROP TABLE "products"
        `);
        await queryRunner.query(`
            DROP TABLE "credential"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."credential_roles_enum"
        `);
    }

}
