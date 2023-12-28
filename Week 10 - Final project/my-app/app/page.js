import Link from "next/link";

const Homepage = () => {
  return (
    <div>
      < h1 className="text-4xl">Homepage</h1>
      <p className="py-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
      </p>

      <Link href="/about">AboutPage</Link>
    </div>
  );
}



export default Homepage;