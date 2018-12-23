import {
  AmbientLight
  , DirectionalLight
  , HemisphereLight
  , PointLight
  , RectAreaLight
  , SpotLight
} from 'three'
import THREEObjectMixin from './v3-object.mixin'

const Types = {
  ambientlight: ({ color, intensity }) => new AmbientLight( color, intensity )
  , directionallight: ({ color, intensity }) => new DirectionalLight( color, intensity )
  , hemispherelight: ({ skyColor, groundColor, intensity }) => new HemisphereLight( skyColor, groundColor, intensity )
  , pointlight: ({ color, intensity, distance, decay }) => new PointLight( color, intensity, distance, decay )
  , rectarealight: ({ color, intensity, width, height }) => new RectAreaLight( color, intensity, width, height )
  , spotlight: ({ color, intensity, distance, angle, penumbra, decay }) => new SpotLight( color, intensity, distance, angle, penumbra, decay )
}

const watchableProps = {
  color: {
    type: Number
    , default: 0xffffff
  }
  , intensity: {
    type: Number
    , default: 1
  }
  , distance: {
    type: Number
    , default: 0
  }
  , angle: {
    type: Number
    , default: Math.PI/2
  }
  , penumbra: {
    type: Number
    , default: 0
  }
  , decay: {
    type: Number
    , default: undefined
  }
  , skyColor: {
    type: Number
    , default: 0xffffff
  }
  , groundColor: {
    type: Number
    , default: 0xffffff
  }
  , position: {
    default: () => [ 0, 0, 0 ]
  }
}

export default {
  name: 'v3-light'
  , mixins: [ THREEObjectMixin ]
  , props: {
    type: String

    , ...watchableProps
  }
  , components: {
  }
  , data: () => ({
  })
  , created(){
    const light = this.lightConstructor( this )
    light.position.fromArray(this.position)
    this.v3object = light
  }
  , computed: {
    lightConstructor(){
      let name = this.type.toLowerCase()
      return Types[ name + 'light' ] || Types[ name ]
    }
  }
  , methods: {
    updateObjects(){
      this.addTHREEObjectWatchers( this.v3object, watchableProps )
    }
  }
}
