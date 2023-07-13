import {useQuery} from '@tanstack/react-query'

const useCarts = () => {
    const { refetch, data : cart = [] } = useQuery({
        queryKey: ['carts','alamin@gmail.com'],
        queryFn: async () => {
            const response = await fetch('https://react-query-practice-lime.vercel.app/all')
            return response.json();
        },
      })
      return [cart, refetch]
}

export default useCarts