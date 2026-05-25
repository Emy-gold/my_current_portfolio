import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls, PerspectiveCamera, RoundedBox, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)');
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return isMobile;
}

function LaptopModel({ isMobile }) {
  const laptop = useRef();
  const screenGlow = useRef();

  useFrame(({ clock, pointer, camera }) => {
    const t = clock.elapsedTime;
    if (laptop.current) {
      laptop.current.rotation.y = Math.sin(t * 0.35) * 0.18 + pointer.x * 0.15;
      laptop.current.rotation.x = -0.15 + pointer.y * 0.05;
      laptop.current.position.y = Math.sin(t * 0.8) * 0.08;
    }
    if (screenGlow.current) {
      screenGlow.current.material.opacity = 0.48 + Math.sin(t * 2.4) * 0.1;
    }
    camera.position.x += (pointer.x * 0.45 - camera.position.x) * 0.025;
    camera.position.y += (1.3 + pointer.y * 0.25 - camera.position.y) * 0.025;
  });

  const codeLines = ['const api = secure();', 'await deploy(stack);', 'role: "full-stack"', 'return cleanUI();'];

  return (
    <group ref={laptop} position={[isMobile ? 0.25 : 1.15, 0, 0]} scale={isMobile ? 0.68 : 1}>
      <RoundedBox args={[3.35, 0.16, 2.12]} radius={0.06} smoothness={6} position={[0, -0.42, 0]} rotation={[0.07, 0, 0]}>
        <meshStandardMaterial color="#10182e" metalness={0.82} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[3.0, 0.024, 1.22]} radius={0.045} smoothness={5} position={[0, -0.31, -0.08]} rotation={[0.07, 0, 0]}>
        <meshStandardMaterial color="#141d38" metalness={0.34} roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[0.78, 0.018, 0.36]} radius={0.035} smoothness={5} position={[0, -0.285, 0.74]} rotation={[0.07, 0, 0]}>
        <meshStandardMaterial color="#27314f" metalness={0.45} roughness={0.26} emissive="#2f80ff" emissiveIntensity={0.03} />
      </RoundedBox>
      <mesh position={[0, -0.34, 1.04]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.055, 3.0, 24]} />
        <meshStandardMaterial color="#1d2849" metalness={0.75} roughness={0.2} emissive="#20e6ff" emissiveIntensity={0.08} />
      </mesh>
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 10 }).map((__, col) => (
          <RoundedBox key={`${row}-${col}`} args={[0.17, 0.018, 0.085]} radius={0.012} smoothness={2} position={[-1.18 + col * 0.26, -0.205, 0.04 + row * 0.15]} rotation={[0.07, 0, 0]}>
            <meshStandardMaterial color="#202b4b" emissive={row === 0 || col === 0 ? '#20e6ff' : '#10172c'} emissiveIntensity={row === 0 || col === 0 ? 0.13 : 0.02} />
          </RoundedBox>
        )),
      )}

      <group position={[0, 0.56, -0.93]} rotation={[-0.18, 0, 0]}>
        <RoundedBox args={[2.85, 1.88, 0.1]} radius={0.07} smoothness={8}>
          <meshStandardMaterial color="#0c1428" metalness={0.72} roughness={0.2} />
        </RoundedBox>
        <RoundedBox args={[2.48, 1.46, 0.035]} radius={0.035} smoothness={5} position={[0, -0.02, 0.062]}>
          <meshStandardMaterial color="#06101f" emissive="#0e4d8f" emissiveIntensity={0.18} metalness={0.25} roughness={0.18} />
        </RoundedBox>
        <mesh ref={screenGlow} position={[0, -0.02, 0.082]}>
          <planeGeometry args={[2.34, 1.32]} />
          <meshBasicMaterial color="#09294d" transparent opacity={0.62} />
        </mesh>
        <mesh position={[0, 0.8, 0.085]}>
          <sphereGeometry args={[0.025, 16, 10]} />
          <meshBasicMaterial color="#9ff5ff" />
        </mesh>
        <Html transform distanceFactor={1.3} position={[0, 0, 0.09]} className="screen-code">
          <div>
            {codeLines.map((line, index) => (
              <span key={line} style={{ animationDelay: `${index * 0.28}s` }}>
                {line}
              </span>
            ))}
          </div>
        </Html>
      </group>
    </group>
  );
}

