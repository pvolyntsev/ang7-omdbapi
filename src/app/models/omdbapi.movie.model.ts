export class OmdbapiMovieRating {
  Source: String; // 'Internet Movie Database'
  Value: String; // '7.1/10'
}

export class OmdbapiMovie {
  Title: String; // 'RED'
  Year: Number; // 2015
  Rated: String; // '???'
  Language: String; // 'English, Russian'
  Country: String; // 'USA'
  Poster: URL; // 'https://m.media-amazon.com/images/M/MV5BMzg2Mjg1OTk0NF5BMl5BanBnXkFtZTcwMjQ4MTA3Mw@@._V1_SX300.jpg'
  Plot: String; // 'When his peaceful life is threatened by a high-tech assassin, ... assailants.'
  imdbID: String; // 'tt1245526'
  Released: String; // '15 Oct 2010'
  Runtime: String; // '111 min'
  Genre: String; // 'Action, Comedy, Crime, Thriller'
  Director: String; // 'Robert Schwentke'
  Writer: String; // 'Jon Hoeber (screenplay), Erich Hoeber (screenplay), Warren Ellis (graphic novel), Cully Hamner (graphic novel)'
  Actors: String; // 'Bruce Willis, Mary-Louise Parker, Heidi von Palleske, Karl Urban'
  Awards: String; // 'Nominated for 1 Golden Globe. Another 4 wins & 18 nominations'
  Ratings: OmdbapiMovieRating[];
  Metascore: Number; // 60
  imdbRating: Number; // 7.1
  imdbVotes: String; // '265,862'
  Type: String; // 'movie'
  DVD: String; // Date? '25 Jan 2011'
  BoxOffice: String; // $88,900,000
  Production: String; // 'Summit Entertainment'
  Website: URL; // 'http://red-themovie.com/'
  Response: Boolean;
  Error: String;
}
