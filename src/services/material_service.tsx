import http from "src/utils/http";
import { Unit } from "src/types/unit.type";
import { Word } from "src/types/word.type";
import { Book } from "src/types/book.type";

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

  public async getAllBooksOfOwner(ownerId: number): Promise<Book[] | null> {
    const response = await http.get(`/materials/owner/${ownerId}/books`);
    const data = response.data;
    if ("error" in data) return null;
    return data["payload"];
  }
}

export default new MaterialService();
