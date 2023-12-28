import Link from "next/link";


const AboutPage = () => {
    return (
      <div>
        <h1 className="text-4xl">AboutPage</h1>
        <p className="py-10">
          This is about page.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </p>

        <Link href="/">HomePage</Link>
      </div>
    );
}

export default AboutPage;