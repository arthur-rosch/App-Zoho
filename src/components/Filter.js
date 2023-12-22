import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useQuery } from '../hooks/useQuery';
import { queryByTestId } from '@testing-library/react';

/**
 * @typedef {object} FilterProps
 * @property {function(string): void} setFilter - Função para definir o filtro.
 * @property {string} filter - Valor do filtro.
 */

/**
 * Componente para exibir um seletor de filtros.
 * @param {FilterProps} props - Propriedades do componente.
 * @returns {JSX.Element} O componente React.
 */


export default function Filter({setFilter, filter}) {
    /**
   * Manipula a mudança no seletor de filtros.
   * @param {React.ChangeEvent<{ value: unknown }>} event - Evento de mudança.
   */

  const { queryCOQL } = useQuery()

  const handleChange = (event) => {
    console.log(filter)
    console.log(queryCOQL)
    setFilter(event.target.value);
  };

  return (
    <Box sx={{ width: 120, marginBottom: '1rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filtro"
          onChange={handleChange}
        >
          <MenuItem value={"Todos Contatos"}>Todos Contatos</MenuItem>
          <MenuItem value={"E-mail duplicados"}>E-mail duplicados</MenuItem>
          {queryCOQL.map((query) => {
            return (
              <MenuItem value={query.select_query}>{query.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  );
}