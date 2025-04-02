import { NoteItem } from "./NoteItem";

type Nota = {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
};

type Props = {
  notas: Nota[];
  onEdit: (nota: Nota) => void;
  onDelete: (id: number) => void;
};

export const NoteList = ({ notas, onEdit, onDelete }: Props) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      {notas.map((nota) => (
        <li key={nota.id}>
          <NoteItem nota={nota} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};
