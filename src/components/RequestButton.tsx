export const RequestButton = ({
  title,
  method,
}: {
  title: string;
  method: () => void;
}) => {
  return (
    <button
      className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg"
      onClick={method}>
      {title}
    </button>
  );
};
