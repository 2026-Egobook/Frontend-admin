import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CrudTabMenu from '../components/common/CrudTabMenu';
import PsychologyKnowledgeTable from '../components/psychology/PsychologyKnowledgeTable';
import PsychologyKnowledgeModal from '../components/psychology/PsychologyKnowledgeModal';
import QuestionDummyTable from '../components/question/QuestionDummyTable';
import QuestionDummyModal from '../components/question/QuestionDummyModal';
import ItemTable from '../components/item/ItemTable';
import ItemModal from '../components/item/ItemModal';
import DeleteConfirmModal from '../components/common/DeleteConfirmModal';
import Spinner from '@/shared/components/ui/Spinner';
import {
  useCreatePsychologyKnowledge,
  useDeletePsychologyKnowledge,
  usePsychologyKnowledgeList,
  useUpdatePsychologyKnowledge,
} from '../hooks/usePsychologyKnowledge';
import {
  useCreateQuestionDummy,
  useDeleteQuestionDummy,
  useQuestionDummyList,
  useUpdateQuestionDummy,
} from '../hooks/useQuestionDummy';
import DropdownSelect from '@/shared/components/ui/DropdownSelect';
import { useChangeItemStatus, useCreateItem, useDeleteItem, useItemList, useUpdateItem } from '../hooks/useItem';

