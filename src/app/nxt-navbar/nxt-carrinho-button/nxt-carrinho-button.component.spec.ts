import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoButtonComponent } from './nxt-carrinho-button.component';

describe('NxtCarrinhoButtonComponent', () => {
  let component: NxtCarrinhoButtonComponent;
  let fixture: ComponentFixture<NxtCarrinhoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
