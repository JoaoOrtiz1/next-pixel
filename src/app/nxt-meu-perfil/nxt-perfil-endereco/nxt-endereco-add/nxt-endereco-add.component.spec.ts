import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtEnderecoAddComponent } from './nxt-endereco-add.component';

describe('NxtEnderecoAddComponent', () => {
  let component: NxtEnderecoAddComponent;
  let fixture: ComponentFixture<NxtEnderecoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtEnderecoAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtEnderecoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
