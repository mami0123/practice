import bcrypt from "bcryptjs";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

// インメモリユーザーデータストア
const users: Map<string, User> = new Map();

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<Omit<User, "password">> {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("このメールアドレスは既に登録されています");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = crypto.randomUUID();

  const user: User = {
    id,
    email,
    password: hashedPassword,
    name,
    createdAt: new Date(),
  };

  users.set(id, user);

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

export async function getUserById(id: string): Promise<Omit<User, "password"> | null> {
  const user = users.get(id);
  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getAllUsers(): Promise<Omit<User, "password">[]> {
  return Array.from(users.values()).map((user) => {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
}
