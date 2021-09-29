/** Carousel
 * 
 * 
 * */
class Carousel {
    constructor() {
        this.slideState = 0;
        this.autoSlideState = 0;
        this.prev = document.querySelector('.prev');
        this.next = document.querySelector('.next');
        this.item = document.querySelectorAll('.carousel__box');
        //default state
        this.item[this.slideState].style.display = 'flex';
    }
    // Method manual carousel
    showSlide(n) {
        // Checking scope of carousel length
        if (n > this.item.length - 1) {
            n = 0;
            this.slideState = 0;
        } else if (n < 0) {
            n = this.item.length - 1;
            this.slideState = this.item.length - 1;
        }
        // Hiding all slides
        for (let i = 0; i < this.item.length; i++) {
            this.item[i].style.display = 'none';
        }
        // Show current slide
        this.item[n].style.display = 'flex';


        console.log(n);
    }
    currentSlides(n) {
        this.showSlide(this.slideState += n)
    }
    // Method auto carousel
    sliderAuto(time) {

        setInterval(() => {
            // Hiding all sildes
            for (let i = 0; i < this.item.length; i++) {
                this.item[i].style.display = 'none';
            }
            this.autoSlideState += 1;
            // Checking scope of carousel length
            if (this.autoSlideState > this.item.length - 1) {
                this.autoSlideState = 0;
            } else if (this.autoSlideState < 0) {
                this.autoSlideState = this.item.length - 1;
            }
            // Show current slide
            this.item[this.autoSlideState].style.display = 'flex';

        }, time);
    }
}

class buttonListener extends Carousel {
    events() {
        this.prev.addEventListener('click', () => this.currentSlides(-1));
        this.next.addEventListener('click', () => this.currentSlides(1));
    }
}


// Startnig manual carousel
const buttonSlider = new buttonListener();
buttonSlider.events();

// Starting auto carousel with parameter- time
const carouselAuto = new Carousel();
carouselAuto.sliderAuto(6000);