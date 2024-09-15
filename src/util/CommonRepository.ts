import { eq, Query, SelectedFields, SQL } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import {
  PgSelectBuilder,
  PgTable,
  PgTableWithColumns,
} from "drizzle-orm/pg-core";

export class GenericRepository {
  protected table: PgTable;

  constructor(tabel: PgTable) {
    this.table = tabel;
  }

  addEntity(db: NodePgDatabase, entityData: any) {
    return db.insert(this.table).values({ ...entityData });
  }

  deleteEntity(db: NodePgDatabase, findQuery: SQL | undefined) {
    return db.update(this.table).set({ deleted: true }).where(findQuery);
  }

  updateEntity(db: NodePgDatabase, findQuery: SQL, updateQuery: any) {
    return db
      .update(this.table)
      .set({ ...updateQuery })
      .where(findQuery);
  }

  getEntity(db: NodePgDatabase, findQuery: SQL) {
    return db.select().from(this.table).where(findQuery);
  }
}