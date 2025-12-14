"use client"

import { useSuspenseWorkflows } from "@/hooks/useSuspenseWorkflows"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Workflow, ChevronLeft, ChevronRight } from "lucide-react"
import { useWorkflowParams } from "@/hooks/use-worflow-params"
import Link from "next/link"

export const WorkflowsList = () => {
  const {
    data,
  } = useSuspenseWorkflows()
    const [params,setParms] = useWorkflowParams()
  const {
    items,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = data

  return (
    <div className="space-y-4 overflow-y-auto  flex-1 w-full flex flex-col ">
      {/* Workflow Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-5 pb-40  overflow-y-auto   w-full flex-1 ">
        {items.map((wf) => ( 
       <Link href={`/workflows/${wf.id}`}>
           <Card key={wf.id} className="hover:shadow-md shrink-0 w-full h-fit transition">
            <CardHeader className="flex flex-row items-center gap-3">
              <Workflow className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-base">
                  {wf.name}
                </CardTitle>
                <CardDescription>
                  Created {new Date(wf.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
       </Link>
        ))}
      </div>

      {/* Pagination Footer */}
      <Card className="fixed bottom-0 w-full border-0 shadow-none">
        <CardFooter className="flex items-center justify-between py-4">
          <Button
            variant="outline"
            size="sm"
            disabled={!hasPrevPage}
            onClick={() => setParms({...params,page:params.page-1})}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <p className="text-sm text-muted-foreground">
            Page <span className="font-medium">{params.page}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>

          <Button
            variant="outline"
            size="sm"
            disabled={!hasNextPage}
            onClick={() => setParms({...params,page:params.page+1})}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
