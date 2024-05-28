import Image from "next/image"
import Pagination from "./components/Pagination"

export default function Home() {
  return (
    <div>
      Hello World
      <Pagination itemCount={100} pageSize={10} currentPage={5} />
    </div>
  )
}
