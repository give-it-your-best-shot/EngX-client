import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NavigaComponent from "../components/loading/NavigaComponent";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/https";
import { Chapter } from "../types/chapter.type";
import EngXDataService from "../services/engx_data_service";

export default function Home() {
  const navigate = useNavigate();
  // const { title } = useParams();
  const engx_data_service = EngXDataService.getInstance()
  const [Chapters, setChapters] = useState<Chapter[]>([]);
  const chapterList = Array.isArray(Chapters) ? Chapters : [];

  useEffect(() => {
    engx_data_service.getAllChapters().then(chapters => setChapters(chapters))
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="gap-8 grid grid-cols-2 sm:grid-cols-4 max-w-[900px]">
          {chapterList.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onClick={() => navigate(`/home/${item.id}`)}
            >
              <CardBody className="overflow-visible p-0 gap-4">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.name}
                  className="w-full object-cover h-[140px]"
                  src={item.photoURL}
                />

                <p className="text-default-500 ml-2">{item.description}</p>
              </CardBody>
              <CardFooter className="text-small flex justify-between gap-32">
                <b>{item.id}</b>
                <IoIosArrowRoundForward
                  size={40}
                  onClick={() => navigate(`/home/${item.id}`)}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
