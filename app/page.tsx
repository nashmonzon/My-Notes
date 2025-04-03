import { getNotes } from "@/app/actions/get-notes";
import { NoteManager } from "@/components/NoteManager";

export default async function HomePage() {
  const notes = await getNotes();

  return (
    <div className="relative">
      <div className="absolute top-20 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob hover:opacity-50 transition-opacity"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 hover:opacity-50 transition-opacity"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 hover:opacity-50 transition-opacity"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <NoteManager initialNotes={notes} />
      </div>
    </div>
  );
}
