import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";

import db from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { polarClient } from "@/polar/polar";

export const auth = betterAuth({
  database: drizzleAdapter(db,{
    provider:"pg",
  }),
  emailAndPassword:{
    enabled:true,
    autoSignIn:true
  },
  plugins:[
    polar({
      client:polarClient,
      createCustomerOnSignUp:true,
      use:[
        checkout({
          products:[
           {
            productId: "837ab99f-34bf-415e-8690-708b8ce44c4a",
            slug: "n88n-pro" 
          }
          ],
          authenticatedUsersOnly:true,
          successUrl:process.env.POLAR_SUCCESS_URL!
        }),
        portal()
      ]
    })
  ]
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