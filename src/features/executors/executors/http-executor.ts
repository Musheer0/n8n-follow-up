import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../types";
import ky ,{type Options} from 'ky'
type HttpRequest ={
     endpoint?:string,
    method?:"GET"|"POST"|"PUT"|"DELETE"|"PATCH";
    body?:string;

}
function isHttpRequest(data: any): data is HttpRequest {
  return (
    typeof data === "object" &&
    data !== null &&
    (data.endpoint === undefined || typeof data.endpoint === "string") &&
    (data.method === undefined ||
      ["GET", "POST", "PUT", "DELETE", "PATCH"].includes(data.method)) &&
    (data.body === undefined || typeof data.body === "string")
  );
}
export const HttpExecutor:NodeExecutor  = async({
    context,
    node,
    step
})=>{
    if(!node.data) throw new NonRetriableError("Http node is not configured ");
    const data = node.data as HttpRequest
    const result = await step.run("http-execution",async()=>{
        if(!data.endpoint) throw new NonRetriableError("Http node is not configured ");
      const endpoint = data.endpoint;
      const method = data.method||"GET";
      const options:Options = {method}
      if(!["GET","DELETE"].includes(method)){
            options.body = data.body
      };
      const response = await ky(endpoint,options);
   const contentType = response.headers.get("content-type") || "";

const responseData = contentType.includes("application/json")
  ? await response.json()
  : await response.text();
      return {
        ...context,
        httpResponse:{
            status:response.status,
            statusText:response.statusText,
            data:responseData
        }
      }
    });
    return result
}