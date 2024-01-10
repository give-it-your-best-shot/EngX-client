import { useEffect } from "react"
import AzureOpenAIService from "../services/azure_openai_service"

export default function Index() {
    const ai = AzureOpenAIService.getInstance()
    useEffect(() => {
        const start = async () => {
            const message1 = await ai.prompt("Hi")
            console.log(message1)
            const message2 = await ai.prompt("I'm testing your API")
            console.log(message2)
        }
        start()
    }, [])
    return <>
        <div className="bg-slate-300 min-h-screen w-full text-white flex justify-center items-center">
            Trying tailwind
        </div>
    </>
}