import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtProductComponent } from './nxt-product.component';

describe('NxtProductComponent', () => {
  let component: NxtProductComponent;
  let fixture: ComponentFixture<NxtProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NxtProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
