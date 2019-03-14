// import add from('./add.css')
// add.test()
import './add.css'
const add = {
    init(){
        console.log('add组件对应入口文件');
        xtag.create('x-clock', class extends XTagElement {
            constructor(){
                super();
                console.log('初始化')
                this.datas = {
                    user: 'laoyuan'
                }
            }
            connectedCallback () {
              this.start();
            }
            start (){
              this.update();
              this._interval = setInterval(() => this.update(), 1000);
            }
            stop (){
              this._interval = clearInterval(this._data.interval);
            }
            update (){
              this.textContent = new Date().toLocaleTimeString();
            }
            'tap::event' (){
              if (this._interval) this.stop();
              else this.start();
            }
          });
          xtag.create('x-frankenstein', class extends XTagElement {
            name (){ return 'Frankenstein'; }
            '::template(true)' (){
              return `<h2>I am ${this.name()}</h2>
                      <span>I was created by a mad scientist</span>`
            }
            'click::event'(e){
                if(true || e.target == "add-btn"){
                    alert("请求")
                }
            }
          });
          
    }
}
export default add;