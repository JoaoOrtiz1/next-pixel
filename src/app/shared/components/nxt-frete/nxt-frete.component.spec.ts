import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtFreteComponent } from './nxt-frete.component';

describe('NxtFreteComponent', () => {
  let component: NxtFreteComponent;
  let fixture: ComponentFixture<NxtFreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtFreteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtFreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
