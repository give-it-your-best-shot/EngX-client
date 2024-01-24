import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
// import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Unit } from "src/types/unit.type";
import material_service from "src/services/material_service";

export default function Units() {
  const navigate = useNavigate();
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    // if(user === null)
    //   navigate("/")
    material_service.getAllUnitsOfBook(1).then((units) => {
      if (units) setUnits(units);
    });
  }, []);

  console.log(units);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="gap-24 grid grid-cols-2 sm:grid-cols-4 max-w-[900px]">
          {units?.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => navigate(`/units/${item.id}/words`)}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={"item.title"}
                  className="w-full object-cover h-[140px]"
                  src={"item.img"}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b className= "mr-2">{"Unit 1"}</b>
                <p className="text-default-500">{"Xin chao"}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
