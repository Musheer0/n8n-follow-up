"use server"

import { getSubscriptionToken, Realtime } from "@inngest/realtime"
import { httpChannel } from "./channels"
import { inngest } from "./client"

export type HttpRequestToken = Realtime.Token<typeof httpChannel,["status"]>

export  async function fetchHttpRequestRealtimeToken():Promise<HttpRequestToken>{
    const token = await getSubscriptionToken(inngest,{
        channel:httpChannel(),
        topics:["status"]
    });
    return token
}