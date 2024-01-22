import Link from "next/link";
import { FaRegLightbulb, FaTasks } from "react-icons/fa";

const Homepage = () => {
  return (
    <div>

      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0">
          <FaRegLightbulb className="h-12 w-12"/>
        </div>
        <div>
          <Link href="/about">
            <div className="text-xl font-medium text-black">About this project</div>
          </Link>
        </div>
      </div>

      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex-shrink-0">
          <FaTasks className="h-12 w-12"/>
        </div>
        <div>
          <Link href="/tasks">
            <div className="text-xl font-medium text-black">Start writing Tasks</div>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Homepage;