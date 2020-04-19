export const scrollSmooth = (element: Element) => {
  const offset = 50
  const bodyRect = document.body.getBoundingClientRect().top
  const elementRect = element.getBoundingClientRect().top

  const elementPosition = elementRect - bodyRect
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}
