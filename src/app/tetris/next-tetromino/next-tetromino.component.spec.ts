import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTetrominoComponent } from './next-tetromino.component';

describe('NextTetrominoComponent', () => {
  let component: NextTetrominoComponent;
  let fixture: ComponentFixture<NextTetrominoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextTetrominoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTetrominoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
