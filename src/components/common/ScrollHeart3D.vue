<template>
  <div ref="container" class="scroll-3d-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, heart, particles
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

const createParticles = () => {
  const geometry = new THREE.BufferGeometry()
  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 15
    positions[i + 1] = (Math.random() - 0.5) * 15
    positions[i + 2] = (Math.random() - 0.5) * 10
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  
  const material = new THREE.PointsMaterial({
    color: 0x10b981,
    size: 0.1,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  })
  
  return new THREE.Points(geometry, material)
}

onMounted(() => {
  if (!container.value) return
  
  // Scene setup
  scene = new THREE.Scene()
  
  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 5
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)
  
  // Create heart
  const heartShape = createHeartShape()
  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 5
  }
  
  const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings)
  geometry.center()
  
  const material = new THREE.MeshPhongMaterial({
    color: 0x10b981,
    emissive: 0x072f20,
    shininess: 100,
    specular: 0x10b981
  })
  
  heart = new THREE.Mesh(geometry, material)
  scene.add(heart)
  
  // Add particles
  particles = createParticles()
  scene.add(particles)
  
  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  
  const pointLight1 = new THREE.PointLight(0x10b981, 1)
  pointLight1.position.set(5, 5, 5)
  scene.add(pointLight1)
  
  const pointLight2 = new THREE.PointLight(0xffffff, 0.8)
  pointLight2.position.set(-5, -5, 5)
  scene.add(pointLight2)
  
  // Handle scroll
  const handleScroll = () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    
    if (heart) {
      // Rotate heart based on scroll
      heart.rotation.y = scrollPercent * Math.PI * 4
      heart.rotation.x = Math.sin(scrollPercent * Math.PI * 2) * 0.5
      heart.rotation.z = Math.cos(scrollPercent * Math.PI * 2) * 0.3
      
      // Scale heart
      const scale = 1 + Math.sin(scrollPercent * Math.PI * 2) * 0.3
      heart.scale.set(scale, scale, scale)
      
      // Change color based on scroll
      const hue = scrollPercent * 0.3 + 0.45 // Green to cyan range
      heart.material.color.setHSL(hue, 0.7, 0.5)
    }
    
    if (particles) {
      particles.rotation.y = scrollPercent * Math.PI * 2
      particles.rotation.x = scrollPercent * Math.PI
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
    
    // Gentle idle animation
    if (heart) {
      heart.rotation.y += 0.002
    }
    
    if (particles) {
      particles.rotation.y += 0.001
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
.scroll-3d-container {
  position: fixed;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 300px;
  height: 300px;
  pointer-events: none;
  z-index: 50;
  opacity: 0.8;
}

@media (max-width: 1024px) {
  .scroll-3d-container {
    width: 200px;
    height: 200px;
    right: 2%;
  }
}

@media (max-width: 768px) {
  .scroll-3d-container {
    display: none;
  }
}
</style>
