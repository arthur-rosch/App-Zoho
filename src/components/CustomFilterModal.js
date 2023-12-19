import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { useGetModules } from '../hooks/useGetModules';


/**
 * Refatorar a home X
 * Deixar função do zoho Sdk todas dinâmicas X
 * Arrumas listagem do fields, listar label e dar set no api_name
 * Quando ele puxar pelo COQL tenho que mostrar isso em uma tabela nova
 * Tratamento de Erro e Loading
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
    const getDataCOQL = async () => {  
        const data = await getCOQL(fieldValue, valueType, module)
        console.log(data, "Data Coql")
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
                    <button onClick={getDataCOQL}>Teste Coql</button>
        </FormControl>
        </Box>
        </Modal>
    )
}