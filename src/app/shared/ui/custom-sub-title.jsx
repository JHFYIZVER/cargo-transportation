
const CustomSubTitle = ({ text }) => {
  return (
    <h2 className="uppercase text-2xl w-fit md:text-3xl lg:text-4xl font-black relative after:absolute after:w-22 after:bg-primary after:h-1 after:left-0 after:-top-5">
      {text}
    </h2>
  );
};

export default CustomSubTitle;
