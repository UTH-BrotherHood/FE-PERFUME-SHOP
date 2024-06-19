import { useMutation, MutationFunction } from "@tanstack/react-query";

type MutationCallback<TData, TVariables> = MutationFunction<TData, TVariables>;

export const useMutationHook = <TData, TVariables>(
  fnCallback: MutationCallback<TData, TVariables>,
) => {
  const mutation = useMutation({
    mutationFn: fnCallback,
  });

  return mutation;
};

