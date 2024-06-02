import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtEnderecoEditComponent } from './nxt-endereco-edit.component';

describe('NxtEnderecoEditComponent', () => {
  let component: NxtEnderecoEditComponent;
  let fixture: ComponentFixture<NxtEnderecoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtEnderecoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtEnderecoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
