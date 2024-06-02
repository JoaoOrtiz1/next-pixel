import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtProductsComponent } from './nxt-products.component';

describe('NxtProductsComponent', () => {
  let component: NxtProductsComponent;
  let fixture: ComponentFixture<NxtProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NxtProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
