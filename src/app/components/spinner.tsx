import Image from 'next/image';

export const Spinner = () => {
  return (
    <div className="w-full h-sreen flex items-center justify-center m-auto">
      <Image
        src="/img/spinner.gif"
        alt="Loader"
        width={50}
        height={50}
        priority
      />
    </div>
  );
};
