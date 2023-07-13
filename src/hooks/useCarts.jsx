import {useQuery} from '@tanstack/react-query'

const useCarts = () => {
    const { refetch, data : cart = [] } = useQuery({
        queryKey: ['carts','alamin@gmail.com'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/all')
            return response.json();
        },
      })
      return [cart, refetch]
}

export default useCarts