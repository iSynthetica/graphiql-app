import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-5xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-4">The page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        <p >Go back to the Home page</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;