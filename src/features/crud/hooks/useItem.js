import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createItem, deleteItem, getItemList, updateItem } from '../api/crudApi';

export function useItemList() {
  return useQuery({
    queryKey: ['itemList'],
    queryFn: getItemList,
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
