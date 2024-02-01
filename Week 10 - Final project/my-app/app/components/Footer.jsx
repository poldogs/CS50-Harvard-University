import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => (
    <div className="py-10 text-center border-t mt-2">
        <div className="flex justify-center items-center space-x-4">
            <p>© 2023 - Leopoldo Gallardo - All Rights Reserved</p>
            <a href="https://www.linkedin.com/in/leopoldo-gallardo-sedeno/" target="_blank" rel="noreferrer">
                <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/poldogs" target="_blank" rel="noreferrer">
                <FaGithub size={24} />
            </a>
        </div>
    </div>
);
export default Footer;