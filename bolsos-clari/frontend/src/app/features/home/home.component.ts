import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil, forkJoin } from 'rxjs';
import { SanityService, HomePage, Category } from '@core/services/sanity.service';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  page: HomePage | null = null;
  products: any[] = [];
  categories: Category[] = [];
  loading = true;
  skeletons = Array(8);
  marqueeItems: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private sanity: SanityService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    forkJoin({
      theme:      this.sanity.getTheme(),
      page:       this.sanity.getHomePage(),
      categories: this.sanity.getCategories(),
      products:   this.sanity.getProducts(8),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ theme, page, categories, products }) => {
          if (theme) this.themeService.applyTheme(theme);
          this.page = page;
          this.categories = categories;
          this.products = products;
          this.marqueeItems = Array(6).fill(
            page?.marqueeText ?? 'HECHO A MANO · ENVÍO GRATIS · EDICIÓN LIMITADA'
          );
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}