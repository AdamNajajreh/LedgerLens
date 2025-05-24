module.exports = class Data1748032320189 {
    name = 'Data1748032320189'

    async up(db) {
        await db.query(`CREATE TABLE "bridge_erc20_transfer" ("id" character varying NOT NULL, "tx_hash" text NOT NULL, "log_index" integer NOT NULL, "block_number" numeric NOT NULL, "timestamp" numeric NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "amount" numeric NOT NULL, "bridge_name" text, "direction" text, "destination_chain" text, CONSTRAINT "PK_717df2efed8f7cb78bd53a2d281" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_2af86cde2d924fdb50d65ee5f9" ON "bridge_erc20_transfer" ("from") `)
        await db.query(`CREATE INDEX "IDX_f5cc75107c435e3f46b72d3f3a" ON "bridge_erc20_transfer" ("to") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "bridge_erc20_transfer"`)
   
    }
}
