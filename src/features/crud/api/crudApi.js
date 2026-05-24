import { publicAPI } from '@/shared/api/apiInstance';


function normalizePsychology(item) {
  return {
    id: item.id,
    content: item.content,
    source: item.source,
    createdAt: item.created_at,
    deletedAt: item.deleted_at,
  };
}

export async function getPsychologyKnowledgeList({ page = 1, size = 20 } = {}) {
  const { data } = await publicAPI.get('/admin/psychology', { params: { page, size } });
  const result = data.data;
  return {
    list: (result.list ?? []).map(normalizePsychology),
    hasNext: result.hasNext ?? false,
  };
}

export async function getPsychologyKnowledgeDetail(psychologyId) {
  const { data } = await publicAPI.get(`/admin/psychology/${psychologyId}`);
  return normalizePsychology(data.data);
}

export async function createPsychologyKnowledge({ content, source }) {
  const { data } = await publicAPI.post('/admin/psychology', { content, source });
  return data.data;
}

export async function updatePsychologyKnowledge({ id, content, source }) {
  const { data } = await publicAPI.put(`/admin/psychology/${id}`, { content, source });
  return data.data;
}

export async function deletePsychologyKnowledge(id) {
  const { data } = await publicAPI.delete(`/admin/psychology/${id}`);
  return data.data;
}

function normalizeQuestion(item) {
  return {
    id: item.id,
    question: item.content,
    sendDate: item.questionDate,
    createdAt: item.createdAt,
  };
}

export async function getQuestionDummyList({ page = 1, size = 20 } = {}) {
  const { data } = await publicAPI.get('/admin/question', { params: { page, size } });
  const result = data.data;
  return {
    list: (result.list ?? []).map(normalizeQuestion),
    hasNext: result.hasNext ?? false,
  };
}

export async function createQuestionDummy({ question, sendDate }) {
  const { data } = await publicAPI.post('/admin/question', { content: question, questionDate: sendDate });
  return data.data;
}

export async function updateQuestionDummy({ id, question, sendDate }) {
  const { data } = await publicAPI.put(`/admin/question/${id}`, { content: question, questionDate: sendDate });
  return data.data;
}

export async function deleteQuestionDummy(id) {
  const { data } = await publicAPI.delete(`/admin/question/${id}`);
  return data.data;
}
function normalizeItem(item) {
  return {
    id: item.id,
    name: item.name,
    path: item.path,
    category: item.category,
    price: item.price,
    imageUrl: item.imageUrl,
    active: item.status === 'ACTIVE',
    createdAt: item.createdAt,
  };
}

export async function getItemList({ page = 1, size = 20, category } = {}) {
  const params = { page, size };
  if (category) params.category = category;
  const { data } = await publicAPI.get('/admin/item', { params });
  const result = data.data;
  return {
    list: (result.list ?? []).map(normalizeItem),
    hasNext: result.hasNext ?? false,
  };
}

export async function changeItemStatus(id, status) {
  const { data } = await publicAPI.patch(`/admin/item/${id}/status`, { status });
  return data.data;
}

export async function createItem({ formData }) {
  const { data } = await publicAPI.post('/admin/item', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function updateItem({ id, formData }) {
  const { data } = await publicAPI.post(`/admin/item/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function deleteItem(id) {
  const { data } = await publicAPI.delete(`/admin/item/${id}`);
  return data.data;
}
