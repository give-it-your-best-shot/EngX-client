import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Unit } from "src/types/unit.type";
// import material_service from "src/services/material_service";

export default function BookPage() {
  const navigate = useNavigate();
  // const [units, setUnits] = useState<Unit[]>([]);

  // useEffect(() => {
  //   material_service.getAllUnitsOfBook(1).then((units) => {
  //     if (units) setUnits(units);
  //   });
  // }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="gap-16 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 max-w-[900px]">
          {Array.from({ length: 3 }).map((id, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => {
                navigate(`/course/${id}/units`);
              }}
            >
              <img
                src="images/bookImage.jpg"
                alt=""
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-back font-['Liberation_Mono'] mt-10 mr-10">
                  {"book.name"}
                </span>
              </div>
              <div className=" absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
