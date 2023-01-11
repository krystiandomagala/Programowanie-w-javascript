
        class Slider {
            constructor(elemSelector) {
                this.sliderSelector = elemSelector;
                this.currentSlide = 0; //aktualny slide
                this.slider = null;
                this.elem = null;
                this.slides = null;
                this.prev = null; //przycisk prev
                this.next = null; //przycisk next
                this.dots = [];

                this.generateSlider();
                this.changeSlide(this.currentSlide);
            }

            generateSlider() {
                this.slider = document.querySelector(this.sliderSelector);
                this.slider.classList.add('slider');

                // kontener dla slajdow
                const slidesCnt = document.createElement('div');
                slidesCnt.classList.add('slider-slides-cnt');

                //pobieranie elementu slajdów
                this.slides = this.slider.children;

                // przy przeniesieniu kazdego slajdu
                // dlugosc maleje
                while (this.slides.length) {
                    this.slides[0].classList.add('slider-slide');
                    slidesCnt.appendChild(this.slides[0]);
                }
                this.slides = slidesCnt.querySelectorAll('.slider-slide');
                this.slider.appendChild(slidesCnt);

                this.createPrevNext();
                this.createPagination();
            }

            slidePrev() {
                this.currentSlide--;
                if (this.currentSlide < 0) {
                    this.currentSlide = this.slides.length - 1;
                }
                this.changeSlide(this.currentSlide);
            }

            slideNext() {
                this.currentSlide++;
                if (this.currentSlide > this.slides.length - 1) {
                    this.currentSlide = 0;
                }
                this.changeSlide(this.currentSlide);
            }

            changeSlide(index) {
                this.slides.forEach(slide => {
                    slide.classList.remove('slider-slide-active');
                    slide.setAttribute('aria-hidden', true);
                });

                this.slides[index].classList.add('slider-slide-active');
                this.slides[index].setAttribute('aria-hidden', false);

                this.dots.forEach(dot => dot.classList.remove('slider-pagination-element-active'));
                this.dots[index].classList.add('slider-pagination-element-active');

                //aktualny slide  na wybrany
                this.currentSlide = index;
            };

            createPrevNext() {
                this.prev = document.createElement('button');
                this.prev.type = "button";
                this.prev.innerText = "Poprzedni slide";
                this.prev.classList.add('slider-button');
                this.prev.classList.add('slider-button-prev');
                this.prev.addEventListener('click', this.slidePrev.bind(this));

                this.next = document.createElement('button');
                this.next.type = "button";
                this.next.innerText = "Następny slide";
                this.next.classList.add('slider-button');
                this.next.classList.add('slider-button-next');
                this.next.addEventListener('click', this.slideNext.bind(this));

                const nav = document.createElement('div');
                nav.classList.add('slider-nav');
                nav.appendChild(this.prev);
                nav.appendChild(this.next);
                this.slider.appendChild(nav);
            };

            createPagination() {
                const ulDots = document.createElement('ul');
                ulDots.classList.add('slider-pagination');

                // pętla w ilości liczby slajdów
                for (let i = 0; i < this.slides.length; i++) {
                    // LI wraz z buttonem
                    //każdy button po kliknięciu zmieni slajd

                    const li = document.createElement('li');
                    li.classList.add('slider-pagination-element');

                    const btn = document.createElement('button');
                    btn.classList.add('slider-pagination-button');
                    btn.type = "button";
                    btn.innerText = i + 1;
                    btn.setAttribute('aria-label', `Ustaw slajd ${i+1}`);

                    btn.addEventListener('click', () => this.changeSlide(i));

                    li.appendChild(btn);

                    ulDots.appendChild(li);
                    this.dots.push(li);
                }

                this.slider.appendChild(ulDots);
            }
        }


        const slide = new Slider('#slider1');
    