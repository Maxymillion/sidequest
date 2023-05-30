'use client';
import {usePathname} from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-6">404: Not Found</h1>
      <p className="mb-4">The following route could not be found: </p>
      <p className="mb-4"><code className="bg-slate-200 text-sm p-1 rounded-sm">{pathname}</code></p>
      <p><a className="text-blue-400" href="/">Back to home</a></p>
    </div>
  );
}
