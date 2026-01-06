import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from '../api/products';
import { PRODUCTS_PER_PAGE } from '../constants';

export function useProducts(categorySlug: string | null) {
  return useInfiniteQuery({
    queryKey: ['products', categorySlug],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductsByCategory(categorySlug!, {
        limit: PRODUCTS_PER_PAGE,
        skip: pageParam
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    enabled: !!categorySlug,
    staleTime: 2 * 60 * 1000,
  });
}


// "products_beauty_timestamp"
// state: key value

// useInfiniteQuery: (key, fn) {
//   state = memutil()
//   if (key in state) {

//   } else {
//     const val = fn()
//     state[key] = val
// }

// interface Result {
//   data: Object,
//   isLoading: Boolean
// }

// const useCustomInfiniteQuery = (
//   keys: Array<String>,
//   fn: Function
// ) => {
//   const state = getState()
//   const [isLoading, setIsLoading] = useState(true)
//   const [value, setValue] = useState()
//   // const primary_key = keys.slice(0, 2).join("_")
//   const rest_keys = keys.slice(2).join("_")
//   // if (state[primary_key] != null) {
    
//   // } else {
//     setIsLoading(true)
//     fn().then((value) => {
//       let primaryState = state[primary_key]
//       const newState = { ...state,
//       primary_key : {
//         ...primaryState,
//         rest_keys: value
//       }
//       }
//       setState(newState)
//       setIsLoading(false)
//       setValue(value)
//     }
//     ).catch(() => {
//       setIsLoading(false)

//       setIsValue({})
//     }
//     )
//     return { loading, value }
//   // }
// }