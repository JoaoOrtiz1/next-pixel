import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoProdutoComponent } from './nxt-carrinho-produto.component';

describe('NxtCarrinhoProdutoComponent', () => {
  let component: NxtCarrinhoProdutoComponent;
  let fixture: ComponentFixture<NxtCarrinhoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
