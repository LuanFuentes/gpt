interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-2 mt-2">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-2 py-1 border rounded ${p === page ? 'bg-primary-500 text-white' : ''}`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
