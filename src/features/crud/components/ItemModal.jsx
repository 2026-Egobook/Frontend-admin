import { useState } from 'react';
import BaseModal from '@/shared/components/ui/BaseModal';
import DropdownSelect from '@/shared/components/ui/DropdownSelect';

const categoryOptions = [
  { label: '등껍질', value: 'SKIN' },
  { label: '고북', value: 'GOBUK' },
  { label: '데코1', value: 'DECO1' },
  { label: '데코2', value: 'DECO2' },
  { label: '배경', value: 'BACKGROUND' },
];

function FileUploadField({ label, file, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-neutral-950">{label}</label>

      <label className="flex h-10 cursor-pointer items-center overflow-hidden rounded border border-neutral-300 bg-white">
        <span className="flex h-full items-center justify-center border-r border-neutral-300 bg-neutral-100 px-4 text-sm font-medium text-neutral-950">
          파일 선택
        </span>

        <span
          className={`flex-1 truncate px-3 text-base ${
            file ? 'text-neutral-950 font-medium' : 'text-neutral-400'
          }`}
        >
          {file ? file.name : '선택된 파일 없음'}
        </span>

        <input
          type="file"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default function ItemModal({ open, mode = 'create', initialData, onClose, onSubmit }) {
  const [category, setCategory] = useState(initialData?.category || '');
  const [price, setPrice] = useState(String(initialData?.price ?? 0));
  const [storeImage, setStoreImage] = useState(null);
  const [myImage, setMyImage] = useState(null);

  const isEdit = mode === 'edit';

  const handleSubmit = () => {
    onSubmit?.({
      id: initialData?.id,
      category,
      price: Number(price),
      storeImage,
      myImage,
    });
  };

  return (
    <BaseModal open={open} onClose={onClose} className="max-w-[480px]">
      <div className="flex flex-col gap-4 rounded-[10px] bg-white px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">
          아이템 {isEdit ? '수정' : '등록'}
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">카테고리</label>
            <DropdownSelect
              value={category}
              placeholder="선택하기"
              options={categoryOptions}
              onChange={setCategory}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">가격 (잉크)</label>
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="h-10 rounded border border-neutral-300 px-3 text-base outline-none focus:border-black"
            />
          </div>

          <FileUploadField label="상점 이미지" file={storeImage} onChange={setStoreImage} />
          <FileUploadField label="마이 이미지" file={myImage} onChange={setMyImage} />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="h-10 flex-1 rounded bg-black text-base font-medium text-white"
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