function FloatingPanel({ position, rotation, title, lines, color = '#20e6ff' }) {
  const frame = useMemo(() => new THREE.BoxGeometry(1.55, 1, 0.04), []);

  return (
    <Float speed={1.35} rotationIntensity={0.25} floatIntensity={0.38}>
      <group position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[1.55, 1.0, 0.035]} />
          <meshStandardMaterial color="#091124" transparent opacity={0.72} emissive={color} emissiveIntensity={0.1} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[frame]} />
          <lineBasicMaterial color={color} transparent opacity={0.85} />
        </lineSegments>
        <Text fontSize={0.08} position={[-0.62, 0.34, 0.04]} color={color} anchorX="left">
          {title}
        </Text>
        {lines.map((line, index) => (
          <mesh key={line} position={[-0.38 + index * 0.08, 0.12 - index * 0.18, 0.045]}>
            <boxGeometry args={[line, 0.035, 0.012]} />
            <meshBasicMaterial color={index % 2 ? '#9b5cff' : '#20e6ff'} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function DigitalParticles({ count = 110 }) {
  const points = useRef();
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current) points.current.rotation.y = clock.elapsedTime * 0.025;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#20e6ff" transparent opacity={0.72} />
    </points>
  );
}

export function WorkspaceScene() {
  const isMobile = useIsMobile();

  return (
    <Canvas dpr={[1, 1.65]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <PerspectiveCamera makeDefault position={[0.4, 1.3, 5.7]} fov={42} />
      <color attach="background" args={['#050812']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[-3, 2.8, 2.4]} intensity={3.6} color="#2f80ff" />
      <pointLight position={[3, 2.2, 1.4]} intensity={3.1} color="#9b5cff" />
      <pointLight position={[1.9, 0.1, 2.7]} intensity={1.4} color="#20e6ff" />
      <spotLight position={[0, 4.5, 3]} angle={0.34} penumbra={1} intensity={2.2} color="#20e6ff" />
      {!isMobile && <Stars radius={20} depth={8} count={800} factor={2.2} saturation={0} fade speed={0.35} />}
      <DigitalParticles count={isMobile ? 50 : 120} />
      <LaptopModel isMobile={isMobile} />
      {!isMobile && (
        <>
          <FloatingPanel position={[-1.85, 0.72, -0.45]} rotation={[0.08, 0.42, 0.04]} title="API STATUS" lines={[0.72, 0.48, 0.95, 0.58]} />
          <FloatingPanel position={[3.05, 0.95, -0.75]} rotation={[0.02, -0.42, -0.03]} title="BUILD PIPE" lines={[0.84, 0.56, 0.68, 0.44]} color="#9b5cff" />
          <FloatingPanel position={[2.35, -0.78, 0.35]} rotation={[-0.12, -0.55, 0.04]} title="DATA LAYER" lines={[0.56, 0.82, 0.42]} />
        </>
      )}
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 96]} />
        <meshBasicMaterial color="#142b54" transparent opacity={0.12} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}

export function TechOrbit({ skills }) {
  return (
    <div className="relative h-[520px] min-h-[520px] overflow-hidden rounded-lg border border-cyan-300/25 bg-[#061021]/90 shadow-neon backdrop-blur-xl">
      <Canvas className="absolute inset-0 h-full w-full" dpr={[1, 1.5]} camera={{ position: [0, 0.05, 5.65], fov: 42 }}>
        <ambientLight intensity={1.15} />
        <pointLight position={[3, 3, 4]} intensity={3.7} color="#20e6ff" />
        <pointLight position={[-3, -2, 4]} intensity={3} color="#9b5cff" />
        <pointLight position={[0, 0, 4]} intensity={1.8} color="#ffffff" />
        <SimpleSkillField skills={skills} />
      </Canvas>
    </div>
  );
}

function SimpleSkillField({ skills }) {
  const core = useRef();
  const ring = useRef();

  useFrame(({ clock }) => {
    core.current.rotation.y = clock.elapsedTime * 0.22;
    core.current.rotation.x = Math.sin(clock.elapsedTime * 0.35) * 0.18;
    ring.current.rotation.z = clock.elapsedTime * 0.12;
  });

  const visibleSkills = skills.slice(0, 10);

  return (
    <group scale={0.98}>
      <group ref={core}>
        <RoundedBox args={[1.65, 1.65, 1.65]} radius={0.2} smoothness={8}>
          <meshStandardMaterial color="#0f2548" emissive="#2f80ff" emissiveIntensity={0.42} metalness={0.42} roughness={0.2} />
        </RoundedBox>
        <mesh>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshBasicMaterial color="#20e6ff" transparent opacity={0.24} wireframe />
        </mesh>
      </group>
      <group ref={ring}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.55, 0.022, 12, 160]} />
          <meshBasicMaterial color="#20e6ff" transparent opacity={0.82} />
        </mesh>
        <mesh rotation={[0.95, 0.15, 0.35]}>
          <torusGeometry args={[2.95, 0.017, 12, 160]} />
          <meshBasicMaterial color="#9b5cff" transparent opacity={0.72} />
        </mesh>
      </group>
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.7, 96]} />
        <meshBasicMaterial color="#20e6ff" transparent opacity={0.09} />
      </mesh>
      {visibleSkills.map((skill, index) => {
        const row = index < 5 ? 1 : -1;
        const column = index % 5;
        const x = -2.45 + column * 1.22;
        const y = row * 1.58;
        const z = index % 2 ? 0.65 : 0.25;
        return (
          <Float key={skill} speed={1.05 + index * 0.04} floatIntensity={0.18}>
            <Html transform distanceFactor={1.32} position={[x, y, z]} zIndexRange={[30, 10]}>
              <span className="skill-chip">{skill}</span>
            </Html>
          </Float>
        );
      })}
    </group>
  );
}
