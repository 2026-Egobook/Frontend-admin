import { useState } from 'react';
import BaseModal from '@/shared/components/ui/BaseModal';
import CustomDatePopover from '@/shared/components/ui/date-picker/CustomDatePopover';
import { formatDate } from '@/shared/utils/dateUtils';

function parseDate(dateString) {
  if (!dateString) return new Date();

  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export default function QuestionDummyModal({
  open,
  mode = 'create',
  initialData,
  onClose,
  onSubmit,
}) {
  const [question, setQuestion] = useState(initialData?.question || '');
  const [sendDate, setSendDate] = useState(
    initialData?.sendDate ? parseDate(initialData.sendDate) : new Date()
  );

  const isEdit = mode === 'edit';

  const handleSubmit = () => {
    onSubmit?.({
      id: initialData?.id,
      question,
      sendDate: formatDate(sendDate),
    });
  };

  return (
    <BaseModal open={open} onClose={onClose} className="max-w-[480px]">
      <div className="flex flex-col gap-6 rounded-[10px] bg-white px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">
          {isEdit ? '질문 수정' : '질문 등록'}
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">질문 내용</label>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="질문 내용을 입력하세요"
              className="h-24 resize-none rounded border border-neutral-300 px-3 py-2 text-base outline-none placeholder:text-neutral-950/50 focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-950">발송 날짜</label>
            <CustomDatePopover value={sendDate} onChange={setSendDate} />
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
