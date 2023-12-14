import { getEmailDuplicate } from "../utils/getEmailDuplicate"

export const useGetModules = () => {
    const getAllRecords = async (module) => {
        let dataRecords = []
        await window.ZOHO.CRM.API.getAllRecords({Entity: "Contacts", sort_order:"asc",per_page:5,page:1})
        .then(function(data){
            dataRecords = data.data
            // switch (module) {
            //     case "Contacts":
            //         dataRecords = data.data
            //         break;
            //     case "Leads":
            //         dataRecords = data.leads
            //     break;
            //     default:
            //         break;
            // }
        })
        return dataRecords
    } 

    const getRecordsByEmailDuplicate = async (module) => {
        let dataRecordsByEmailDuplicate = []
        await window.ZOHO.CRM.API.getAllRecords({Entity:"Contacts",sort_order:"asc",per_page:5,page:1})
        .then(function(data){
            dataRecordsByEmailDuplicate = getEmailDuplicate(data.data);
        })
        return dataRecordsByEmailDuplicate
    }

    const getCOQL = async () => {
        let dataTest = []
        var config = {
            "select_query": "select Last_Name, First_Name, Full_Name from Contacts where Email is not null limit 2"
        }

        await window.ZOHO.CRM.API.coql(config)
        .then(function(data){
            dataTest = data
        });

        return dataTest
    }

    return {
        getCOQL,
        getAllRecords,
        getRecordsByEmailDuplicate,
    }
}