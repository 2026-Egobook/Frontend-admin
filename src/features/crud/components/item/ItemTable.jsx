import { useState } from 'react';
import { createPortal } from 'react-dom';

const CATEGORY_LABEL = {
  BACK: '등껍질',
  SKIN: '고북',
  DECOR_ONE: '데코1',
  DECOR_TWO: '데코2',
  BACKGROUND: '배경',
  LETTER_PAPER: '편지지',
};

function ImageModal({ src, name, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-neutral-950 shadow"
        >
          ×
        </button>
        <img
          src={src}
          alt={name}
          className="h-[200px] w-[200px] rounded-lg object-contain shadow-xl"
        />
      </div>
    </div>,
    document.body
  );
}

export default function ItemTable({ rows = [], onEdit, onDelete }) {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <>
      <div className="overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="h-11 border-b border-neutral-200">
              <th className="w-20 px-6 text-left text-sm font-medium text-neutral-600">ID</th>
              <th className="w-40 px-6 text-left text-sm font-medium text-neutral-600">이름</th>
              <th className="w-40 px-6 text-left text-sm font-medium text-neutral-600">카테고리</th>
              <th className="w-32 px-6 text-left text-sm font-medium text-neutral-600">가격</th>
              <th className="w-20 px-6 text-left text-sm font-medium text-neutral-600">이미지</th>
              <th className="w-32 px-6 text-left text-sm font-medium text-neutral-600">활성 상태</th>
              <th className="px-6 text-left text-sm font-medium text-neutral-600" />
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="h-16 border-b border-neutral-200">
                <td className="px-6 text-sm text-neutral-950">{row.id}</td>
                <td className="px-6 text-sm font-medium text-neutral-950">{row.name}</td>
                <td className="px-6">
                  <span className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-950">
                    {CATEGORY_LABEL[row.category] ?? row.category}
                  </span>
                </td>
                <td className="px-6 text-sm text-neutral-950">{row.price} 잉크</td>
                <td className="px-6">
                  {row.imageUrl ? (
                    <button
                      type="button"
                      onClick={() => setPreviewImage({ src: row.imageUrl, name: row.name })}
                      className="h-10 w-10 overflow-hidden rounded border border-neutral-200 transition-opacity hover:opacity-70"
                    >
                      <img
                        src={row.imageUrl}
                        alt={row.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement.classList.add('bg-neutral-100');
                        }}
                      />
                    </button>
                  ) : (
                    <div className="h-10 w-10 rounded border border-neutral-200 bg-neutral-100" />
                  )}
                </td>
                <td className="px-6">
                  <span className="text-xs font-medium text-neutral-950">
                    {row.active ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-6">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="text-base font-medium text-black"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="text-base font-medium text-red-600"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {previewImage && (
        <ImageModal
          src={previewImage.src}
          name={previewImage.name}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </>
  );
}
