import { Suspense } from "react"
import JoinQueueClient from "./join-queue-client"

export default function JoinQueuePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoinQueueClient />
    </Suspense>
  )
}