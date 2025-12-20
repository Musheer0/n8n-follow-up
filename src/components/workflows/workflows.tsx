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
  const { data } = useSuspenseWorkflows()
  const [params, setParams] = useWorkflowParams()

  const { items, totalPages, hasNextPage, hasPrevPage } = data

  return (
    // ROOT container controls height
    <div className="flex flex-col h-full w-full">
      
      {/* SCROLLABLE LIST */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex flex-wrap gap-3">
          {items.map((wf) => (
            <Link
              key={wf.id}
              href={`/workflows/${wf.id}`}
              className="w-full max-w-sm"
            >
              <Card className="hover:shadow-md transition">
                <CardHeader className="flex flex-row items-center gap-3">
                  <Workflow className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">
                      {wf.name}
                    </CardTitle>
                    <CardDescription>
                      Created{" "}
                      {new Date(wf.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER (NO FIXED, NO HACKS) */}
      <Card className="border-t shadow-none rounded-none">
        <CardFooter className="flex items-center justify-between py-4">
          <Button
            variant="outline"
            size="sm"
            disabled={!hasPrevPage}
            onClick={() =>
              setParams({ ...params, page: params.page - 1 })
            }
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
            onClick={() =>
              setParams({ ...params, page: params.page + 1 })
            }
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
