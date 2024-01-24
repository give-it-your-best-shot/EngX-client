import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Unit } from "src/types/unit.type";
import BaseGame from "./base";
import { Quiz } from "src/services/engx_game_service";
import material_service from "src/services/material_service";
import UserService from "src/services/user_service";
import { useAuthenticationStore } from "src/stores";

export default function UnitGame() {
  const { unitId } = useParams();
  const [unit, setUnit] = useState<Unit>();
  const navigate = useNavigate();

  const authStore = useAuthenticationStore();
  const user_service = UserService.getInstance();

  useEffect(() => {
    const start = async () => {
      material_service.getUnitById(parseInt(unitId ?? "0")).then((unit) => {
        if (!unit) {
          navigate("/courses");
          return;
        }
        console.log(unit);
        setUnit(unit);
        return unit;
      });
    };
    start();
  }, []);
  const getWords = () => {
    return unit!.words.map((e) => e.writing);
  };
  if (unit == undefined) return <></>;
  return (
    <>
      <BaseGame
        words={getWords()}
        onGameEnd={(quiz: Quiz | undefined, score: number, isWin: boolean) => {
          if (authStore.user) {
            user_service.saveUnitRecord(
              authStore.user.id,
              parseInt(unitId ?? "0"),
              quiz?.questions.length ?? 0,
              score,
            );
          }
        }}
        onExit={() => {
          navigate(`/units/:${unitId}/words`);
        }}
      />
    </>
  );
}
