export const RequestButton = ({
  title,
  method,
  isForm = false,
}: {
  isForm?: boolean;
  title: string;
  method?: () => void;
}) => {
  return (
    <>
      {!isForm ? (
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg"
          onClick={method}
        >
          {title}
        </button>
      ) : (
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg"
          type="submit"
        >
          {title}
        </button>
      )}
    </>
  );
};
