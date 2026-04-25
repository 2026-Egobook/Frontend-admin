import { useState } from 'react';
import CrudTabMenu from '../components/common/CrudTabMenu';
import PsychologyKnowledgeTable from '../components/psychology/PsychologyKnowledgeTable';
import PsychologyKnowledgeModal from '../components/psychology/PsychologyKnowledgeModal';
import QuestionDummyTable from '../components/question/QuestionDummyTable';
import QuestionDummyModal from '../components/question/QuestionDummyModal';
import ItemTable from '../components/item/ItemTable';
import ItemModal from '../components/item/ItemModal';
import DeleteConfirmModal from '../components/common/DeleteConfirmModal';
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
import { useCreateItem, useDeleteItem, useItemList, useUpdateItem } from '../hooks/useItem';

export default function CrudManagementPage() {
  const [activeTab, setActiveTab] = useState('psychology');
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data: psychologyRows = [] } = usePsychologyKnowledgeList();
  const { data: questionRows = [] } = useQuestionDummyList();
  const { data: itemRows = [] } = useItemList();

  const createPsychologyMutation = useCreatePsychologyKnowledge();
  const updatePsychologyMutation = useUpdatePsychologyKnowledge();
  const deletePsychologyMutation = useDeletePsychologyKnowledge();

  const createQuestionMutation = useCreateQuestionDummy();
  const updateQuestionMutation = useUpdateQuestionDummy();
  const deleteQuestionMutation = useDeleteQuestionDummy();

  const createItemMutation = useCreateItem();
  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
    setSelectedRow(null);
    setFormModalOpen(false);
    setDeleteModalOpen(false);
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

            <PsychologyKnowledgeTable
              rows={psychologyRows}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
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

            <QuestionDummyTable
              rows={questionRows}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          </div>
        )}

        {activeTab === 'item' && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleOpenCreate}
                className="h-10 rounded bg-black px-5 text-base font-medium text-white"
              >
                새 아이템 등록
              </button>
            </div>

            <ItemTable rows={itemRows} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
          </div>
        )}
      </div>

      <PsychologyKnowledgeModal
        open={formModalOpen && activeTab === 'psychology'}
        mode={selectedRow ? 'edit' : 'create'}
        initialData={selectedRow}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitPsychology}
      />

      <QuestionDummyModal
        open={formModalOpen && activeTab === 'question'}
        mode={selectedRow ? 'edit' : 'create'}
        initialData={selectedRow}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitQuestion}
      />

      <ItemModal
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
