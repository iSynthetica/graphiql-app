import Link from 'next/link';

interface CoolLinkProps {
  color: string;
  url: string;
  text: string;
}

const CoolLink = ({ color, url, text }: CoolLinkProps) => {
  const angles = [
    'transform group-hover:rotate-[-40deg]',
    'transform group-hover:rotate-[-20deg]',
    'transform group-hover:rotate-[-10deg]',
    'transform group-hover:rotate-[20deg]',
    'transform group-hover:rotate-[40deg]',
    'transform group-hover:rotate-[10deg]',
    'transform group-hover:rotate-[30deg]',
    'transform group-hover:rotate-[60deg]',
    'transform group-hover:rotate-[90deg]',
  ];

  const bgColor = `bg-${color}-500`;
  const border = `border-b-4 border-green-800`;
  const active = `active:border-b-0`
  return (
    <Link href={url} className="cursor-pointer">
      <div
        className={`group ${bgColor} px-4 py-2 text-2xl w-fit rounded-full hover:scale-110 flex ${border} ${active}`}
      >
        {text.split('').map((letter, index) => {
          const rotateClass = angles[index];
          return (
            <div
              key={index}
              className={`whitespace-pre transform text-white ${rotateClass} ease-in-out pr-px group-hover:mx-1 group-hover:text-2xl`}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </Link>
  );
};

export default CoolLink;
