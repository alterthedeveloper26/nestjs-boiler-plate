const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitDb1709114297589 {
    name = 'InitDb1709114297589'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "modified_by" character varying,
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "deleted_by" character varying,
                "name" character varying(500) NOT NULL,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "email" character varying(128) NOT NULL,
                "failed_login_count" integer NOT NULL DEFAULT '0',
                "last_login_attempt_time" TIMESTAMP WITH TIME ZONE,
                "last_change_password_time" TIMESTAMP WITH TIME ZONE,
                "active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }
}
