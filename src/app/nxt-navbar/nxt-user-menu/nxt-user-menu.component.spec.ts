import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtUserMenuComponent } from './nxt-user-menu.component';

describe('NxtUserMenuComponent', () => {
  let component: NxtUserMenuComponent;
  let fixture: ComponentFixture<NxtUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtUserMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
