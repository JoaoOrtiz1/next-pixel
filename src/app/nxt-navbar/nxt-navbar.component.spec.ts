import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtNavbarComponent } from './nxt-navbar.component';

describe('NxtNavbarComponent', () => {
  let component: NxtNavbarComponent;
  let fixture: ComponentFixture<NxtNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
