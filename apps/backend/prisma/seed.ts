import { readFileSync } from "node:fs";
import { prisma } from "../src/db/prisma";
import type { Monster } from "../src/types/Monster";

const monsters = JSON.parse(
  readFileSync(
    new URL("./data/monsters.json", import.meta.url),
    "utf8"
  )
) as Monster[];

async function main() {
  // Clear existing records and insert our JSON data.
  await prisma.$transaction(async (tx) => {
    await tx.monster.deleteMany();
    await tx.monster.createMany({ data: monsters });
  });

  // Set the next auto-generated ID to MAX(id) + 1.
  await prisma.$queryRaw`
    SELECT setval(
      pg_get_serial_sequence('"Monster"', 'id'),
      COALESCE((SELECT MAX(id) FROM "Monster"), 0) + 1,
      false
    )
  `;

  console.log(`Seeded ${monsters.length} monsters.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());