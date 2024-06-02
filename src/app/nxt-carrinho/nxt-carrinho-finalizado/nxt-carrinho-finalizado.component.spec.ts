import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoFinalizadoComponent } from './nxt-carrinho-finalizado.component';

describe('NxtCarrinhoFinalizadoComponent', () => {
  let component: NxtCarrinhoFinalizadoComponent;
  let fixture: ComponentFixture<NxtCarrinhoFinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoFinalizadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
