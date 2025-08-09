import { Suspense } from "react"
import FindServicesClient from "./find-services-client"

export default function FindServicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindServicesClient />
    </Suspense>
  )
}