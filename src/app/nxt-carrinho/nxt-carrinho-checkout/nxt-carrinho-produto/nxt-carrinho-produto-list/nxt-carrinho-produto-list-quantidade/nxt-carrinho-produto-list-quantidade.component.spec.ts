import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoProdutoListQuantidadeComponent } from './nxt-carrinho-produto-list-quantidade.component';

describe('NxtCarrinhoProdutoListQuantidadeComponent', () => {
  let component: NxtCarrinhoProdutoListQuantidadeComponent;
  let fixture: ComponentFixture<NxtCarrinhoProdutoListQuantidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoProdutoListQuantidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoProdutoListQuantidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
