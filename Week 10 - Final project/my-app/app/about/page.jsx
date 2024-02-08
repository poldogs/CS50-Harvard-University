import Link from "next/link";

const AboutPage = () => {
    return (
      <div>
        <h1 className="text-4xl">About the project</h1>

        <h2 className="text-3xl pt-10">Video Demo</h2>
        <iframe 
          width="560" 
          height="315" 
          src="" 
          title="Poldo's CS50 Final Project Demo" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>

        <h2 className="text-3xl pt-10">Description</h2>
        <p className="pb-10">
          This is a task list application, but it goes beyond basic functionality by offering extensive customization options for tasks, such as adding colors or delivery times/deadlines. Additionally, tasks are displayed on a calendar, providing users with awareness of their available time. Furthermore, tasks can have subtasks, each with its own deadlines.
          <br />
          <br />
          The application's structure is straightforward, responsive, and clean.
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