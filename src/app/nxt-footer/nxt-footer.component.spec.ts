import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtFooterComponent } from './nxt-footer.component';

describe('NxtFooterComponent', () => {
  let component: NxtFooterComponent;
  let fixture: ComponentFixture<NxtFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
