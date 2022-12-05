export type Tag = {
  id: string;
  text: string;
};

export type Image = {
  largeImageURL: string;
  id: number;
  previewURL: string;
  tags: string;
  hits?: [{ largeImageURL: string; id: number; previewURL: string; tags: string }];
};

export type Favorite = {
  id?: number;
  previewURL?: string;
};
