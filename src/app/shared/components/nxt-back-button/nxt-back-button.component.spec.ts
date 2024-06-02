import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtBackButtonComponent } from './nxt-back-button.component';

describe('NxtBackButtonComponent', () => {
  let component: NxtBackButtonComponent;
  let fixture: ComponentFixture<NxtBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtBackButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
