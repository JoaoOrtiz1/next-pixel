import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPerfilComponent } from './nxt-perfil.component';

describe('NxtPerfilComponent', () => {
  let component: NxtPerfilComponent;
  let fixture: ComponentFixture<NxtPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
