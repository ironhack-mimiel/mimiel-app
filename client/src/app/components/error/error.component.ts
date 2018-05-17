import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasError') canvas: ElementRef;

  @Input() public width = 1700;
  @Input() public height = 800;

  private ctx: CanvasRenderingContext2D;

  constructor() {
    document.addEventListener('keyup', function () {
      console.log('keys pressed');
    });
  }

  ngOnInit() { }

  public ngAfterViewInit(): void {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    // set some default properties about the line
    this.ctx.lineWidth = 13;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#F00';

    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      // this will capture all mousedown events from the canvas element
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          // after a mouse down, we'll record all mouse moves
          .fromEvent(canvasEl, 'mousemove')
          // we'll stop (and unsubscribe) once the user releases the mouse
          // this will trigger a 'mouseup' event
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
          //.takeUntil(Observable.fromEvent(canvasEl, 'mouseleave'))
          // pairwise lets us get the previous value to draw a line from
          // the previous point to the current point
          .pairwise()
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left + window.pageXOffset,
          y: res[0].clientY - rect.top + window.pageYOffset
        };

        const currentPos = {
          x: res[1].clientX - rect.left + window.pageXOffset,
          y: res[1].clientY - rect.top + window.pageYOffset
        };

        console.log("prevPos: " + prevPos);
        console.log('currentPos: ' + currentPos);
        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    // incase the context is not set
    if (!this.ctx) { return; }

    // start our drawing path
    this.ctx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.ctx.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      this.ctx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.ctx.stroke();
    }
  }
}
