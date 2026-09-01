// NOVAprint / Creative Commerce Studio: preview 3D del termo con textura cilíndrica envolvente.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type Thermo3DViewerProps = {
  artworkUrl?: string;
  artworkText?: string;
  accent?: string;
  thermoColor?: string;
};

export function Thermo3DViewer({ artworkUrl, artworkText, accent = "#2563eb", thermoColor = "#f7f7f3" }: Thermo3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#eef0ee");
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(4.8, 0.55, 9.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight("#ffffff", "#aeb8c6", 2.3);
    scene.add(ambient);
    const key = new THREE.DirectionalLight("#ffffff", 3.2);
    key.position.set(4, 6, 6);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.DirectionalLight("#93b7ff", 1.7);
    rim.position.set(-4, 1, -5);
    scene.add(rim);

    const bottle = new THREE.Group();
    const profile = [
      new THREE.Vector2(0.08, -2.18), new THREE.Vector2(0.82, -2.18), new THREE.Vector2(1.02, -2.05),
      new THREE.Vector2(1.08, -1.78), new THREE.Vector2(1.08, 1.28), new THREE.Vector2(1.03, 1.56),
      new THREE.Vector2(0.84, 1.82), new THREE.Vector2(0.6, 2.0), new THREE.Vector2(0.56, 2.22), new THREE.Vector2(0.08, 2.22),
    ];
    const bodyGeometry = new THREE.LatheGeometry(profile, 128);
    bodyGeometry.computeVertexNormals();
    const bodyMaterial = new THREE.MeshPhysicalMaterial({ color: thermoColor, roughness: 0.28, metalness: 0.04, clearcoat: 0.28, clearcoatRoughness: 0.2 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    bottle.add(body);

    const capMaterial = new THREE.MeshPhysicalMaterial({ color: "#b7b8b6", roughness: 0.22, metalness: 0.82, clearcoat: 0.4 });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.61, 0.62, 96), capMaterial);
    cap.position.y = 2.5;
    cap.castShadow = true;
    bottle.add(cap);
    const capTop = new THREE.Mesh(new THREE.SphereGeometry(0.59, 64, 24, 0, Math.PI * 2, 0, Math.PI / 2), capMaterial);
    capTop.scale.y = 0.46;
    capTop.position.y = 2.81;
    capTop.castShadow = true;
    bottle.add(capTop);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 0.88, 0.08, 96), new THREE.MeshStandardMaterial({ color: "#c6c8c3", roughness: 0.6 }));
    base.position.y = -2.18;
    base.castShadow = true;
    bottle.add(base);
    scene.add(bottle);

    const floor = new THREE.Mesh(new THREE.CircleGeometry(3.8, 64), new THREE.ShadowMaterial({ opacity: 0.15 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.25;
    floor.receiveShadow = true;
    scene.add(floor);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enablePan = false;
    controls.minDistance = 7;
    controls.maxDistance = 12;
    controls.minPolarAngle = Math.PI * 0.35;
    controls.maxPolarAngle = Math.PI * 0.66;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.3;
    controls.target.set(0, 0.15, 0);

    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 768;
    textureCanvas.height = 1024;
    const textureContext = textureCanvas.getContext("2d");
    const canvasTexture = new THREE.CanvasTexture(textureCanvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    canvasTexture.wrapS = THREE.RepeatWrapping;
    canvasTexture.wrapT = THREE.ClampToEdgeWrapping;
    canvasTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    bodyMaterial.map = canvasTexture;
    bodyMaterial.needsUpdate = true;

    let disposed = false;
    const drawTexture = (image?: HTMLImageElement) => {
      if (!textureContext) return;
      textureContext.clearRect(0, 0, textureCanvas.width, textureCanvas.height);
      textureContext.fillStyle = thermoColor;
      textureContext.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
      if (image) {
        const scale = Math.max(textureCanvas.width / image.width, textureCanvas.height / image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        textureContext.drawImage(image, (textureCanvas.width - width) / 2, (textureCanvas.height - height) / 2, width, height);
      } else {
        textureContext.fillStyle = `${accent}22`;
        textureContext.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
        textureContext.fillStyle = accent;
        textureContext.beginPath();
        textureContext.arc(160, 190, 170, 0, Math.PI * 2);
        textureContext.fill();
        textureContext.fillStyle = "#ffffffcc";
        textureContext.beginPath();
        textureContext.arc(550, 780, 260, 0, Math.PI * 2);
        textureContext.fill();
        textureContext.fillStyle = "#111111";
        textureContext.fillRect(240, 430, 290, 15);
        textureContext.fillRect(300, 465, 170, 8);
      }
      if (artworkText) {
        textureContext.fillStyle = image ? "rgba(255,255,255,.9)" : "#111111";
        textureContext.font = "700 34px Arial";
        textureContext.textAlign = "center";
        textureContext.fillText(artworkText.slice(0, 26), textureCanvas.width / 2, 610);
      }
      canvasTexture.needsUpdate = true;
    };

    if (artworkUrl) {
      const image = new Image();
      image.onload = () => { if (!disposed) drawTexture(image); };
      image.onerror = () => { if (!disposed) drawTexture(); };
      image.src = artworkUrl;
    } else {
      drawTexture();
    }

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let animationFrame = 0;
    const render = () => {
      if (disposed) return;
      controls.update();
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      controls.dispose();
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      cap.geometry.dispose();
      capMaterial.dispose();
      capTop.geometry.dispose();
      base.geometry.dispose();
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      canvasTexture.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [accent, artworkText, artworkUrl, thermoColor]);

  return <div ref={mountRef} className="relative h-full min-h-[430px] w-full overflow-hidden rounded-[16px]"><div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-full bg-white/85 px-3 py-2 font-display text-[10px] font-semibold uppercase tracking-[.1em] text-[#59636f] backdrop-blur-sm">Arrastra para girar · vista 360°</div><div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-black/10 bg-white/75 px-3 py-2 font-display text-[10px] font-semibold text-[#59636f] backdrop-blur-sm">3D · auto</div></div>;
}
