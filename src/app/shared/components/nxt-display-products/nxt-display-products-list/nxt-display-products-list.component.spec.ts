import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtDisplayProductsListComponent } from './nxt-display-products-list.component';

describe('NxtDisplayProductsListComponent', () => {
  let component: NxtDisplayProductsListComponent;
  let fixture: ComponentFixture<NxtDisplayProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtDisplayProductsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtDisplayProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
