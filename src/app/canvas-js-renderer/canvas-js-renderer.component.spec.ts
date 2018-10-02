import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasJsRendererComponent } from './canvas-js-renderer.component';

describe('CanvasJsRendererComponent', () => {
  let component: CanvasJsRendererComponent;
  let fixture: ComponentFixture<CanvasJsRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasJsRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasJsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
