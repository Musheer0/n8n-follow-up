import { NonRetriableError } from "inngest";
import { NodeExecutor } from "../types";
import ky ,{HTTPError, type Options} from 'ky'
import handlebars from 'handlebars'
import { httpChannel } from "@/inngest/channels";
handlebars.registerHelper("json",(ctx)=>new handlebars.SafeString(JSON.stringify(ctx,null,2)))
type HttpRequest ={
     endpoint?:string,
    method?:"GET"|"POST"|"PUT"|"DELETE"|"PATCH";
    body?:string;
  variableName?:string
}
export const HttpExecutor: NodeExecutor = async ({
  context,
  node,
  step,
  publish
}) => {

  if (!node.data) {
    await publish(httpChannel().status({ status: "error", nodeId: node.id }));
    throw new NonRetriableError("Http node is not configured");
  }

  const data = node.data as HttpRequest;

  if (!data.endpoint || !data.variableName) {
    await publish(httpChannel().status({ status: "error", nodeId: node.id }));
    throw new NonRetriableError("Http node config incomplete");
  }

  return step.run("http-execution", async () => {
    await publish(httpChannel().status({ status: "loading", nodeId: node.id }));
  if (!data.endpoint || !data.variableName) {
    await publish(httpChannel().status({ status: "error", nodeId: node.id }));
    throw new NonRetriableError("Http node config incomplete");
  }
    const endpoint = handlebars.compile(data.endpoint)(context);
    const method = data.method ?? "GET";

    const options: Options = { method };

    if (!["GET", "DELETE"].includes(method) && data.body) {
      options.body = handlebars.compile(data.body)(context);
    }

    try {
      const response = await ky(endpoint, options);

      const contentType = response.headers.get("content-type") ?? "";
      const payload = contentType.includes("json")
        ? await response.json()
        : await response.text();

      await publish(httpChannel().status({ status: "success", nodeId: node.id }));

      return {
        ...context,
        [data.variableName]: {
          http: {
            ok: true,
            status: response.status,
            statusText: response.statusText,
            data: payload,
          }
        }
      };

    } catch (err) {

      if (err instanceof HTTPError) {
        await publish(httpChannel().status({ status: "error", nodeId: node.id }));

        return {
          ...context,
          [data.variableName]: {
            http: {
              ok: false,
              status: err.response.status,
              statusText: err.response.statusText,
              data: null,
            }
          }
        };
      }

      // actual crash → let Inngest decide retry
      throw err;
    }
  });
};
