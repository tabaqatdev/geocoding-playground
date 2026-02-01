declare module "@tabaqat/geocoding-sdk" {
  export type LogLevel = "debug" | "info" | "warn" | "error" | "none";

  export interface GeoSDKConfig {
    dataUrl?: string;
    language?: "ar" | "en";
    debug?: boolean;
    logLevel?: LogLevel;
  }

  export interface GeocodeOptions {
    limit?: number;
    bbox?: [number, number, number, number];
    region?: string;
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
    bbox?: [number, number, number, number];
  }

  export interface AutocompleteOptions {
    limit?: number;
    bbox?: [number, number, number, number];
    regions?: string[];
  }

  export interface AutocompleteSuggestion {
    suggestions: string[];
    type: "district" | "postcode" | "general";
  }

  export interface CountryResult {
    iso_a3: string;
    iso_a2: string;
    name_en: string;
    name_ar: string;
    continent: string;
  }

  export type CountryDetectionResult = CountryResult | null;

  export interface AdminHierarchy {
    district?: { name_ar: string; name_en: string };
    governorate?: { name_ar: string; name_en: string };
    region?: { name_ar: string; name_en: string };
  }

  export interface PostcodeInfo {
    postcode: string;
    region_ar?: string;
    region_en?: string;
    addr_count: number;
    tiles: string[];
  }

  export interface TileInfo {
    h3_tile: string;
    addr_count: number;
    min_lon: number;
    max_lon: number;
    min_lat: number;
    max_lat: number;
    file_size_kb: number;
    region_ar?: string;
    region_en?: string;
  }

  export interface GeocodingResult {
    addr_id: number;
    longitude: number;
    latitude: number;
    full_address_ar?: string;
    full_address_en?: string;
    postcode?: string;
    number?: string;
    street?: string;
    district_ar?: string;
    district_en?: string;
    city?: string;
    gov_ar?: string;
    gov_en?: string;
    region_ar?: string;
    region_en?: string;
    h3_index?: string;
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
    constructor(config?: GeoSDKConfig);
    initialize(): Promise<void>;
    close(): Promise<void>;
    getStats(): Promise<SDKStats>;
    getSearchMode(): "fts-bm25" | "jaccard";
    isFTSAvailable(): boolean;
    setDebug(enabled: boolean, level?: LogLevel): void;
    clearCache(): void;

    // Forward geocoding
    geocode(query: string, options?: GeocodeOptions): Promise<GeocodingResult[]>;
    geocodeCached(query: string, options?: GeocodeOptions): Promise<GeocodingResult[]>;
    smartGeocode(query: string, options?: GeocodeOptions): Promise<GeocodingResult[]>;
    getAutocompleteSuggestions(
      query: string,
      options?: AutocompleteOptions
    ): Promise<AutocompleteSuggestion>;

    // Reverse geocoding
    reverseGeocode(
      lat: number,
      lon: number,
      options?: ReverseGeocodeOptions
    ): Promise<GeocodingResult[]>;

    // Specialized search
    searchByPostcode(postcode: string, options?: PostcodeSearchOptions): Promise<GeocodingResult[]>;
    searchByNumber(number: string, options?: NumberSearchOptions): Promise<GeocodingResult[]>;

    // Location detection
    detectCountry(lat: number, lon: number): Promise<CountryDetectionResult>;
    isInSaudiArabia(lat: number, lon: number): Promise<boolean>;
    getAdminHierarchy(lat: number, lon: number): Promise<AdminHierarchy>;

    // Tile management
    getTiles(): TileInfo[];
    getLoadedTiles(): string[];
    getTilesByRegion(region: string): TileInfo[];
    getTilesForBbox(
      minLat: number,
      minLon: number,
      maxLat: number,
      maxLon: number
    ): Promise<string[]>;

    // Postcode index
    getPostcodes(prefix?: string): PostcodeInfo[];
  }
}
