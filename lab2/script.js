class Slider {
    constructor(elemSelector) {
        this.currentSlide = 0; //aktualny slide
        this.sliderSelector = elemSelector; //selektor elementu który zamienimy na slider
        this.elem = null; //tutaj pobierzemy element który zamienimy na slider
        this.slider = null; //tutaj wygenerujemy slider
        this.slides = null; //tutaj pobierzemy slajdy
        this.prev = null; //przycisk prev
        this.next = null; //przycisk next
        this.dots = []; //przyciski kropek

        this.generateSlider();
    }

    generateSlider() {
        //pobieramy element który zamienimy na slider
        this.slider = document.querySelector(this.sliderSelector);
        this.slider.classList.add("slider");

        //tworzymy kontener dla slajdów
        const slidesCnt = document.createElement("div");
        slidesCnt.classList.add("slider-slides-cnt");

        //pobieramy element slajdów
        this.slides = this.slider.children;

        //to jest żywa kolekcja, więc przy przeniesieniu każdego slajdu
        //jej długość maleje
        while (this.slides.length) {
            this.slides[0].classList.add("slider-slide");
            //jeżeli element dodajemy do innego elementu
            //to tak jakbyśmy go usuwali z tej kolekcji
            //bo jeden element nie może być równocześnie w dwóch miejscach naraz
            slidesCnt.append(this.slides[0]);
        }

        //musimy na nowo pobrać slajdy, bo powyższa kolekcja jest już pusta
        this.slides = slidesCnt.querySelectorAll(".slider-slide");

        //wygenerowaliśmy kontener ze slajdami, wstawiamy go więc do slidera
        this.slider.append(slidesCnt);


        this.createPrevNext();
        this.createPagination();
    }

    createPrevNext() {
        //generujemy przycisk "Poprzedni slajd"
        this.prev = document.createElement("button");
        this.prev.type = "button";
        this.prev.innerText = "Poprzedni slide";
        this.prev.classList.add("slider-button");
        this.prev.classList.add("slider-button-prev");
        this.prev.addEventListener("click", this.slidePrev.bind(this));

        //generujemy przycisk "Następny slajd"
        this.next = document.createElement("button");
        this.next.type = "button";
        this.next.innerText = "Następny slide";
        this.next.classList.add("slider-button");
        this.next.classList.add("slider-button-next");
        this.next.addEventListener("click", this.slideNext.bind(this));

        //wrzucamy je do wspólnego diva
        //który dam nam ciut większe możliwości stylowania
        const nav = document.createElement("div");
        nav.classList.add("slider-nav");
        nav.appendChild(this.prev);
        nav.appendChild(this.next);

        //diva z przyciskami wrzucamy do slajdu
        this.slider.appendChild(nav);
    }

    createPagination() {
        const ulDots = document.createElement("ul");
        ulDots.classList.add("slider-pagination");

        //tworzymy pętlę w ilości liczby slajdów
        for (let i=0; i<this.slides.length; i++) {
            //każdorazowo tworzymy LI wraz z buttonem
            //każdy button po kliknięciu zmieni slajd
            //za pomocą metody changeSlide()

            const li = document.createElement("li");
            li.classList.add("slider-pagination-element");

            const btn = document.createElement("button");
            btn.classList.add("slider-pagination-button");
            btn.type = "button";
            btn.innerText = i+1;
            btn.setAttribute("aria-label", `Ustaw slajd ${i+1}`);

            btn.addEventListener("click", () => this.changeSlide(i));

            li.appendChild(btn);

            ulDots.appendChild(li);

            //wygenerowany przycisk wrzucamy do wspólnej tablicy
            //dzięki temu potem łatwiej będzie nam się do tych kropek odwoływać
            this.dots.push(li);
        }

        this.slider.appendChild(ulDots);
    }
}

const slide = new Slider("#slider1");