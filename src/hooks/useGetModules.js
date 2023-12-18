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

    const getCOQL = async (filedName, value, module) => {
        var config = {
            "select_query": `select Last_Name, First_Name, Full_Name from ${module} where ${filedName} ${value}`
        }
        const result = await window.ZOHO.CRM.API.coql(config)
        .then(function(data){
            return data
        });

        return result
    }

    const getFields = async function(moduleName) {
        let dataFields 
        await window.ZOHO.CRM.META.getFields({"Entity": "Contacts"}).then(function(data){
            dataFields = data.fields;	
        });

        return dataFields
    }

    return {
        getFields,
        getCOQL,
        getAllRecords,
        getRecordsByEmailDuplicate,
    }
}