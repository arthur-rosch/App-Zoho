import { Table } from "../components/Table";
import { Header } from "../components/Header";
import { useGetModules } from "../hooks/useGetModules";
import { useState , useEffect, useCallback} from "react";
import Filter from "../components/Filter";
import { CustomFilterModal } from "../components/CustomFilterModal";

// const ClipboardCopyButton = ({ text }) => {
//   const textAreaRef = useRef(null);

//   const handleCopyClick = () => {
//     if (textAreaRef.current) {
//       textAreaRef.current.select();

//       try {
//         document.execCommand('copy');
//         console.log(`ID: ${text} do contato copiado para a área de transferência`);
//       } catch (err) {
//         console.error('Erro ao copiar ID do contato para a área de transferência:', err);
//       }

//       // Desfoca o textarea após a cópia para evitar problemas de foco
//       textAreaRef.current.blur();
//     }
//   };

//   return (
//     <div>
//       <textarea ref={textAreaRef} value={text} readOnly style={{ position: 'absolute', left: '-9999px' }} />
//       <button onClick={handleCopyClick}>Copiar ID do Contato</button>
//     </div>
//   );
// };


function Home() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('Todos Contatos');

  const [ allRecords, setAllRecords] = useState([])
  const [ recordsByEmailDuplicate, setRecordsByEmailDuplicate] = useState([])

  const { getAllRecords, getRecordsByEmailDuplicate} = useGetModules()

  const getAllRecordsData =  useCallback(async () => {
    const data = await getAllRecords()
    setAllRecords(data)
  })
  const getRecordsByEmailDuplicateData =  useCallback(async () => {
    const data = await getRecordsByEmailDuplicate()
    setRecordsByEmailDuplicate(data)
  })


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
   getAllRecordsData()
   getRecordsByEmailDuplicateData()

  }, [getRecordsByEmailDuplicateData, getAllRecordsData, allRecords, recordsByEmailDuplicate])


  return (
    <div>
        <Header/>
        <div style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}>
         <Filter setFilter={setFilter} filter={filter}/>
         <button onClick={handleOpen}>Teste Modal</button>
        </div>
        {
          filter === "Todos Contatos" ? <Table dataRecords={allRecords} /> : <Table dataRecords={recordsByEmailDuplicate}/>
        }
        <CustomFilterModal open={open} handleClose={handleClose}/>
      </div>
  );
}
export default Home;
