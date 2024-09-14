import { Heading } from "@/components/heading"
import { CalendarDays } from "lucide-react"

const GigsPage = () => {
    return (
    <div>
        <Heading title="Gigs" description="Handle all your gigs here." icon={CalendarDays} iconColor="text-green-500" bgColor="text-green-500/10" />
    </div>)
}

export default GigsPage
