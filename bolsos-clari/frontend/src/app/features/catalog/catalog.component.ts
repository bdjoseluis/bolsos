import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap, forkJoin } from 'rxjs';
import { SanityService, Category } from '@core/services/sanity.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: any[] = [];
  loading = true;
  activeCategory: string | null = null;
  skeletons = Array(12);
  categories: Category[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private sanity: SanityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Carga categorías una sola vez
    this.sanity.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(cats => {
        this.categories = [
          { _id: 'all', label: 'Todos', value: '', icon: '', imageUrl: '', order: -1 },
          ...cats,
        ];
      });

    // Reacciona a cambios de queryParam con filtro server-side
    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          this.loading = true;
          this.activeCategory = params['cat'] ?? null;
          return this.sanity.getProductsByCategory(this.activeCategory, 48);
        })
      )
      .subscribe({
        next: products => { this.products = products; this.loading = false; },
        error: ()       => { this.loading = false; },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}