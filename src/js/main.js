function initializeSwiper() {
  const swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 8000,
    loop: true,
  })
}

function initializeDragableNavbar() {
  const navList = document.querySelector('.list')
  const computedStyle = document.defaultView.getComputedStyle(navList, null)
  const minOffset = document.body.clientWidth - Number(computedStyle.width.replace('px', ''))
  let offset = 0
  let lastX = null
  navList.addEventListener('touchstart', (e) => {
    lastX = e.touches[0].clientX
  }, true)
  navList.addEventListener('touchmove', (e) => {
    e.preventDefault()

    if (e.touches.length === 1) {
      offset += e.touches[0].clientX - lastX
      offset = Math.max(Math.min(offset, 0), minOffset)
      navList.style.transform = `translateX(${offset}px)`
      lastX = e.touches[0].clientX
    }
  }, true)
}

document.addEventListener('DOMContentLoaded', () => {
  initializeSwiper()
  initializeDragableNavbar()
})
