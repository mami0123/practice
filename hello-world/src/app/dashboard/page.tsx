import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                ダッシュボード
              </h1>
              <p className="text-gray-600 mb-4">
                ようこそ、<span className="font-semibold">{session.user.name}</span>さん！
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  アカウント情報
                </h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">メールアドレス:</span>{" "}
                    {session.user.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">ユーザーID:</span>{" "}
                    {session.user.id}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    ログアウト
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
