import { useEffect, useState } from "react"
import cafeApi from '../api/cafeApi';
import { CagetoriesResponse, Categoria } from '../interfaces/appInterface';


export const useCategories = () => {
    
    const [ isLoading, setIsLoading ] = useState( true )
    const [ categories, setCategories ] = useState<Categoria[]>([]);
    
    useEffect(() => {
        getCategories();
    }, [])


    const getCategories = async() => {
        const { data } = await cafeApi.get<CagetoriesResponse>('/categorias');
        setCategories( data.categorias );
        setIsLoading(false);
    }


    return {
        isLoading,
        categories
    }
}
