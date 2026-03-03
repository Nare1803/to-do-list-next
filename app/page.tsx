import Image from 'next/image';
import ToDoList from './components/ToDoLIst';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-700 font-sans">
      <ToDoList />
    </div>
  );
}
