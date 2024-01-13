import { useEffect } from "react";
import EngXLearningService from "../services/engx_learning_service";

export default function Game() {
  useEffect(() => {
    const start = async () => {
      const engx_service = EngXLearningService.getInstance();
      engx_service.getGameOfWords(["hello", "apple", "world"]);
    };
    start();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}
