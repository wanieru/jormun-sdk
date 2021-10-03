import { Jormun } from "./Jormun";

export async function Ajax(endpoint : string, body : any)
{
    try
    {
        const options = 
        {
            method: 'POST', 
            headers: 
            {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(body)
        };
        const response = await fetch(endpoint, options);
        const responseBody = await response.json();
        return {status : response.status, body : responseBody};
    }
    catch(e)
    {
        Jormun.alert(e.message);
        return null;
    }
}