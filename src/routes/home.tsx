import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NavigaComponent from "../components/loading/NavigaComponent";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Home() {
  const list = [
    {
      title: "Unit 1",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Unit 1",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Unit 1",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Unit 1",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Unit 1",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Unit 1",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Unit 1",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Unit 1",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="gap-8 grid grid-cols-2 sm:grid-cols-4 max-w-[900px] mt-14">
          {list.map((item, index) => (
            <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0 gap-4">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.img}
                />

                <p className="text-default-500 ml-2">Hello Word</p>
              </CardBody>
              <CardFooter className="text-small flex justify-between gap-32">
                <b>{item.title}</b>
                <IoIosArrowRoundForward size={40} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
