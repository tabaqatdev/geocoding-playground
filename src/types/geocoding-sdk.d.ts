declare module "@tabaqat/geocoding-sdk" {
  export interface GeocodeOptions {
    limit?: number;
    bbox?: [number, number, number, number];
    regions?: string[];
  }

  export interface ReverseGeocodeOptions {
    limit?: number;
    radiusMeters?: number;
    detailLevel?: "minimal" | "postcode" | "region" | "full";
    includeNeighbors?: boolean;
  }

  export interface PostcodeSearchOptions {
    limit?: number;
    number?: string;
  }

  export interface NumberSearchOptions {
    limit?: number;
    region?: string;
  }

  export interface CountryDetectionResult {
    isInSaudiArabia: boolean;
    confidence: number;
  }

  export interface AdminHierarchy {
    region_ar?: string;
    region_en?: string;
    city_ar?: string;
    city_en?: string;
    district_ar?: string;
    district_en?: string;
  }

  export interface PostcodeInfo {
    postcode: string;
    region_ar?: string;
    region_en?: string;
    addr_count: number;
    tiles: string[];
  }

  export interface GeocodingResult {
    longitude: number;
    latitude: number;
    full_address_ar?: string;
    full_address_en?: string;
    postcode?: string;
    number?: string;
    street?: string;
    district_ar?: string;
    district_en?: string;
    city_ar?: string;
    city_en?: string;
    region_ar?: string;
    region_en?: string;
    distance_m?: number;
    similarity?: number;
  }

  export interface SDKStats {
    totalTiles: number;
    totalAddresses: number;
    totalSizeKb: number;
    tilesLoaded: number;
  }

  export class GeoSDK {
    initialize(): Promise<void>;
    close(): Promise<void>;
    getStats(): Promise<SDKStats>;
    getSearchMode(): "fts-bm25" | "jaccard";
    geocode(query: string, options?: GeocodeOptions): Promise<GeocodingResult[]>;
    reverseGeocode(
      lat: number,
      lon: number,
      options?: ReverseGeocodeOptions
    ): Promise<GeocodingResult[]>;
    searchByPostcode(postcode: string, options?: PostcodeSearchOptions): Promise<GeocodingResult[]>;
    searchByNumber(number: string, options?: NumberSearchOptions): Promise<GeocodingResult[]>;
    detectCountry(lat: number, lon: number): CountryDetectionResult | null;
    getAdminHierarchy(lat: number, lon: number): AdminHierarchy | null;
    getPostcodes(prefix?: string): PostcodeInfo[];
  }
}
