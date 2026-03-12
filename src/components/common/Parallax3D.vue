<template>
  <div ref="container" class="parallax-3d-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, layers = [], particles, rings
let animationId = null

const createHeartShape = () => {
  const shape = new THREE.Shape()
  const x = 0, y = 0
  
  shape.moveTo(x + 0.5, y + 0.5)
  shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y)
  shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7)
  shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9)
  shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7)
  shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y)
  shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5)
  
  return shape
}

const createFloatingGeometry = (type, color, position, scale) => {
  let geometry
  
  if (type === 'heart') {
    const heartShape = createHeartShape()
    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3
    }
    geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings)
    geometry.center()
  } else if (type === 'heart-wireframe') {
    const heartShape = createHeartShape()
    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: false
    }
    geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings)
    geometry.center()
  } else if (type === 'heart-outline') {
    const heartShape = createHeartShape()
    const points = heartShape.getPoints(50)
    geometry = new THREE.BufferGeometry().setFromPoints(points)
  } else {
    // Fallback to simple geometry
    geometry = new THREE.IcosahedronGeometry(1, 0)
  }
  
  const material = new THREE.MeshPhongMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.4,
    shininess: 100,
    transparent: true,
    opacity: type === 'heart-wireframe' ? 0.6 : 0.8,
    wireframe: type === 'heart-wireframe',
    side: THREE.DoubleSide
  })
  
  const mesh = type === 'heart-outline' 
    ? new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.7,
        linewidth: 2
      }))
    : new THREE.Mesh(geometry, material)
  
  mesh.position.set(position.x, position.y, position.z)
  mesh.scale.set(scale, scale, scale)
  
  return mesh
}

const createParticleField = () => {
  const geometry = new THREE.BufferGeometry()
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50
    positions[i + 1] = (Math.random() - 0.5) * 50
    positions[i + 2] = (Math.random() - 0.5) * 30
    
    const color = new THREE.Color()
    color.setHSL(0.45 + Math.random() * 0.1, 0.7, 0.5)
    colors[i] = color.r
    colors[i + 1] = color.g
    colors[i + 2] = color.b
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  
  const material = new THREE.PointsMaterial({
    size: 0.15,
    transparent: true,
    opacity: 0.6,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })
  
  return new THREE.Points(geometry, material)
}

const createGlowingRings = () => {
  const group = new THREE.Group()
  
  for (let i = 0; i < 3; i++) {
    const geometry = new THREE.TorusGeometry(3 + i * 1.5, 0.05, 16, 100)
    const material = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.3 - i * 0.08,
      blending: THREE.AdditiveBlending
    })
    
    const ring = new THREE.Mesh(geometry, material)
    ring.rotation.x = Math.PI / 2
    group.add(ring)
  }
  
  return group
}

onMounted(() => {
  if (!container.value) return
  
  // Scene setup
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x000000, 10, 50)
  
  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 15
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)
  
  // Create floating heart geometries at different depths
  const geometries = [
    { type: 'heart', color: 0x10b981, pos: { x: -8, y: 5, z: -5 }, scale: 1.5 },
    { type: 'heart-wireframe', color: 0x059669, pos: { x: 8, y: -4, z: -8 }, scale: 2 },
    { type: 'heart', color: 0x34d399, pos: { x: -6, y: -6, z: -3 }, scale: 1.2 },
    { type: 'heart-wireframe', color: 0x10b981, pos: { x: 10, y: 3, z: -10 }, scale: 1.8 },
    { type: 'heart', color: 0x6ee7b7, pos: { x: 0, y: 8, z: -6 }, scale: 1 },
    { type: 'heart', color: 0x059669, pos: { x: -10, y: -2, z: -12 }, scale: 1.5 },
    { type: 'heart-wireframe', color: 0x34d399, pos: { x: 5, y: -8, z: -7 }, scale: 1.3 },
    { type: 'heart', color: 0x10b981, pos: { x: -4, y: 10, z: -9 }, scale: 1.1 }
  ]
  
  geometries.forEach(geo => {
    const mesh = createFloatingGeometry(geo.type, geo.color, geo.pos, geo.scale)
    layers.push(mesh)
    scene.add(mesh)
  })
  
  // Add particle field
  particles = createParticleField()
  scene.add(particles)
  
  // Add glowing rings
  rings = createGlowingRings()
  rings.position.set(0, 0, -5)
  scene.add(rings)
  
  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)
  
  const pointLight1 = new THREE.PointLight(0x10b981, 2, 50)
  pointLight1.position.set(10, 10, 10)
  scene.add(pointLight1)
  
  const pointLight2 = new THREE.PointLight(0x34d399, 1.5, 50)
  pointLight2.position.set(-10, -10, 5)
  scene.add(pointLight2)
  
  const pointLight3 = new THREE.PointLight(0x6ee7b7, 1, 50)
  pointLight3.position.set(0, 0, 15)
  scene.add(pointLight3)
  
  // Handle scroll with parallax
  const handleScroll = () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    const scrollY = window.scrollY * 0.001
    
    // Camera movement
    camera.position.y = -scrollY * 3
    camera.rotation.x = scrollY * 0.1
    
    // Layer parallax - different speeds for depth
    layers.forEach((layer, index) => {
      const speed = (index + 1) * 0.5
      layer.rotation.x = scrollY * speed * 0.5
      layer.rotation.y = scrollY * speed
      layer.rotation.z = scrollY * speed * 0.3
      
      // Vertical movement
      layer.position.y += Math.sin(scrollPercent * Math.PI * 2 + index) * 0.02
      
      // Scale pulsing
      const scale = layer.scale.x + Math.sin(scrollPercent * Math.PI * 4 + index) * 0.01
      layer.scale.set(scale, scale, scale)
      
      // Color shift
      const hue = 0.45 + scrollPercent * 0.15 + (index * 0.02)
      layer.material.color.setHSL(hue, 0.7, 0.5)
      layer.material.emissive.setHSL(hue, 0.7, 0.3)
    })
    
    // Particles parallax
    if (particles) {
      particles.rotation.y = scrollY * 0.3
      particles.rotation.x = scrollY * 0.2
      particles.position.y = -scrollY * 2
    }
    
    // Rings rotation
    if (rings) {
      rings.rotation.z = scrollY * 0.5
      rings.position.y = -scrollY * 1.5
    }
  }
  
  window.addEventListener('scroll', handleScroll)
  
  // Handle resize
  const handleResize = () => {
    if (!container.value) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }
  
  window.addEventListener('resize', handleResize)
  
  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    const time = Date.now() * 0.0005
    
    // Idle animations
    layers.forEach((layer, index) => {
      layer.rotation.x += 0.001 * (index % 2 === 0 ? 1 : -1)
      layer.rotation.y += 0.002 * (index % 2 === 0 ? 1 : -1)
      layer.position.y += Math.sin(time + index) * 0.001
    })
    
    if (particles) {
      particles.rotation.y += 0.0005
    }
    
    if (rings) {
      rings.rotation.z += 0.001
    }
    
    renderer.render(scene, camera)
  }
  
  animate()
  
  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
    if (animationId) cancelAnimationFrame(animationId)
    if (renderer) {
      renderer.dispose()
      container.value?.removeChild(renderer.domElement)
    }
  })
})
</script>

<style scoped>
.parallax-3d-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .parallax-3d-container {
    opacity: 0.4;
  }
}
</style>
