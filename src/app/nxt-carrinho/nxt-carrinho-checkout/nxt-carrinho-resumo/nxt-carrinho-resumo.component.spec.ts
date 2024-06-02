import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoResumoComponent } from './nxt-carrinho-resumo.component';

describe('NxtCarrinhoResumoComponent', () => {
  let component: NxtCarrinhoResumoComponent;
  let fixture: ComponentFixture<NxtCarrinhoResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoResumoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
