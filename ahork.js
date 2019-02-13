// Array.Prototype for print in HTML
Array.prototype.print = function (separator) {
    return this.join(separator);
}
Array.prototype.HowMany = function (item) {
    let cont = 0;
    this.forEach(arrayitem => {
        if (item == arrayitem) {
            cont += 1;
        }        
    });
    return cont;
}
// -----------------INICIO-------------------------- //
const App = new Vue({
    el: '#app',

    data: {
        Word: [],
        Letters: [],
        Errorlet: [],
        SelLetter: '',
        mensaje: '',
        picsrc: "images/pic0.png",
        Juego: {
            fasejuego: true,
            end: false,
        },
        ganar: false
    },

    mounted() {
        this.Buildword();
    },

    methods: {
        Buildword() {
            function Randomword(len) {
                return Math.floor((Math.random() * len));
            }
            this.Word =
                list_palabras[Randomword(list_palabras.length)].split('')
            console.log(this.Word);
            this.Word.forEach(Letter => {
                this.Letters.push('_')
            });
        },
        LetterHandler() {
            if (this.Word.includes(this.SelLetter)) {
                for (let i = 0; i < this.Word.length; i++) {
                    if ((this.SelLetter == this.Word[i])) {
                        this.Letters[i] = this.Word[i];
                    }                
                }
                if (!this.Letters.includes('_')) {
                    this.ganar = true;
                    this.Juego.end = true;
                    this.Juego.fasejuego = false;    
                }
                
            } else {
                this.Errorlet.push(this.SelLetter)
                if (this.Errorlet.length == 8) {
                    this.Juego.end = true;
                    this.Juego.fasejuego = false;
                }
                
            }
            this.ImgHandler();
            this.SelLetter = ''
        },
        ImgHandler () {
            let num = this.Errorlet.length;
            this.picsrc = 'images/pic' + num + '.png';
            console.log(this.picsrc);            
        },
        
    },
});
// ------------------Componentes-------------------
Vue.component('imagenesahork', {
    props: {
        imgsrc: {
            type: String,
            default: 'images/pic3.png'
        }
    },
    template: '\
        <div>\
            <img v-bind:src=imgsrc>\
        </div>'    
});
Vue.component("finjuego", {
  props: {
    Victoria: {
      type: Boolean,
      default: false
    }
  },
  template:
    '\
      <div>\
          <div v-if="Victoria">\
              <img src="images/pic9.png">\
              <h2>Has ganado!!!</h2>\
          </div>\
          <div v-else>\
              <img src="images/pic8.png">\
              <h2>Has Perdido!!!</h2>\
          </div>\
          <h2><button onclick="window.location.href = window.location.href">Juego nuevo</button></h2>\
      </div>'
});
