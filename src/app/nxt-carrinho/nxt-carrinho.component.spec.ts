import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtCarrinhoComponent } from './nxt-carrinho.component';

describe('NxtCarrinhoComponent', () => {
  let component: NxtCarrinhoComponent;
  let fixture: ComponentFixture<NxtCarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtCarrinhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
