import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtProductsFiltersComponent } from './nxt-products-filters.component';

describe('NxtProductsFiltersComponent', () => {
  let component: NxtProductsFiltersComponent;
  let fixture: ComponentFixture<NxtProductsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtProductsFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtProductsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
