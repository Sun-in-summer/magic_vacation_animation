import Swiper from "swiper";

export default () => {
  let storySlider;
  let sliderContainer = document.getElementById(`story`);
  sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;

  // const animateSlides = () => {
  //   console.log(`animate`);

  //   const activeSlide = storySlider.slides[storySlider.activeIndex];
  //   const nextSlide = storySlider.slides[storySlider.activeIndex + 1];
  //   const slides = [activeSlide, nextSlide].filter((slide) => slide !== null);
  //   console.log(slides);

  //   slides.forEach((slide, slideIndex) => {
  //     const texts = slide.querySelectorAll(`.slider__item-text`);
  //     console.log(texts);

  //     texts.forEach((text, textIndex) => {
  //       // Убираем inline-стили, которые могли остаться
  //       text.style.removeProperty(`opacity`);
  //       text.style.removeProperty(`transition`);

  //       // Форсируем перерисовку через getComputedStyle
  //       // Это более надёжно, чем void text.offsetHeight
  //       void window.getComputedStyle(text).opacity;
  //       // Сброс
  //       // Устанавливаем начальное состояние
  //       text.style.opacity = `0`;
  //       text.style.transition = `none`;

  //       // Ещё один форсированный reflow для гарантии
  //       text.getBoundingClientRect();

  //       const slideDelay = slideIndex * 300; // 0 или 300 мс
  //       const textDelay = textIndex * 100;
  //       const totalDelay = slideDelay + textDelay;

  //       // Запускаем анимацию
  //       setTimeout(() => {
  //         text.style.transition = `opacity 2s cubic-bezier(0.4, 0, 0.2, 1)`;
  //         text.style.opacity = `1`;
  //       }, totalDelay);
  //     });
  //   });
  // };

  const setSlider = function () {
    if (window.innerWidth / window.innerHeight < 1 || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChangeTransitionEnd: () => {
            // animateSlides();
            if (
              storySlider.activeIndex === 0 ||
              storySlider.activeIndex === 1
            ) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
            } else if (
              storySlider.activeIndex === 2 ||
              storySlider.activeIndex === 3
            ) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg"), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
            } else if (
              storySlider.activeIndex === 4 ||
              storySlider.activeIndex === 5
            ) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg"), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
            } else if (
              storySlider.activeIndex === 6 ||
              storySlider.activeIndex === 7
            ) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg"), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
            }
          },

          resize: () => {
            storySlider.update();
          },
        },
        observer: true,
        observeParents: true,
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`,
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg")`;
            } else if (storySlider.activeIndex === 2) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg")`;
            } else if (storySlider.activeIndex === 4) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg")`;
            } else if (storySlider.activeIndex === 6) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg")`;
            }
            // animateSlides();
          },
          resize: () => {
            storySlider.update();
          },
        },
        observer: true,
        observeParents: true,
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};

const fillBg = document.querySelector(`.js-fill-bg`);
const storyScreen = document.getElementById(`story`);
const prizesScreen = document.getElementById(`prizes`);

function goToPrizes() {
  // 1. Показываем фон
  fillBg.classList.add(`active`);

  // 2. Ждём окончания анимации заливки (800ms)
  setTimeout(() => {
    // Скрываем предыдущий экран
    storyScreen.classList.add(`screen--hidden`);
    // Показываем экран Призы
    prizesScreen.classList.remove(`screen--hidden`);

    // Если нужно, фон можно убрать после показа Призов
    fillBg.classList.remove(`active`);
  }, 800);
}

// Пример вызова функции — при клике на "следующий слайд" на Истории
const nextBtn = document.querySelector(`.js-control-next`);
nextBtn.addEventListener(`click`, () => {
  // условие: если мы на последнем слайде Истории
  const swiper = document.querySelector(`.js-slider`).swiper;
  if (swiper.activeIndex === swiper.slides.length - 1) {
    goToPrizes();
  }
});
