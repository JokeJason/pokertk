export interface nameUrlPair {
  name: string;
  url: string;
}

export interface ListResponse {
  count: number;
  results: nameUrlPair[];
}
