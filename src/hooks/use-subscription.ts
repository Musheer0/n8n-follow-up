import { authClient } from "@/lib/auth-client"
import { useQuery } from "@tanstack/react-query"

export const useSubscription = ()=>{
   return useQuery({
    queryKey:["subscription"],
    queryFn:async ()=>{
        const {data} = await authClient.customer.state();
        return data;
    }
   })
};
export const useHasActiveSubscription = ()=>{
    const {data,...rest} = useSubscription();
   const hasActiveSubscrption = data?.activeSubscriptions && data.activeSubscriptions.length>0;
   return {
    ...rest,
    data,
    subscribed:hasActiveSubscrption
   }
}