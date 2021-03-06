import ParallaxSwiper from '../ParallaxSwiper'

/**
 * Callback from scrollListener
 */
export default class ScrollAnimation {
  constructor() {
    this.sections = document.querySelectorAll('.section')
    this.current_section = document.querySelector('.section--active')
    this.waves = document.querySelector('.waves')
    this.bubbles = document.querySelector('.bubbles')
    this.animation_duration = '1.5'
    this.last_anchor = window.location.hash.substr(1)
  }
  initAnimation(direction) {
    this.direction = direction

    if (!document.querySelector('.section--detailActive')) {
      this.checkCorrectMove()
    }

  }

  checkCorrectMove() {
    if (this.direction && this.direction.axe === 'y') {
      this.animate()
    }
  }

  animate() {
    this.next = parseInt(this.current_section.getAttribute('data-section'), 10) + this.direction.orientation
    if (this.next >= 0 && this.next < this.sections.length) {
      this.directionWaves()
    }
  }

  directionWaves() {
    if (this.direction.orientation === 1) {
      this.animeDown()
    } else {
      this.animeUp()
    }
  }

  animeUp() {
    this.waves.style.animation = `transitionPage ${this.animation_duration}s cubic-bezier(.79,.03,.98,.74) reverse`
    this.removeWaveAnimation()
  }

  animeDown() {
    this.waves.style.animation = `transitionPage ${this.animation_duration}s cubic-bezier(.23,.42,.27,.98)`
    this.removeWaveAnimation()
  }

  removeWaveAnimation() {
    const timerEnd = this.animation_duration * 1000
    window.setTimeout(() => {
      this.waves.style.animation = ''
    }, timerEnd)
    this.changeSection()
  }

  changeSection() {
    this.sectionTimer = this.direction.orientation === -1 ? 900 : 100
    window.setTimeout(() => {
      this.current_section.classList.remove('section--active')
      this.last_anchor = this.current_section.getAttribute('data-anchor')

      // set the new current
      this.current_section = this.sections[this.next]
      this.current_section.classList.add('section--active')
      this.new_anchor = this.current_section.getAttribute('data-anchor')

      const parallax = new ParallaxSwiper()

    }, this.sectionTimer)

    this.last_anchor = this.current_section.getAttribute('data-anchor')
    this.new_anchor = this.sections[this.next].getAttribute('data-anchor')
    this.setAnchor()
    this.setColorPage()
  }

  setAnchor() {
    window.location.hash = this.new_anchor // Anchor in url
  }

  setColorPage() {
    this.wavesTimer = this.direction.orientation === -1 ? 700 : 1000
    window.setTimeout(() => {
      // waves
      this.waves.classList.remove(`waves__color--${this.last_anchor}`)
      this.waves.classList.add(`waves__color--${this.new_anchor}`)
    }, this.wavesTimer)
    this.bubblesTimer = this.direction.orientation === -1 ? 1100 : 10
    window.setTimeout(() => {
      // bubbles
      this.bubbles.classList.remove(`bubbles__color--${this.last_anchor}`)
      this.bubbles.classList.add(`bubbles__color--${this.new_anchor}`)
    }, this.bubblesTimer)
  }
  removeDetail() {
    this.detail = document.querySelector('.section--detailActive')
    if (this.detail) {
      this.detail.classList.remove('section--detailActive')
      document.querySelector('.swiper__circle').style.left = 0
    }
  }
}
