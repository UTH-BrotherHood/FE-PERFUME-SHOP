import { useSearchParams } from "react-router-dom";

export default function userQueryParams() {
    const [searchParams] = useSearchParams();
   
  return Object.fromEntries([...searchParams]);
}
