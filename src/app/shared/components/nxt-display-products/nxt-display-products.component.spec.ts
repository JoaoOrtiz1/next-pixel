import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtDisplayProductsComponent } from './nxt-display-products.component';

describe('NxtDisplayProductsComponent', () => {
  let component: NxtDisplayProductsComponent;
  let fixture: ComponentFixture<NxtDisplayProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtDisplayProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtDisplayProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
