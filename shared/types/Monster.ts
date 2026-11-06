export type Monster = {
  id: number;
  name: string;
  hitPoints: number;
  level: number;
  description?: string | null;
};

export type CreateMonsterInput = Omit<Monster, "id">;