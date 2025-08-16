import { Suspense } from "react"
import FindServicesClient from "./find-services-client"
import { Loading } from "@/components/loading"

export default function FindServicesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <FindServicesClient />
    </Suspense>
  )
}