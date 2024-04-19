type Props = {
  content: string;
  handleClick: () => void;
};

export default function YellowButton({ content, handleClick }: Props) {
  return (
    <button
      className="bg-amber-400 rounded-3xl px-5 py-1 my-3"
      onClick={handleClick}>
      {content}
    </button>
  );
}
