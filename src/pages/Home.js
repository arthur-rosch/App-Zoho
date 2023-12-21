import Filter from "../components/Filter";
import { useState , useEffect} from "react";
import { Table } from "../components/Table";
import { Header } from "../components/Header";
import { useGetModules } from "../hooks/useGetModules";
import { CustomFilterModal } from "../components/CustomFilterModal";
import { Button, CircularProgress } from "@mui/material";

function Home() {
  const { getAllRecords, getRecordsByEmailDuplicate} = useGetModules()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Todos Contatos');

  const [ allRecords, setAllRecords] = useState([])
  const [ recordsByEmailDuplicate, setRecordsByEmailDuplicate] = useState([])


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderTable = () => {
    switch (filter) {
      case "Todos Contatos":
        return <Table dataRecords={allRecords} />;
      case "E-mail duplicados":
        return <Table dataRecords={recordsByEmailDuplicate} />;
      default:
        return <Table dataRecords={allRecords} />;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    console.log("Teste")
    const fetchData = async () => {
      try {
        const allRecordsData = await getAllRecords("Contacts");
        setAllRecords(allRecordsData);
  
        const recordsByEmailDuplicateData = await getRecordsByEmailDuplicate("Contacts");
        setRecordsByEmailDuplicate(recordsByEmailDuplicateData);

        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();

  }, [getAllRecords, getRecordsByEmailDuplicate])


  return (
    <div>
        <Header/>
        <div style={{display:"flex", alignItems: "center", justifyContent: "space-between"}}>
         <Filter setFilter={setFilter} filter={filter}/>
         <Button variant="outlined" onClick={handleOpen}>Criar Filtro</Button>
        </div>
        {loading ? <CircularProgress/> : renderTable()}
        <Table dataRecords={allRecords} />
        <CustomFilterModal open={open} handleClose={handleClose}/>
      </div>
  );
}
export default Home;
