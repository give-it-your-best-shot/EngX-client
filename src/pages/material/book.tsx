import { Card, CardFooter } from "@nextui-org/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Unit } from "src/types/unit.type";
import material_service from "src/services/material_service";

export default function BookPage() {
  const navigate = useNavigate();
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    // if(user === null)
    //   navigate("/")
    material_service.getAllUnitsOfBook(1).then((units) => {
      if (units) setUnits(units);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="gap-8 grid grid-cols-2 sm:grid-cols-4 max-w-[900px]">
          {units.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onClick={() => navigate(`/units/${item.id}`)}
            >
              <CardFooter className="text-small flex justify-around">
                <b>
                  {index + 1}. {item.name}
                </b>
                <IoIosArrowRoundForward
                  size={40}
                  onClick={() => navigate(`/units/${item.id}`)}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
