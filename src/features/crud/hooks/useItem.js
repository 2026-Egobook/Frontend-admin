import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { changeItemStatus, createItem, deleteItem, getItemList, updateItem } from '../api/crudApi';

export function useItemList({ size = 20, category } = {}) {
  return useInfiniteQuery({
    queryKey: ['itemList', size, category],
    queryFn: ({ pageParam = 1 }) => getItemList({ page: pageParam, size, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
  });
}

export function useChangeItemStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => changeItemStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itemList'] });
    },
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itemList'] });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itemList'] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itemList'] });
    },
  });
}
