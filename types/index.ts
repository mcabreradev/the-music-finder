export interface Artist {
  idArtist: string;
  strArtist: string;
  strArtistAlternate?: string;
  strGenre?: string;
  strStyle?: string;
  strBiographyEN?: string;
  strCountry?: string;
  strArtistThumb?: string;
  strArtistLogo?: string;
  strArtistBanner?: string;
  strFacebook?: string;
  strTwitter?: string;
  strWebsite?: string;
  intFormedYear?: string;
  intBornYear?: string;
  intDiedYear?: string;
  strLabel?: string;
  strGender?: string;
  strMood?: string;
  intMembers?: string;
}

export interface Album {
  idAlbum: string;
  idArtist: string;
  strAlbum: string;
  strArtist: string;
  intYearReleased?: string;
  strGenre?: string;
  strAlbumThumb?: string;
  strDescriptionEN?: string;
  strLabel?: string;
  intScore?: string;
  intScoreVotes?: string;
  strReleaseFormat?: string;
}

export interface SearchState {
  query: string;
  results: Artist[];
  loading: boolean;
  error: string | null;
}