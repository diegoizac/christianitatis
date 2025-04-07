# 🎮 Implementação Three.js - Christianitatis

## 🌳 Visão Geral

A implementação Three.js no Christianitatis é responsável pela renderização da árvore interativa 3D que serve como navegação principal do site. Cada esfera na árvore representa uma seção diferente do ministério.

## 🎨 Estrutura da Cena

### Configuração Básica

```typescript
// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.Fog(0x000000, 5, 15);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75, // FOV
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near
  1000 // Far
);
camera.position.z = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
```

### Sistema de Iluminação

```typescript
// Ambient light for general illumination
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Directional light for shadows and depth
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Point lights for sphere highlights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);
```

## 🔮 Esferas

### Configuração das Esferas

```typescript
interface SphereConfig {
  id: string;
  color: number;
  size: number;
  position: THREE.Vector3;
  title: string;
}

const sphereConfigs: SphereConfig[] = [
  {
    id: "church-home",
    color: 0xff0000, // Vermelho
    size: 1,
    position: new THREE.Vector3(0, 2, 0),
    title: "Igreja no Lar",
  },
  {
    id: "find-church",
    color: 0x000000, // Preto
    size: 1,
    position: new THREE.Vector3(-2, 0, 0),
    title: "Encontre uma Igreja",
  },
  {
    id: "register-church",
    color: 0x0000ff, // Azul
    size: 1,
    position: new THREE.Vector3(2, 0, 0),
    title: "Cadastre uma Igreja",
  },
  {
    id: "support",
    color: 0xffff00, // Amarelo
    size: 1,
    position: new THREE.Vector3(-1, -2, 0),
    title: "Apoie o Movimento",
  },
  {
    id: "about",
    color: 0x00ff00, // Verde
    size: 1,
    position: new THREE.Vector3(1, -2, 0),
    title: "Quem Somos",
  },
];
```

### Criação das Esferas

```typescript
const createSphere = (config: SphereConfig): THREE.Mesh => {
  const geometry = new THREE.SphereGeometry(config.size, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: config.color,
    specular: 0xffffff,
    shininess: 100,
    emissive: new THREE.Color(config.color).multiplyScalar(0.2),
  });

  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.copy(config.position);
  sphere.userData = { id: config.id, title: config.title };

  return sphere;
};
```

## 🎯 Interatividade

### Raycasting

```typescript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const onMouseMove = (event: MouseEvent) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(spheres);

  // Reset all spheres
  spheres.forEach((sphere) => {
    (sphere.material as THREE.MeshPhongMaterial).emissive.setHex(0x000000);
  });

  // Highlight intersected sphere
  if (intersects.length > 0) {
    const sphere = intersects[0].object;
    (sphere.material as THREE.MeshPhongMaterial).emissive.setHex(0x555555);
  }
};
```

### Eventos de Click

```typescript
const onClick = (event: MouseEvent) => {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(spheres);

  if (intersects.length > 0) {
    const sphere = intersects[0].object;
    const { id } = sphere.userData;
    onSphereClick?.(id);
  }
};
```

## 🎬 Animações

### Animação Base

```typescript
const animate = () => {
  requestAnimationFrame(animate);

  spheres.forEach((sphere) => {
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
};
```

### Animações GSAP

```typescript
import gsap from "gsap";

const animateSphereHover = (sphere: THREE.Mesh, isHovered: boolean) => {
  gsap.to(sphere.scale, {
    x: isHovered ? 1.2 : 1,
    y: isHovered ? 1.2 : 1,
    z: isHovered ? 1.2 : 1,
    duration: 0.3,
    ease: "power2.out",
  });
};

const animateCameraToSphere = (sphere: THREE.Mesh) => {
  const targetPosition = sphere.position.clone();
  targetPosition.z += 3;

  gsap.to(camera.position, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    duration: 1,
    ease: "power2.inOut",
  });
};
```

## 📱 Responsividade

### Adaptação para Mobile

```typescript
const handleResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  // Ajusta posição das esferas para mobile
  if (width < 768) {
    spheres.forEach((sphere, index) => {
      const config = sphereConfigs[index];
      sphere.position.multiplyScalar(0.7); // Reduz escala
    });
  }
};
```

## 🎮 Controles

### OrbitControls (Opcional)

```typescript
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 8;
```

## 🔧 Performance

### Otimizações

```typescript
// Geometria compartilhada
const sharedGeometry = new THREE.SphereGeometry(1, 32, 32);

// Dispose
const cleanup = () => {
  spheres.forEach((sphere) => {
    sphere.geometry.dispose();
    (sphere.material as THREE.Material).dispose();
  });
  renderer.dispose();
};
```

## 🎨 Efeitos Visuais

### Post-Processing

```typescript
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // strength
  0.4, // radius
  0.85 // threshold
);
composer.addPass(bloomPass);
```

## 🔄 Ciclo de Vida

### Cleanup

```typescript
useEffect(() => {
  // Setup...

  return () => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("click", onClick);

    cleanup();

    if (containerRef.current) {
      containerRef.current.removeChild(renderer.domElement);
    }
  };
}, []);
```

## 🎯 Próximos Passos

1. **Otimizações de Performance**

   - Implementar LOD (Level of Detail)
   - Otimizar geometrias
   - Adicionar instancing para elementos repetitivos

2. **Melhorias Visuais**

   - Adicionar partículas de fundo
   - Melhorar sistema de iluminação
   - Implementar sombras

3. **Interatividade**

   - Adicionar animações de transição entre estados
   - Implementar gestos touch
   - Melhorar feedback visual

4. **Acessibilidade**
   - Adicionar navegação por teclado
   - Implementar descrições para leitores de tela
   - Melhorar contraste e visibilidade
