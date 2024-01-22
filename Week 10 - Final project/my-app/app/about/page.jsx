import Link from "next/link";


const AboutPage = () => {
    return (
      <div>
        <h1 className="text-4xl">About the project</h1>
        <p className="py-10">
          This is about page.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </p>

        <Link href="/">
            <div className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none">
                Back Home
            </div>
        </Link>
      </div>
    );
}

export default AboutPage;