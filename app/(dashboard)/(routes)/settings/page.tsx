import { Heading } from "@/components/heading"
import { Cog } from "lucide-react"

const SettingsPage = () => {
    return (
    <div>
        <Heading title="Settings" description="Handle your settings here." icon={Cog} iconColor="text-gray-500" bgColor="text-black/10" />
    </div>)
}

export default SettingsPage
