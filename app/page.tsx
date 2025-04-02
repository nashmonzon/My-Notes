import { getNotes } from "@/app/actions/get-notes";
import { NoteManager } from "@/components/NoteManager";

export default async function HomePage() {
  const notas = await getNotes();

  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <NoteManager initialNotes={notas} />
      </div>
    </main>
  );
}
