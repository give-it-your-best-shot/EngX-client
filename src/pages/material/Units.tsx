import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Tooltip,
} from "@nextui-org/react";
// import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Unit } from "src/types/unit.type";
import material_service from "src/services/material_service";

export default function Units() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    material_service.getAllUnitsOfBook(parseInt(id ?? "0")).then((units) => {
      if (units) setUnits(units);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen  py-20 px-32 gap-10">
        <div className="text-slate-800 text-4xl font-bold">Courses</div>
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
                <b>{item.name}</b>
                <p className="text-default-500">{item.id}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-slate-800 text-4xl font-bold">Game</div>
        <div className="flex flex-col justify-center items-center h-full w-full mt-10">
          <p className="mb-10 text-lg font-semibold text-gray-800">
            Let's practice together 🎮
          </p>
          <Tooltip
            key={0}
            color="primary"
            content="Let's go"
            className="capitalize font-bold"
          >
            <Button
              color="secondary"
              onClick={() => navigate(`/courses/${parseInt(id ?? "0")}/game`)}
              className="w-3/5 font-bold h-12 text-xl"
            >
              Start
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
