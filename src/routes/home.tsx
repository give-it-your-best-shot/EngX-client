import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NavigaComponent from "../components/loading/NavigaComponent";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/https";
import { Chapter } from "../types/chapter.type";

export default function Home() {
  const navigate = useNavigate();
  // const { title } = useParams();
  const [Chapters, setChapter] = useState<Chapter[]>([]);
  const chapterList = Array.isArray(Chapters) ? Chapters : [];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(`chapters`);
        if (response.status === 200) {
          setChapter(response.data.data);
          console.log(response.data.data);
        } else {
          console.log("Loi he thong");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="fixed w-full z-40 mb-10">
        <NavigaComponent />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="gap-8 grid grid-cols-2 sm:grid-cols-4 max-w-[900px] mt-14">
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
