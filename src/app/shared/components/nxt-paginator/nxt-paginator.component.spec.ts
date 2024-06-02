import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxtPaginatorComponent } from './nxt-paginator.component';

describe('NxtPaginatorComponent', () => {
  let component: NxtPaginatorComponent;
  let fixture: ComponentFixture<NxtPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxtPaginatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NxtPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
