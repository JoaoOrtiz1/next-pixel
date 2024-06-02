import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtProductDetalheComponent } from './nxt-product-detalhe.component';

describe('NxtProductDetalheComponent', () => {
  let component: NxtProductDetalheComponent;
  let fixture: ComponentFixture<NxtProductDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtProductDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtProductDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
