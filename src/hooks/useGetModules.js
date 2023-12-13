import { getEmailDuplicate } from "../utils/getEmailDuplicate"

export const useGetModules = () => {
    const getAllRecords = (module) => {
        window.ZOHO.CRM.API.getAllRecords({Entity: module, sort_order:"asc",per_page:5,page:1})
        .then(function(data){
            return data
        })
    } 

    const getRecordsByEmailDuplicate = (module) => {
        window.ZOHO.CRM.API.getAllRecords({Entity:module,sort_order:"asc",per_page:5,page:1})
        .then(function(data){
            switch (module) {
                case "Contacts":
                    getEmailDuplicate(data.data)
                    break;
                default:
                    break;
            }
        })
    }

    return {
        getAllRecords,
        getRecordsByEmailDuplicate,
    }
}