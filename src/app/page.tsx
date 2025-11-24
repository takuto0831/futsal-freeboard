import FutsalBoardApp from '@/components/FutsalBoardApp';

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col bg-gray-50">
      <header className="h-14 border-b bg-white flex items-center px-4 shadow-sm z-10 justify-between">
        <h1 className="text-xl font-bold text-gray-800">Futsal Tactics Board</h1>
        <div className="text-sm text-gray-500">v0.1.0</div>
      </header>

      <FutsalBoardApp />
    </main>
  );
}
