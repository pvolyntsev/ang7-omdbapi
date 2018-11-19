export class OmdbapiMovie {
  Title: string;
  Year: number;
  Rated: string;
  Language: string;
  Country: string;
  Poster: URL;
  Plot: string;
  ImdbID: string;
  placeholder: boolean;

  constructor(placeholder) {
    this.placeholder = placeholder || false;
  }
}
