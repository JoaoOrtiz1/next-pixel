import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoProdutoListComponent } from './nxt-carrinho-produto-list.component';

describe('NxtCarrinhoProdutoListComponent', () => {
  let component: NxtCarrinhoProdutoListComponent;
  let fixture: ComponentFixture<NxtCarrinhoProdutoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoProdutoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoProdutoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