export default function CrudManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'psychology';

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [itemCategory, setItemCategory] = useState('');

  const sentinelRef = useRef(null);

  const {
    data: psychologyData,
    isLoading: psychologyLoading,
    isFetchingNextPage: psychologyFetchingNext,
    fetchNextPage: psychologyFetchNext,
    hasNextPage: psychologyHasNext,
  } = usePsychologyKnowledgeList();

  const {
    data: questionData,
    isLoading: questionLoading,
    isFetchingNextPage: questionFetchingNext,
    fetchNextPage: questionFetchNext,
    hasNextPage: questionHasNext,
  } = useQuestionDummyList();

  const {
    data: itemData,
    isLoading: itemLoading,
    isFetchingNextPage: itemFetchingNext,
    fetchNextPage: itemFetchNext,
    hasNextPage: itemHasNext,
  } = useItemList({ category: itemCategory || undefined });

  const psychologyRows = psychologyData?.pages.flatMap((p) => p.list) ?? [];
  const questionRows = questionData?.pages.flatMap((p) => p.list) ?? [];
  const itemRows = itemData?.pages.flatMap((p) => p.list) ?? [];

  const createPsychologyMutation = useCreatePsychologyKnowledge();
  const updatePsychologyMutation = useUpdatePsychologyKnowledge();
  const deletePsychologyMutation = useDeletePsychologyKnowledge();

  const createQuestionMutation = useCreateQuestionDummy();
  const updateQuestionMutation = useUpdateQuestionDummy();
  const deleteQuestionMutation = useDeleteQuestionDummy();

  const changeItemStatusMutation = useChangeItemStatus();
  const createItemMutation = useCreateItem();
  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const fetchNext =
      activeTab === 'psychology' ? psychologyFetchNext
      : activeTab === 'question' ? questionFetchNext
      : itemFetchNext;

    const hasNext =
      activeTab === 'psychology' ? psychologyHasNext
      : activeTab === 'question' ? questionHasNext
      : itemHasNext;

    const isFetching =
      activeTab === 'psychology' ? psychologyFetchingNext
      : activeTab === 'question' ? questionFetchingNext
      : itemFetchingNext;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNext && !isFetching) {
          fetchNext();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [
    activeTab,
    psychologyHasNext, psychologyFetchingNext, psychologyFetchNext,
    questionHasNext, questionFetchingNext, questionFetchNext,
    itemHasNext, itemFetchingNext, itemFetchNext,
  ]);

  const handleChangeTab = (tab) => {
    setSearchParams({ tab });
    setSelectedRow(null);
    setFormModalOpen(false);
    setDeleteModalOpen(false);
    setItemCategory('');
  };

  const handleItemCategoryChange = (value) => {
    setItemCategory(value);
  };

  const handleOpenCreate = () => {
    setSelectedRow(null);
    setFormModalOpen(true);
  };

  const handleOpenEdit = (row) => {
    setSelectedRow(row);
    setFormModalOpen(true);
  };

  const handleOpenDelete = (row) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    setSelectedRow(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedRow(null);
  };

  const handleSubmitPsychology = async (form) => {
    if (selectedRow) {
      await updatePsychologyMutation.mutateAsync(form);
    } else {
      await createPsychologyMutation.mutateAsync(form);
    }

    handleCloseFormModal();
  };

  const handleSubmitQuestion = async (form) => {
    if (selectedRow) {
      await updateQuestionMutation.mutateAsync(form);
    } else {
      await createQuestionMutation.mutateAsync(form);
    }

    handleCloseFormModal();
  };

  const handleItemStatusChange = async (id, status) => {
    await changeItemStatusMutation.mutateAsync({ id, status });
  };

  const handleSubmitItem = async (form) => {
    if (selectedRow) {
      await updateItemMutation.mutateAsync(form);
    } else {
      await createItemMutation.mutateAsync(form);
    }

    handleCloseFormModal();
  };

  const handleDelete = async () => {
    if (!selectedRow) return;

    if (activeTab === 'psychology') {
      await deletePsychologyMutation.mutateAsync(selectedRow.id);
    }

    if (activeTab === 'question') {
      await deleteQuestionMutation.mutateAsync(selectedRow.id);
    }

    if (activeTab === 'item') {
      await deleteItemMutation.mutateAsync(selectedRow.id);
    }

    handleCloseDeleteModal();
  };

  const isFetchingNext =
    activeTab === 'psychology' ? psychologyFetchingNext
    : activeTab === 'question' ? questionFetchingNext
    : itemFetchingNext;

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold leading-8 text-neutral-950">CRUD 관리</h1>

        <CrudTabMenu activeTab={activeTab} onChange={handleChangeTab} />

        {activeTab === 'psychology' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleOpenCreate}
                className="h-10 rounded bg-black px-5 text-base font-medium text-white"
              >
                새 심리지식 등록
              </button>
            </div>

            {psychologyLoading ? <Spinner /> : (
              <PsychologyKnowledgeTable
                rows={psychologyRows}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            )}
          </div>
        )}

        {activeTab === 'question' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleOpenCreate}
                className="h-10 rounded bg-black px-5 text-base font-medium text-white"
              >
                새 질문 등록
              </button>
            </div>

            {questionLoading ? <Spinner /> : (
              <QuestionDummyTable
                rows={questionRows}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            )}
          </div>
        )}

        {activeTab === 'item' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="w-36 shrink-0">
                <DropdownSelect
                  value={itemCategory}
                  placeholder="전체"
                  options={[
                    { label: '전체', value: '' },
                    { label: '등껍질', value: 'BACK' },
                    { label: '고북', value: 'SKIN' },
                    { label: '데코1', value: 'DECOR_ONE' },
                    { label: '데코2', value: 'DECOR_TWO' },
                    { label: '배경', value: 'BACKGROUND' },
                    { label: '편지지', value: 'LETTER_PAPER' },
                  ]}
                  onChange={handleItemCategoryChange}
                />
              </div>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="h-10 shrink-0 rounded bg-black px-5 text-base font-medium text-white"
              >
                새 아이템 등록
              </button>
            </div>

            {itemLoading ? <Spinner /> : (
              <ItemTable
                rows={itemRows}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            )}
          </div>
        )}

        <div ref={sentinelRef} className="h-1" />
        {isFetchingNext && <Spinner />}
      </div>

      <PsychologyKnowledgeModal
        key={`psychology-${selectedRow?.id ?? 'new'}`}
        open={formModalOpen && activeTab === 'psychology'}
        mode={selectedRow ? 'edit' : 'create'}
        initialData={selectedRow}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitPsychology}
      />

      <QuestionDummyModal
        key={`question-${selectedRow?.id ?? 'new'}`}
        open={formModalOpen && activeTab === 'question'}
        mode={selectedRow ? 'edit' : 'create'}
        initialData={selectedRow}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitQuestion}
      />

      <ItemModal
        key={`item-${selectedRow?.id ?? 'new'}`}
        open={formModalOpen && activeTab === 'item'}
        mode={selectedRow ? 'edit' : 'create'}
        initialData={selectedRow}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitItem}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </>
  );
}
