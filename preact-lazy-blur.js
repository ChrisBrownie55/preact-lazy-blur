import { h, Component } from 'preact'
import Waypoint from 'preact-waypoint'

/**
 * Class that blurs an image and replaces it lazily with another image
 * @export
 * @class ReactLazyBlur
 * @param {URL} image The full-sized image src URL
 * @param {URL} blur The smaller image to be blurred's src URL
 * @param {Number} [duration=500] The duration of the transition from blur to image in milliseconds 
 * @param {Object} [containerStyle] Style for the container that holds both of the images
 * @param {Object} [style] Style for the images, both blur and image
**/
export default class ReactLazyBlur extends Component {
  constructor(props) {
    super(props)

    this.state = {
      waypoint: false,
      image: {
        transition: 'opacity',
        transitionDuration: `${this.props.duration}ms`,
        opacity: 0
      },
      imageSource: '',
      blur: {
        transition: 'opacity',
        transitionDuration: `${this.props.duration}ms`,
        opacity: 1,
        filter: 'blur(50%)'
      },
      blurSource: this.props.blur,
      loaded: false
    }
  }
  
  componentWillMount() {
    // display blurred image in the place of background before load
    this.setState({
      imageSource: this.props.blur
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.waypoint !== nextState.waypoint && !nextState.loading && !nextState.loaded) { this.lazy() }
    return true
  }

  lazy() {
    const { image: src } = this.props
    const duration = this.props.duration || 500
    const self = this

    // start loading background image
    const img = new Image()
    img.onload = () => {

      // on load, display the background and swap background with blur
      self.setState({
        blur: {
          transition: `opacity ${duration}ms`,
          opacity: 1
        },
        image: {
          transition: `opacity ${duration}ms`,
          opacity: 0
        },
        imageSource: img.src
      })

      //wait for next tick, so opacity from the previous block could be first added to the DOM
      requestAnimationFrame(() => {

        //fade out the blurred image by changing the opacity
        self.setState({
          blur: {
            ...this.state.blur,
            opacity: 0
          },
          image: {
            ...this.setState.image,
            opacity: 1
          }
        })

        //finally remove the blur and its instances
        setTimeout(() => self.setState({ loaded: true }), duration)
      })
    }
    img.src = src
  }

  render() {
    const { children, style={}, containerStyle={} } = this.props
    const { image, imageSource, blur, blurSource } = this.state
    const className = `react-lazy-blur ${this.props.className || ''}`
    const imageStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      ...style
    }
    
    return (
      <div className={ className } style={{ position: 'relative', ...containerStyle }}>
        <Waypoint onEnter={() => this.setState({ waypoint: true })} />
        <img className='react-lazy-blur image' src={imageSource} style={{ ...image, ...imageStyles }} />
        {!this.state.loaded
          ? <img className='react-lazy-blur blur' src={blurSource} style={{ ...blur, ...imageStyles  }} />
          : null
        }
        {children}
        <Waypoint onEnter={() => this.setState({ waypoint: true })} />
      </div>
    )
  }
}