import {cards, categories} from "../assets/cards/cards";

export default class APIService {
  private apiUrl: string;

  private path: { words: string; category: string };


  constructor() {
    this.apiUrl = 'http://evgennn32.cloudno.de/api/';
    this.path = {
      category: 'category',
      words: 'words',
    }
  }

  addDefaultCategories(): void {
    categories.forEach((category) => {
      this.addCategory(category).then(() => {
        // console.log('category added')
      }).catch((e) => {
        throw Error(e);
      })
    })
  }

  addDefaultWords(): void {
    cards.forEach((cardsCollection) => {
      cardsCollection.forEach(word => {
        this.addWord(word).then(() => {
        }).catch((e) => {
          throw Error(e);
        })
      });
    })
  }


  async getCategories(): Promise<{ name: string; categoryId: number; }[]> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}`);
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCategoryByDBId(id: string): Promise<{ name: string; categoryId: number; }> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}/get_by_db_id/${id}`);
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async getWords(categoryId: number): Promise<{
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
    cardId: number;
    categoryId: number;
  }[]> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.words}/${categoryId || ''}`);
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCategoryWordsNumber(categoryId: number): Promise<number> {
    const words = await this.getWords(categoryId)
    return words.length
  }


  async addCategory(categoryName: string): Promise<{ _id: string; name: string }> {
    const category = {name: categoryName}
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(category)
      });
      const responseData = await response.json()
      return responseData.data
    } catch (e) {
      throw new Error(e);
    }
  }


  async removeCategory(categoryId: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}${this.path.category}/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      return await response.json()
    } catch (e) {
      throw new Error(e);
    }
  }

  async addWord(wordData: {
    word: string;
    translation: string;
    image: string;
    audioSrc: string;
    categoryId: number
  }): Promise<void> {
    try {
      await fetch(`${this.apiUrl}${this.path.words}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(wordData)
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}



