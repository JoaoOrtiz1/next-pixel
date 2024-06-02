import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoProdutoDeleteComponent } from './nxt-carrinho-produto-delete.component';

describe('NxtCarrinhoProdutoDeleteComponent', () => {
  let component: NxtCarrinhoProdutoDeleteComponent;
  let fixture: ComponentFixture<NxtCarrinhoProdutoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoProdutoDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoProdutoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
