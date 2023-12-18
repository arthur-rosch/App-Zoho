import { Table } from "../components/Table";
import { Header } from "../components/Header";
import { useGetModules } from "../hooks/useGetModules";
import { useState , useEffect, useCallback} from "react";
import Filter from "../components/Filter";

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
  const [filter, setFilter] = useState('Todos Contatos');
  const [ allRecords, setAllRecords] = useState([])
  const [ selectTableRows, setSelectTableRows ] = useState([])
  const [ recordsByEmailDuplicate, setRecordsByEmailDuplicate] = useState([])

  const { getAllRecords, getRecordsByEmailDuplicate, getCOQL} = useGetModules()

  const getAllRecordsData =  useCallback(async () => {
    const data = await getAllRecords()
    setAllRecords(data)
  })
  const getRecordsByEmailDuplicateData =  useCallback(async () => {
    const data = await getRecordsByEmailDuplicate()
    setRecordsByEmailDuplicate(data)
  })
  const getDataCOQL =  useCallback(async () => {
    const data = await getCOQL()
    setSelectTableRows(data)
  })

  useEffect(() => {
   getAllRecordsData()
   getRecordsByEmailDuplicateData()
   getDataCOQL()

  }, [getRecordsByEmailDuplicateData, getAllRecordsData, allRecords, recordsByEmailDuplicate, getDataCOQL, selectTableRows])


  return (
    <div>
        <Header/>
        <Filter setFilter={setFilter} filter={filter}/>
        {
          filter === "Todos Contatos" ? <Table dataRecords={allRecords} /> : <Table dataRecords={recordsByEmailDuplicate}/>
        }
      </div>
  );
}
export default Home;
