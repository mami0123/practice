import bcrypt from "bcryptjs";
import { supabase } from "./supabase";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

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

  const { data, error } = await supabase
    .from("users")
    .insert({ email, password: hashedPassword, user_name: name })
    .select("id, email, user_name, created_at")
    .single();

  if (error || !data) {
    throw new Error("ユーザー作成に失敗しました: " + error?.message);
  }

  return {
    id: String(data.id),
    email: data.email,
    name: data.user_name,
    createdAt: new Date(data.created_at),
  };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, password, user_name, created_at")
    .eq("email", email)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: String(data.id),
    email: data.email,
    password: data.password,
    name: data.user_name,
    createdAt: new Date(data.created_at),
  };
}

export async function getUserById(id: string): Promise<Omit<User, "password"> | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, user_name, created_at")
    .eq("id", Number(id))
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: String(data.id),
    email: data.email,
    name: data.user_name,
    createdAt: new Date(data.created_at),
  };
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getAllUsers(): Promise<Omit<User, "password">[]> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, user_name, created_at");

  if (error || !data) return [];

  return data.map((row) => ({
    id: String(row.id),
    email: row.email,
    name: row.user_name,
    createdAt: new Date(row.created_at),
  }));
}
