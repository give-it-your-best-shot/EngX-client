import http from "src/utils/http";
import { Unit } from "src/types/unit.type";
import { Word } from "src/types/word.type";

class MaterialService {
  public async getAllUnitsOfBook(bookId: number): Promise<Unit[] | null> {
    const response = await http.get(`/materials/books/${bookId}/units`);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }

  public async getAllWordsOfUnit(unitId: number): Promise<Word[] | null> {
    const response = await http.get(`/materials/units/${unitId}/words`);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }
}

export default new MaterialService();
