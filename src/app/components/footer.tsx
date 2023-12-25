import Link from 'next/link';
import Image from 'next/image';
import gitLogo from '../../../public/img/github-mark.svg';
import courseLogo from '../../../public/img/rs_school_js.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-16 sticky bottom-0">
      <div className="bg-gray-600 text-white text-center flex justify-between items-center px-24">
        <Link
          href="https://github.com/iSynthetica"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-500 hover:text-gray-300 w-10 h-10"
        >
          <Image src={gitLogo} alt="Github logo" priority />
          <span>Authors GitHub</span>
        </Link>
        <p className="mt-2">© {currentYear} GraphIQL</p>
        <Link href="https://rs.school/react/">
          <Image src={courseLogo} alt="Course Logo" className="w-16 h-16" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
