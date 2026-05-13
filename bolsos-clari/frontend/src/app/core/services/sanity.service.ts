import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@env/environment';

export interface SiteTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: string;
  spacing: string;
}

export interface Category {
  _id: string;
  label: string;
  value: string;
  icon?: string;
  imageUrl?: string;
  order: number;
}

export interface HomePage {
  hero: {
    eyebrow: string;
    title: string;
    titleEm: string;
    subtitle: string;
    ctaLabel: string;
    ctaLink: string;
    imageUrl?: string;
  };
  // Cambiado de featuredSection a featured para coincidir con el HTML
  featured: { 
    heading: string; 
    limit: number 
  };
  banner: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaLink: string;
    imageUrl?: string;
  };
  marqueeText?: string;
}

@Injectable({ providedIn: 'root' })
export class SanityService {
  private readonly baseUrl = `https://${environment.sanity.projectId}.api.sanity.io/v2021-10-21/data/query/${environment.sanity.dataset}`;

  constructor(private http: HttpClient) {}

  getTheme(): Observable<SiteTheme> {
    const query = encodeURIComponent(`*[_type == "siteTheme"][0]`);
    return this.http
      .get<{ result: SiteTheme }>(`${this.baseUrl}?query=${query}`)
      .pipe(map(res => res.result));
  }

  getProducts(limit = 12, offset = 0): Observable<any[]> {
    const query = encodeURIComponent(
      `*[_type == "product"] | order(_createdAt desc) [${offset}...${offset + limit}] {
        _id, name, slug, price, category, isNew,
        "imageUrl": image.asset->url,
        description
      }`
    );
    return this.http
      .get<{ result: any[] }>(`${this.baseUrl}?query=${query}`)
      .pipe(map(res => res.result));
  }

  getCategories(): Observable<Category[]> {
    const query = encodeURIComponent(
      `*[_type == "category" && active == true] | order(order asc) {
        _id, label, "value": value.current, icon, order,
        "imageUrl": image.asset->url
      }`
    );
    return this.http
      .get<{ result: Category[] }>(`${this.baseUrl}?query=${query}`)
      .pipe(map(res => res.result ?? []));
  }

  getHomePage(): Observable<HomePage> {
    const query = encodeURIComponent(
      `*[_type == "homePage"][0] {
        hero { eyebrow, title, titleEm, subtitle, ctaLabel, ctaLink,
          "imageUrl": image.asset->url },
        "featured": featuredSection,
        banner { title, subtitle, ctaLabel, ctaLink,
          "imageUrl": image.asset->url },
        marqueeText
      }`
    );
    return this.http
      .get<{ result: HomePage }>(`${this.baseUrl}?query=${query}`)
      .pipe(map(res => res.result));
  }

  getProductsByCategory(category: string | null, limit = 48): Observable<any[]> {
    const filter = category
      ? `_type == "product" && category == "${category}"`
      : `_type == "product"`;
    const query = encodeURIComponent(
      `*[${filter}] | order(_createdAt desc) [0...${limit}] {
        _id, name, slug, price, category, isNew,
        "imageUrl": image.asset->url, description
      }`
    );
    return this.http
      .get<{ result: any[] }>(`${this.baseUrl}?query=${query}`)
      .pipe(map(res => res.result ?? []));
  }
}