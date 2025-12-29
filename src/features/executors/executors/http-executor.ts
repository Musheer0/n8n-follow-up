import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../types";
import ky ,{HTTPError, type Options} from 'ky'
import handlebars from 'handlebars'
handlebars.registerHelper("json",(ctx)=>new handlebars.SafeString(JSON.stringify(ctx,null,2)))
type HttpRequest ={
     endpoint?:string,
    method?:"GET"|"POST"|"PUT"|"DELETE"|"PATCH";
    body?:string;
  variableName?:string
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
                if(!data.variableName) throw new NonRetriableError("Http node variable name   is not configured ");
      const endpoint = handlebars.compile(data.endpoint)(context);
      console.log({endpoint})
      const method = data.method||"GET";
      const options:Options = {method}
      if(!["GET","DELETE"].includes(method)){
        const resolved = handlebars.compile(data.body||{})(context)
            options.body = resolved
      };
           let response;
      try {
        response = await ky(endpoint, options);
      } catch (error) {
        if (error instanceof HTTPError) {
          return {
            ...context,
            [data.variableName]:{
                http: {
              status: error.response.status,
              statusText: error.response.statusText,
              data: null,
              error: true,
            },
            }
          };
        }
        throw error;
      }
   const contentType = response.headers.get("content-type") || "";

const responseData = contentType.includes("application/json")
  ? await response.json()
  : await response.text();
      return {
        ...context,
        [data.variableName]:{
            http:{
            status:response.status,
            statusText:response.statusText,
            data:responseData
        }
        }
      }
    });
    return result
}