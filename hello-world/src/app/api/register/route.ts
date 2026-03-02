import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/users";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "全てのフィールドを入力してください" },
        { status: 400 }
      );
    }

    const user = await createUser(email, password, name);

    return NextResponse.json(
      { message: "ユーザーが作成されました", user },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "ユーザー作成に失敗しました";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
