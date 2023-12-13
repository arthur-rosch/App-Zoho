import { useState , useEffect, useRef} from "react";
import { Header } from "./components/Header";

const ClipboardCopyButton = ({ text }) => {
  const textAreaRef = useRef(null);

  const handleCopyClick = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();

      try {
        document.execCommand('copy');
        console.log(`ID: ${text} do contato copiado para a área de transferência`);
      } catch (err) {
        console.error('Erro ao copiar ID do contato para a área de transferência:', err);
      }

      // Desfoca o textarea após a cópia para evitar problemas de foco
      textAreaRef.current.blur();
    }
  };

  return (
    <div>
      <textarea ref={textAreaRef} value={text} readOnly style={{ position: 'absolute', left: '-9999px' }} />
      <button onClick={handleCopyClick}>Copiar ID do Contato</button>
    </div>
  );
};


function App({data}) {
  const [ contact, setContact ] = useState([])
  const [ objetosComEmailRepetido, setObjetosComEmailRepetido ] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllContacts = () => {
      window.ZOHO.CRM.API.getAllRecords({Entity:"Contacts",sort_order:"asc",per_page:5,page:1})
      .then(function(data){
        setContact(data.data)
        encontrarEmailsRepetidos(contact)
        function encontrarEmailsRepetidos(arrayDeObjetos) {
          const emailsContados = {};
          const objetosComEmailRepetido = [];
        
          // Itera sobre cada objeto no array
          arrayDeObjetos.forEach(objeto => {
            const email = objeto.Email;
        
            // Se o email já foi encontrado, incrementa a contagem
            if (emailsContados[email]) {
              emailsContados[email]++;
              // Adiciona o objeto ao array se ainda não estiver presente
              if (!objetosComEmailRepetido.includes(objeto)) {
                objetosComEmailRepetido.push(objeto);
              }
            } else {
              // Se o email ainda não foi encontrado, inicializa a contagem
              emailsContados[email] = 1;
            }
          });
        
          // Filtra os objetos que têm emails repetidos
          const objetosRepetidosArray = objetosComEmailRepetido.filter(objeto =>
            emailsContados[objeto.Email] > 1
          );
        
          // Mostra os objetos com emails repetidos
          objetosRepetidosArray.forEach(objeto => {
            console.log(`O email ${objeto.Email} está sendo repetido. Objeto:`, objeto);
          });
        
          // Salva os objetos com emails repetidos em algum estado ou variável
          setObjetosComEmailRepetido(objetosRepetidosArray);
          console.log("Objetos com emails repetidos:", objetosComEmailRepetido);
        }
      })
  }

  
  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])


  return (
    <div>
        <Header/>
        {objetosComEmailRepetido.map((contact) => (
          <div key={contact.Id}>
            <p>{contact.Email}</p>
            <ClipboardCopyButton text={contact.id} />
          </div>
        ))}
      </div>
  );
}
export default App;
