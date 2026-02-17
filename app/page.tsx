import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F2FCF6] p-6 text-[#0F172A]">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#0A4D68]">MentorMost Tools</h1>
        <p className="mt-2 text-sm text-slate-600">
          Open the statistical wizard to choose an appropriate analysis pathway.
        </p>
        <Link
          href="/tools/statistical-test-selector"
          className="mt-4 inline-block rounded-md bg-[#0A4D68] px-4 py-2 text-sm font-semibold text-white"
        >
          Open Statistical Test Selector
        </Link>
      </div>
    </main>
  );
}
