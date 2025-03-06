export interface Artist {
  idArtist: string
  strArtist: string
  strArtistStripped: any
  strArtistAlternate: string
  strLabel: string
  idLabel: string
  intFormedYear: string
  intBornYear: string
  intDiedYear: string
  strDisbanded: any
  strStyle: string
  strGenre: string
  strMood: string
  strWebsite: string
  strFacebook: string
  strTwitter: string
  strBiographyEN: string
  strBiographyDE: string
  strBiographyFR: string
  strBiographyCN: any
  strBiographyIT: any
  strBiographyJP: any
  strBiographyRU: string
  strBiographyES: string
  strBiographyPT: string
  strBiographySE: string
  strBiographyNL: any
  strBiographyHU: any
  strBiographyNO: string
  strBiographyIL: any
  strBiographyPL: any
  strGender: string
  intMembers: string
  strCountry: string
  strCountryCode: string
  strArtistThumb: string
  strArtistLogo: string
  strArtistCutout: string
  strArtistClearart: string
  strArtistWideThumb: string
  strArtistFanart: string
  strArtistFanart2: string
  strArtistFanart3: string
  strArtistFanart4: string
  strArtistBanner: string
  strMusicBrainzID: string
  strISNIcode: any
  strLastFMChart: string
  strLocked: string
}

export interface Album {
  idAlbum: string
  idArtist: string
  idLabel?: string
  strAlbum: string
  strAlbumStripped: string
  strArtist: string
  strArtistStripped: string
  intYearReleased: string
  strStyle?: string
  strGenre?: string
  strLabel?: string
  strReleaseFormat: string
  intSales: string
  strAlbumThumb?: string
  strAlbumThumbHQ: any
  strAlbumBack?: string
  strAlbumCDart?: string
  strAlbumSpine?: string
  strAlbum3DCase?: string
  strAlbum3DFlat?: string
  strAlbum3DFace?: string
  strAlbum3DThumb?: string
  strDescriptionEN?: string
  strDescriptionDE: any
  strDescriptionFR?: string
  strDescriptionCN: any
  strDescriptionIT: any
  strDescriptionJP: any
  strDescriptionRU: any
  strDescriptionES?: string
  strDescriptionPT: any
  strDescriptionSE: any
  strDescriptionNL: any
  strDescriptionHU: any
  strDescriptionNO: any
  strDescriptionIL: any
  strDescriptionPL: any
  intLoved?: string
  intScore?: string
  intScoreVotes?: string
  strReview?: string
  strMood?: string
  strTheme?: string
  strSpeed?: string
  strLocation: any
  strMusicBrainzID: string
  strMusicBrainzArtistID: string
  strAllMusicID?: string
  strBBCReviewID?: string
  strRateYourMusicID?: string
  strDiscogsID?: string
  strWikidataID?: string
  strWikipediaID?: string
  strGeniusID?: string
  strLyricWikiID: any
  strMusicMozID: any
  strItunesID: any
  strAmazonID: any
  strLocked: string
  strDescription: any
}

export interface SearchState {
  query: string;
  results: Artist[];
  loading: boolean;
  error: string | null;
}


export interface RequestConfigParams {
  i?: string | number;
  m?: string | number;
  h?: string | number;
  s?: string | number;
}
