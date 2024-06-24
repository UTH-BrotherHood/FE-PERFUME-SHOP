import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";

export default function TestCaiDauBuoiToast() {
    const { toast } = useToast();
    const handleClick = () => {
        toast({
            description: "Hello, I'm a toast"
        });
    }
    return (
        <div className="w-full h-screen flex justify-center items-center"><Button onClick={handleClick} className="text-white">Click Me Bro</Button></div>
    )
}