import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-scroll">
      <Image src="/images/firstView.JPG" alt="Click me" width={500} height={500} />
    </main>
  )
}
