'use client'

import { useRouter } from "next/navigation";

const Button = ({ title, path }: { title: string; path: string }) => {
  const router = useRouter();
  return (
    <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg"
    onClick={() => router.push(path)}>
      {title}
    </button>
  );
};

export { Button };
