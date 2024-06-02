import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoCheckoutComponent } from './nxt-carrinho-checkout.component';

describe('NxtCarrinhoCheckoutComponent', () => {
  let component: NxtCarrinhoCheckoutComponent;
  let fixture: ComponentFixture<NxtCarrinhoCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoCheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
