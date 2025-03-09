import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CenteredThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const spheresRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const geometries = [
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.SphereGeometry(0.8, 24, 24),
      new THREE.SphereGeometry(0.5, 16, 16),
    ];
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0x555555, shininess: 30 }), // Red
      new THREE.MeshPhongMaterial({ color: 0x0000ff, specular: 0x555555, shininess: 30 }), // Blue
      new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x555555, shininess: 30 }), // Green
    ];

    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const sphere = new THREE.Mesh(geometries[i], materials[i]);
      sphere.position.x = (i - 1) * 2;
      scene.add(sphere);
      spheres.push(sphere);
    }
    spheresRef.current = spheres;

    camera.position.z = 5;

    // Mouse move handler
    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(spheresRef.current);

      // Reset emissive color for all spheres
      spheresRef.current.forEach((sphere) => {
        (sphere.material as THREE.MeshPhongMaterial).emissive.setHex(0x000000);
      });

      // Highlight intersected sphere
      if (intersects.length > 0) {
        const intersected = intersects[0].object as THREE.Mesh;
          (intersected.material as THREE.MeshPhongMaterial).emissive.setHex(0x555555); // Make it glow
      }
    };

    // Add mouse move listener
    window.addEventListener('mousemove', onMouseMove, false);

    const animate = () => {
      requestAnimationFrame(animate);

      spheresRef.current.forEach((sphere) => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full flex items-center justify-center"></div>;
};

export default CenteredThreeScene;
