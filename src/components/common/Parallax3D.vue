<template>
  <div ref="container" class="parallax-3d-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, layers = [], particles, rings
let animationId = null

const createSnowflakeShape = () => {
  const shape = new THREE.Shape()
  const arms = 6
  const innerRadius = 0.2
  const outerRadius = 0.5
  
  for (let i = 0; i < arms; i++) {
    const angle = (i / arms) * Math.PI * 2
    const nextAngle = ((i + 1) / arms) * Math.PI * 2
    
    if (i === 0) {
      shape.moveTo(
        Math.cos(angle) * outerRadius,
        Math.sin(angle) * outerRadius
      )
    } else {
      shape.lineTo(
        Math.cos(angle) * outerRadius,
        Math.sin(angle) * outerRadius
      )
    }
    
    shape.lineTo(
      Math.cos(angle + (nextAngle - angle) / 2) * innerRadius,
      Math.sin(angle + (nextAngle - angle) / 2) * innerRadius
    )
  }
  
  shape.closePath()
  return shape
}

const createFloatingGeometry = (type, color, position, scale) => {
  let geometry
  
  // All shapes are now snowflakes
  const snowflakeShape = createSnowflakeShape()
  const extrudeSettings = {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 1
  }
  geometry = new THREE.ExtrudeGeometry(snowflakeShape, extrudeSettings)
  geometry.center()
  
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    emissive: 0xadd8e6,
    emissiveIntensity: 0.2,
    shininess: 100,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide
  })
  
  const mesh = new THREE.Mesh(geometry, material)
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
    size: 0.08,
    transparent: true,
    opacity: 0.3,
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
      opacity: 0.1 - i * 0.03,
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
  
  // Create floating snowflakes at different depths
  const geometries = [
    { type: 'snow', color: 0xffffff, pos: { x: -8, y: 5, z: -5 }, scale: 0.8 },
    { type: 'snow', color: 0xffffff, pos: { x: 8, y: -4, z: -8 }, scale: 1.2 },
    { type: 'snow', color: 0xffffff, pos: { x: -6, y: -6, z: -3 }, scale: 0.6 },
    { type: 'snow', color: 0xffffff, pos: { x: 10, y: 3, z: -10 }, scale: 1.0 },
    { type: 'snow', color: 0xffffff, pos: { x: 0, y: 8, z: -6 }, scale: 0.7 },
    { type: 'snow', color: 0xffffff, pos: { x: -10, y: -2, z: -12 }, scale: 0.9 },
    { type: 'snow', color: 0xffffff, pos: { x: 5, y: -8, z: -7 }, scale: 0.8 },
    { type: 'snow', color: 0xffffff, pos: { x: -4, y: 10, z: -9 }, scale: 0.65 },
    { type: 'snow', color: 0xffffff, pos: { x: 7, y: 6, z: -11 }, scale: 0.75 },
    { type: 'snow', color: 0xffffff, pos: { x: -7, y: -9, z: -4 }, scale: 1.1 },
    { type: 'snow', color: 0xffffff, pos: { x: 3, y: 4, z: -6 }, scale: 0.85 },
    { type: 'snow', color: 0xffffff, pos: { x: -9, y: 7, z: -8 }, scale: 0.95 },
    { type: 'snow', color: 0xffffff, pos: { x: 6, y: -5, z: -5 }, scale: 0.7 },
    { type: 'snow', color: 0xffffff, pos: { x: -3, y: -7, z: -10 }, scale: 1.05 },
    { type: 'snow', color: 0xffffff, pos: { x: 9, y: 9, z: -7 }, scale: 0.8 }
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
  
  // Lights for snow
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)
  
  const pointLight1 = new THREE.PointLight(0xadd8e6, 0.6, 50)
  pointLight1.position.set(10, 10, 10)
  scene.add(pointLight1)
  
  const pointLight2 = new THREE.PointLight(0xffffff, 0.4, 50)
  pointLight2.position.set(-10, -10, 5)
  scene.add(pointLight2)
  
  // Handle scroll with parallax
  const handleScroll = () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    const scrollY = window.scrollY * 0.001
    
    // Camera movement
    camera.position.y = -scrollY * 3
    camera.rotation.x = scrollY * 0.1
    
    // Layer parallax - different speeds for depth (snow falling effect)
    layers.forEach((layer, index) => {
      const speed = (index + 1) * 0.3
      layer.rotation.x = scrollY * speed * 0.3
      layer.rotation.y = scrollY * speed * 0.5
      layer.rotation.z += 0.01 // Gentle rotation
      
      // Vertical falling movement
      layer.position.y -= 0.01
      
      // Reset position when too low
      if (layer.position.y < -15) {
        layer.position.y = 15
      }
      
      // Horizontal drift
      layer.position.x += Math.sin(scrollY + index) * 0.005
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
    
    // Idle animations - gentle snow falling
    layers.forEach((layer, index) => {
      layer.rotation.z += 0.002 * (index % 2 === 0 ? 1 : -1)
      layer.position.y -= 0.008
      layer.position.x += Math.sin(time + index) * 0.003
      
      // Reset snowflake position
      if (layer.position.y < -15) {
        layer.position.y = 15
      }
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
  opacity: 0.5;
}

@media (max-width: 768px) {
  .parallax-3d-container {
    opacity: 0.3;
  }
}
</style>
