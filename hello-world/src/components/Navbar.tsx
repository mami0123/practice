"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              MyApp
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <span className="text-gray-600">読み込み中...</span>
            ) : session ? (
              <>
                <span className="text-gray-600">
                  こんにちは、{session.user.name}さん
                </span>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900"
                >
                  ダッシュボード
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600 hover:text-red-800"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  ログイン
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  登録
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
