"use client";

import { useRouter } from "next/navigation";

const NavButton = ({ title, path, back = false }: { title: string; path: string, back?: boolean }) => {
  const router = useRouter();
  return (
    <>
    {back ? (
      <button
        className="text-white bg-amber-700 border-0 py-2 px-6 focus:outline-none hover:bg-amber-900 rounded text-lg"
        onClick={() => router.back()}
      >
        {title}
      </button>
    ) : (
      <button
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg"
        onClick={() => router.push(path)}
      >
        {title}
      </button>
    )}
    </>
  );
};

export { NavButton };
