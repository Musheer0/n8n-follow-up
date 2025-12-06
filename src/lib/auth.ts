import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/lib/db";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: drizzleAdapter(db,{
    provider:"pg",
  }),
  emailAndPassword:{
    enabled:true,
    autoSignIn:true
  }
});

export const requireAuth = async()=>{
  const session = await auth.api.getSession({
    headers:await headers()
  });
  if(!session?.user){
    throw new Error("Unauthorized")
  }
  return session;
}

export const requireUnAuth = async()=>{
  const session = await auth.api.getSession({
    headers:await headers()
  });
  if(session?.user){
    throw new Error("Already authenticated")
  }
  return session;
}