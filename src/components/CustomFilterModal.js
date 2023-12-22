import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { useGetModules } from '../hooks/useGetModules';
import { Button } from '@mui/material';
import { useQuery } from '../hooks/useQuery';


/**
 * Refatorar a home X
 * Deixar função do zoho Sdk todas dinâmicas X
 * Arrumas listagem do fields, listar label e dar set no api_name X
 * Quando ele puxar pelo COQL tenho que mostrar isso em uma tabela nova 
 * Tratamento de Erro e Loading X
 */

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export function CustomFilterModal({open, handleClose,}) {
    const { handleSetQuery } = useQuery()
    const { getFields, getCOQL} = useGetModules()

    const [fields, setFields] = useState([{}])
    
    const [module,setModule] = useState("Deal")
    const [valueType,setValueType] = useState("")
    const [fieldValue, setFieldValue] = useState("")


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const teste = async () => {
        const data = await getFields("Contacts")
        const fieldsMap = data.map((item) => {
            return {
                name: item.api_name,
                type: item.data_type
            }
        })
        setFields(fieldsMap)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const createQueryCOQL = async () => {
        const queryCOQL =  {
            "name": "Teste",
            "select_query": `select Last_Name, First_Name, Full_Name from ${module} where ${fieldValue} ${valueType}`
        }
        console.log(queryCOQL)
        handleSetQuery(queryCOQL)
    }

    const handleChange = async (event, nameState) => {
        switch (nameState) {
            case "Module":
                setModule(event.target.value);
                break;
            case "Fields":
                setFieldValue(event.target.value)
                break;
            case "Value Type":
                setValueType(event.target.value)
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        teste()
    }, [teste])

    return(
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <FormControl fullWidth>
                    <div style={{ width: "25%"}}>
                        <InputLabel id="demo-simple-select-label">Module</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={module}
                        label="Module"
                        onChange={(e) => handleChange(e,"Module")}
                        >
                            <MenuItem value={"Deal"}>Deal</MenuItem>
                            <MenuItem value={"Leads"}>Leads</MenuItem>
                            <MenuItem value={"Contacts"}>Contacts</MenuItem>
                        </Select>
                    </div>

                    <div style={{ width: "25%"}}>
                        <InputLabel id="demo-simple-select-label">Fields</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fieldValue}
                        label="Fields"
                        onChange={(e) => handleChange(e,"Fields")}
                        >
                            {fields.map((item) => {
                                return <MenuItem value={item.name}>{item.name}</MenuItem>
                            })}
                        </Select>
                    </div>
                
                    <div style={{ width: "25%"}}>
                        <InputLabel id="demo-simple-select-label">Fields</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={valueType}
                        label="Valor do Field"
                        onChange={(e) => handleChange(e,"Value Type")}
                        >
                            <MenuItem value={"null"}>Null</MenuItem>
                            <MenuItem value={"is not null"}>Is not null</MenuItem>
                            <MenuItem value={"is empty"}>Is empty</MenuItem>
                        </Select>
                    </div>

                    <Button variant="outlined" onClick={createQueryCOQL}>Criar Filtro</Button>
        </FormControl>
        </Box>
        </Modal>
    )
}