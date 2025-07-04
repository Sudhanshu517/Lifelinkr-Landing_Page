


const swiper = new Swiper(".trustedSwiper", {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 4, // reduce from 5 to 4
            spaceBetween: 40,
        },
    },
});






const floater = document.getElementById("calendarFloater");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // 🔽 Lower threshold to trigger earlier
    const threshold = 300;

    if (scrollY > threshold) {
        floater.classList.add("scrolled");
    } else {
        floater.classList.remove("scrolled");
    }
});


const calendarGrid = document.getElementById("calendarGrid");
const monthLabel = document.getElementById("monthLabel");

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentYear = 2025;
let currentMonth = 5; // June

function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthLabel.innerText = `${months[month]} ${year}`;
    calendarGrid.innerHTML = "";

    // Add padding for first day (convert Sunday=0 to Sunday=6)
    const offset = (firstDay === 0 ? 6 : firstDay - 1);
    for (let i = 0; i < offset; i++) {
        const pad = document.createElement("span");
        pad.className = "calendar-day invisible";
        pad.innerText = ".";
        calendarGrid.appendChild(pad);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const day = document.createElement("span");
        day.className = "calendar-day";
        day.innerText = d;
        calendarGrid.appendChild(day);
    }
}

document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);


document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const moreText = button.previousElementSibling;
        if (moreText.classList.contains('d-none')) {
            moreText.classList.remove('d-none');
            button.textContent = " Read Less";
        } else {
            moreText.classList.add('d-none');
            button.textContent = " Read More";
        }
    });
});





document.getElementById('loadMoreBtn').addEventListener('click', function () {
    document.getElementById('moreFaqs').classList.remove('d-none');
    this.style.display = 'none';
});

//to stop calender before footer

  const calendar = document.getElementById("calendarFloater");
  const footer = document.querySelector("footer"); // adjust selector if needed

  function stopCalendarBeforeFooter() {
    const footerTop = footer.getBoundingClientRect().top;
    const calendarHeight = calendar.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (footerTop < calendarHeight + 120) {
      // Push up calendar when footer is near
      calendar.style.top = `${footerTop - calendarHeight - 250}px`;
    } else {
      // Keep calendar at fixed 100px
      calendar.style.top = "100px";
    }
  }

  window.addEventListener("scroll", stopCalendarBeforeFooter);
  window.addEventListener("resize", stopCalendarBeforeFooter);
  window.addEventListener("load", stopCalendarBeforeFooter);


