// -----------------------------------------------------------------------------
// This file includes deliberate formatting errors in order for you to verify
// that ESLint and EditorConfig are working properly. If both tools are, indeed,
// working correctly, then you’d see errors in your editor about indentation and
// improper use of footmarks instead of back ticks. When you save this file,
// your editor should strip all excess newlines and whitespace characters from
// the file. If both of these events occur, then ESLint and EditorConfig are
// working correctly.
//
// DON’T PROCEED UNTIL YOU’RE SURE ESLINT AND EDITORCONFIG ARE WORKING CORRECTLY
// -----------------------------------------------------------------------------

let currentSlide = 0;
let slides;

const slidesSections = document.querySelector('.carousel-slides');
const arrows = document.querySelectorAll('.carousel-navigation a');

const reviews = (data) => {
       console.log(data);
       buildCarousel(data.albums);
       slides = document.querySelectorAll('.slide');

       //Code for Left Arrow
       document.querySelectorAll('.carousel-navigation a')[0]
       .addEventListener('click', (e) => {
              e.preventDefault();
              if (0 === currentSlide) return;
              currentSlide--;
              updateCarousel();
       })
       //Code for Right Arrow
       document.querySelectorAll('.carousel-navigation a')[1]
       .addEventListener('click', (e) => {
              e.preventDefault();
              if (slides.length - 1 === currentSlide) return;
              currentSlide++;
              updateCarousel();
       })
       document.addEventListener('keydown', (e) => {
              if (e.key === 'ArrowLeft') {
                     if (0 === currentSlide) return;
                     currentSlide--;
                     updateCarousel();
              } else if (e.key === 'ArrowRight') {
                     if (slides.length - 1 === currentSlide) return;
                     currentSlide++;
                     updateCarousel();
              }
       })
}

const buildCarousel = (albums) => {
       albums.forEach((album) => {
              slidesSections.innerHTML += `
                     <div class="slide">
                            <h2>${album.album}</h2>
                            <h3>
                                   <a href="${album.url}" target="_blank">
                                          ${album.artist}
                                   </a>
                            </h3>
                            <img src="${album.cover_image.path}" width="640">
                            <p class="credit" style="text-align: center;">
                                   Credit:
                                   <a href="${album.cover_image.url}" target="_blank">
                                          ${album.cover_image.credit}
                                   </a>
                            </p>
                            <p>${album.review.content}</p>
                            <p>
                                   <strong>
                                          <a href="${album.review.url}" target="_blank">
                                                 — ${album.review.source}
                                          </a>
                                   </strong>
                            </p>
                     </div>
              `;
       });
}

const updateCarousel = () => {
       const offset = currentSlide * 640;
       slidesSections.style.transform = `translateX(-${offset}px)`;
};

const body = document.querySelector('body');
const script = document.createElement('script');
script.setAttribute('src', 'json/data.json');
body.appendChild(script);
