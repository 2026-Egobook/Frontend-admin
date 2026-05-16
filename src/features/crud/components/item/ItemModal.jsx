import { useState } from 'react';
import BaseModal from '@/shared/components/ui/BaseModal';
import DropdownSelect from '@/shared/components/ui/DropdownSelect';

const categoryOptions = [
  { label: '등껍질', value: 'BACK' },
  { label: '고북', value: 'SKIN' },
  { label: '데코1', value: 'DECOR_ONE' },
  { label: '데코2', value: 'DECOR_TWO' },
  { label: '배경', value: 'BACKGROUND' },
  { label: '편지지', value: 'LETTER_PAPER' },
];

const statusOptions = [
  { label: '활성 (ACTIVE)', value: 'ACTIVE' },
  { label: '비활성 (INACTIVE)', value: 'INACTIVE' },
];

export default function ItemModal({ open, mode = 'create', initialData, onClose, onSubmit }) {
  const [category, setCategory] = useState(initialData?.category ?? '');
  const [price, setPrice] = useState(String(initialData?.price ?? ''));
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(initialData?.active ? 'ACTIVE' : '');

  const isEdit = mode === 'edit';

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('category', category);
    formData.append('price', price);
    if (file) formData.append('file', file);
    if (status) formData.append('status', status);

    onSubmit?.({ id: initialData?.id, formData });
  };

  return (
    <BaseModal open={open} onClose={onClose} className="max-w-[480px]">
      <div className="flex flex-col gap-4 rounded-[10px] bg-white px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">
          아이템 {isEdit ? '수정' : '등록'}
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <DropdownSelect
              value={category}
              placeholder="선택하기"
              options={categoryOptions}
              onChange={setCategory}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">
              가격 (잉크) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="h-10 rounded border border-neutral-300 px-3 text-base outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">이미지 파일</label>
            <label className="flex h-10 cursor-pointer items-center overflow-hidden rounded border border-neutral-300 bg-white">
              <span className="flex h-full items-center justify-center border-r border-neutral-300 bg-neutral-100 px-4 text-sm font-medium text-neutral-950">
                파일 선택
              </span>
              <span className={`flex-1 truncate px-3 text-base ${file ? 'text-neutral-950' : 'text-neutral-400'}`}>
                {file ? file.name : '선택된 파일 없음'}
              </span>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">
              활성 상태 <span className="text-xs text-neutral-400">(미입력 시 비활성)</span>
            </label>
            <DropdownSelect
              value={status}
              placeholder="비활성 (기본값)"
              options={statusOptions}
              onChange={setStatus}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!category || !price}
            className="h-10 flex-1 rounded bg-black text-base font-medium text-white disabled:opacity-40"
          >
            {isEdit ? '수정' : '등록'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 flex-1 rounded border border-neutral-300 text-base font-medium text-neutral-950"
          >
            취소
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
