class modalWindow extends EventEmitter {

    constructor(options) {
        super();
        this.con = document.createElement('div');
        this.con.className = "modal-window";
        this.con.style.top = (options.top || 20) + 'px';
        this.con.style.left = (options.left || 30) + 'px';
        this.con.style.width = (options.width || 400) + 'px';
        this.con.style.height = (options.height || 200) + 'px';
        this.style = options.style || 'classic';
        this.con.classList.add(this.style);
        this.iFrameSrc = options.src || 'https://javascript.ru';
        this.con.style.position = 'absolute';
        this._initHtmlStructure();
        this._addEventListeners();
        this.move = this._move.bind(this);
        this.moveResize = this._moveResize.bind(this);
    }
    _initHtmlStructure() {
        this.con.innerHTML = "<div class='modal-block'><div class='header'><button class='button'><span class='icon'></span></button></div>"
            + "<div class='sun-cont'><iframe class='iframe' src='" + this.iFrameSrc + "'></iframe><div class='footer'><span >&hellip;</span></div></div></div>";
    }

    startDrag(left, top){
        this.shiftX = left - this.con.getBoundingClientRect().left;
        this.shiftY = top - this.con.getBoundingClientRect().top;
        this.con.style.position = 'fixed';
    }

    finishDrag(){
        this.newX = this.newY = this.shiftX = this.shiftY = 0;
        this.isDragging = this.isResizing = false;
    }

    moveOut(e){
        this.newBottom = document.documentElement.clientHeight - 1;
        this.newLeft = document.documentElement.clientWidth - 3;
        if((e.clientY <= 0) || (e.clientX  <= 0) || (e.clientY >= this.newBottom) || (e.clientX>= this.newLeft)) {
            this.con.style.top = this.con.offsetHeight /2 + 'px';
            this.con.style.left = this.con.offsetWidth /2 + 'px';
            this.finishDrag();
        }
    }

    _move(left, top){
        this.newX = left - this.shiftX;
        this.newY = top - this.shiftY;
        this.con.style.left = this.newX + 'px';
        this.con.style.top = this.newY + 'px';
    }

    _moveResize(left, top){
        this.con.style.width = left - this.con.getBoundingClientRect().left + 'px';
        this.con.style.height = top - this.con.getBoundingClientRect().top + 'px';
    }

    _addEventListeners(){
        this.con.querySelector('.button').addEventListener('click', ()=>{ this.close() });


        document.body.addEventListener('mousedown', (e)=>{
            if (e.target.className.includes('header')) {
                this.startDrag(e.clientX, e.clientY);
                this.isDragging = true;
            } else if (e.target.className.includes('footer')) {
                this.startDrag(e.clientX, e.clientY);
                this.isResizing = true;
            }
        });

        document.body.addEventListener('mousemove', (e)=> {
            if (this.isDragging) {
                this.move(e.clientX, e.clientY);
                this.moveOut(e);
            }else if (this.isResizing) {
                this.moveResize(e.clientX, e.clientY)
            }
        });

        document.body.addEventListener('mouseup', (e)=> {
            if (this.isDragging) {
                this.finishDrag();
                this.isDragging = false;
            }else if (this.isResizing) {
                this.finishDrag();
                this.isResizing = false;
            }
        });
        return false;
    }

    setStyle(style) {
        this.con.classList.remove(this.style);
        this.con.classList.add(style);
        this.style = style;
    }

    show() {
        document.body.appendChild(this.con);
    }

    close() {
        this.con.parentNode.removeChild(this.con);
    }

}

var v1 = new modalWindow(   {
    top: 10,
    left: 10,
    width: 400,
    height: 350,
    style: 'modern',
    src: 'http://wikipedia.org'
});
v1.show();



