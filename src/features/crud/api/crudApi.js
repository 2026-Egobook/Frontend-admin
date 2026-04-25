const PSYCHOLOGY_KNOWLEDGE_LIST = [
  {
    id: 1,
    content: '자기효능감은 어떤 일을 해낼 수 있다는 개인의 믿음입니다.',
    source: 'Bandura, 1977',
    createdAt: '2026-03-24T14:00:00',
  },
  {
    id: 2,
    content: '긍정적인 생각은 뇌의 신경회로를 변화시킵니다.',
    source: 'Journal of Positive Psychology, 2020',
    createdAt: '2026-03-25T14:00:00',
  },
];

const QUESTION_DUMMY_LIST = [
  {
    id: 94,
    question: '오늘 먹은 간식은?',
    sendDate: '2026-04-29',
    createdAt: '2026-04-03T20:22:23',
  },
  {
    id: 90,
    question: '당신의 삶을 단 세 개의 단어로 요약한다면, 그 단어들은 무엇인가요?',
    sendDate: '2026-04-26',
    createdAt: '2026-01-29T16:53:10',
  },
];

const ITEM_LIST = [
  {
    id: 1,
    name: 'Green.png',
    category: 'BACKGROUND',
    categoryLabel: '배경',
    price: 0,
    storeImageUrl: '',
    myImageUrl: '',
    active: true,
  },
  {
    id: 2,
    name: 'Blue.png',
    category: 'SKIN',
    categoryLabel: '등껍질',
    price: 500,
    storeImageUrl: '',
    myImageUrl: '',
    active: true,
  },
];

export async function getPsychologyKnowledgeList() {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return PSYCHOLOGY_KNOWLEDGE_LIST;
}

export async function createPsychologyKnowledge(data) {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { success: true, data };
}

export async function updatePsychologyKnowledge({ id, ...data }) {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { success: true, id, data };
}

export async function deletePsychologyKnowledge(id) {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { success: true, id };
}

export async function getQuestionDummyList() {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return QUESTION_DUMMY_LIST;
}

export async function createQuestionDummy(data) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return { success: true, data };
}

export async function updateQuestionDummy({ id, ...data }) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return { success: true, id, data };
}

export async function deleteQuestionDummy(id) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return { success: true, id };
}
export async function getItemList() {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return ITEM_LIST;
}

export async function createItem(data) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return { success: true, data };
}

export async function updateItem({ id, ...data }) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return { success: true, id, data };
}

export async function deleteItem(id) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return { success: true, id };
}
