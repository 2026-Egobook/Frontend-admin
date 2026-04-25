import { useState } from 'react';
import BaseModal from '@/shared/components/ui/BaseModal';

export default function PsychologyKnowledgeModal({
  open,
  mode = 'create',
  initialData,
  onClose,
  onSubmit,
}) {
  const [content, setContent] = useState(initialData?.content || '');
  const [source, setSource] = useState(initialData?.source || '');

  const isEdit = mode === 'edit';

  const handleSubmit = () => {
    onSubmit?.({
      id: initialData?.id,
      content,
      source,
    });
  };

  return (
    <BaseModal open={open} onClose={onClose} className="max-w-[480px]">
      <div className="flex flex-col gap-6 rounded-[10px] bg-white px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">
          {isEdit ? '심리지식 수정' : '심리지식 등록'}
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">내용</label>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="심리지식 내용을 입력하세요"
              className="h-24 resize-none rounded border border-neutral-300 px-3 py-2 text-base outline-none placeholder:text-neutral-950/50 focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">출처</label>
            <input
              value={source}
              onChange={(event) => setSource(event.target.value)}
              placeholder="예: Bandura, 1977"
              className="h-10 rounded border border-neutral-300 px-3 text-base outline-none placeholder:text-neutral-950/50 focus:border-black"
            />
          </div>
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
