# Migration `20190619091549-init`

This migration has been generated by rajinwonderland at 6/19/2019, 9:15:49 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "lift"."Character";

DROP TABLE "lift"."_CharacterToMovie";

CREATE TABLE "lift"."Hero"("id" TEXT NOT NULL  ,"email" TEXT NOT NULL DEFAULT '' ,"name" TEXT   ,PRIMARY KEY ("id"));

PRAGMA foreign_keys=OFF;

CREATE TABLE "lift"."new_Movie"("id" TEXT NOT NULL  ,"createdAt" DATE NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00' ,"released" BOOLEAN NOT NULL DEFAULT false ,"title" TEXT NOT NULL DEFAULT '' ,"description" TEXT   ,"mainCharacter" TEXT   REFERENCES Hero(id),PRIMARY KEY ("id"));

INSERT INTO "new_Movie" ("id","createdAt","updatedAt") SELECT "id","createdAt","updatedAt" from "Movie"

DROP TABLE "lift"."Movie";

ALTER TABLE "lift"."new_Movie" RENAME TO "Movie";

PRAGMA "lift".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190619064833-init..20190619091549-init
--- datamodel.dml
+++ datamodel.dml
@@ -8,30 +8,20 @@
     provider = "photonjs"
     output   = "node_modules/@generated/photon"
 }
-model Character {
-    id String @default(cuid()) @id @unique
-    createdAt DateTime @default(now())
-    updatedAt DateTime @updatedAt
-    marvelId String
-    name String
-    description String?
-    thumbnail String?
+model Hero {
+    id    String  @default(cuid()) @id @unique
+    email String @unique
+    name  String?
     movies Movie[]
 }
 model Movie {
-    id String @default(cuid()) @id @unique
-    createdAt DateTime @default(now())
-    updatedAt DateTime @updatedAt
-    film String
-    releaseYear Int?
-    budget Float?
-    runningTime Int?
-    domesticGross Int?
-    weekendGross Int?
-    overseasGross Int?
-    worldwideGross Int?
-    characters Character[]
-}
-
+    id           String   @default(cuid()) @id @unique
+    createdAt    DateTime @default(now())
+    updatedAt    DateTime @updatedAt
+    released     Boolean
+    title        String
+    description  String?
+    mainCharacter    Hero?
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190619091549-init)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190619091549-init'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```