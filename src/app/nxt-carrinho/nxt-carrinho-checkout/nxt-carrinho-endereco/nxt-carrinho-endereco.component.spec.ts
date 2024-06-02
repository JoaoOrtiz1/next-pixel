import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoEnderecoComponent } from './nxt-carrinho-endereco.component';

describe('NxtCarrinhoEnderecoComponent', () => {
  let component: NxtCarrinhoEnderecoComponent;
  let fixture: ComponentFixture<NxtCarrinhoEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoEnderecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
