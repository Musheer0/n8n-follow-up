import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    redirect("/sign-in")
  }
  return session;
}

export const requireUnAuth = async()=>{
  const session = await auth.api.getSession({
    headers:await headers()
  });
  if(session?.user){
    redirect("/")
  }
  return session;
}