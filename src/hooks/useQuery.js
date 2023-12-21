import { useContext } from "react";
import { QueryContext } from '../context/context'

export const useQuery = () => {
    const context = useContext(QueryContext);
    if (!context) {
      throw new Error('useTheme deve ser usado dentro de um QueryContext');
    }
    return context;
  };
  