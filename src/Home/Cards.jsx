import Card from "./Card";

const Cards = () => {
  return (
    <div>
      <div className="bg-blue-100 text-blue-800 font-bold text-center py-4 px-6 rounded-lg shadow-md text-2xl">
        ___On Going Session___
      </div>
      <div className="my-10 grid grid-cols-3 gap-4 w-11/12 mx-auto">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Cards;
