import { prisma } from "../db/prisma";
import type {
  Monster,
  CreateMonsterInput
} from "../types/Monster";

export const monsterRepository = {
  getAll(): Promise<Monster[]> {
    return prisma.monster.findMany({
      orderBy: { id: "asc" }
    });
  },

  getById(id: number): Promise<Monster | null> {
    return prisma.monster.findUnique({
      where: { id }
    });
  },

  add(input: CreateMonsterInput): Promise<Monster> {
    return prisma.monster.create({
      data: input
    });
  },

  async remove(id: number): Promise<boolean> {
    const result = await prisma.monster.deleteMany({
      where: { id }
    });

    return result.count > 0;
  }
};