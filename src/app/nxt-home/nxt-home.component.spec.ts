import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtHomeComponent } from './nxt-home.component';

describe('NxtHomeComponent', () => {
  let component: NxtHomeComponent;
  let fixture: ComponentFixture<NxtHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
