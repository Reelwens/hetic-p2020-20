import ScrollListener from './ScrollListener'
import ScrollAnimation from './ScrollAnimation'
import Bubble from './Bubble'
import Anchor from './Anchor'
import ListenDrag from './ListenDrag'
import GyroscopeBubble from './GyroscopeBubble'


window.addEventListener('load', () => {
  // Anchor test
  const anchor = new Anchor()

  // Init scroll animation
  const scrollInit = (direction) => {
    const scrollAnim = new ScrollAnimation(direction)
  }

  // Listener Scroll
  const scroll = new ScrollListener(scrollInit, 1500, true)


  const bubbles = new Bubble()
  bubbles.createBubble()

  const gyroBubble = new GyroscopeBubble()
})

const drag = new ListenDrag()

/*
const element = document.querySelector('.swiper__circle')
const options = {
  grid: 200,
  limit: {
    x: [1, 200],
    y: [-5, 5]
  },
  smoothDrag: true,
  onDrag: (drag, e) => {
    if (e >= 200) {
    }
  },
}

*/

