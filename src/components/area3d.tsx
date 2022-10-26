import React, { useEffect, useRef, useState } from 'react'

// const Box = () => {
//     return (
//         <mesh rotation-x={Math.PI * -0.5}>
//             <planeBufferGeometry args={[20, 20]} />
//             <meshStandardMaterial color={"#f0f0f0"} />
//         </mesh>
//     );
// };

// function Cube(props: any) {
//     // This reference will give us direct access to the mesh
//     const mesh = useRef()

//     useEffect(() => {
//         if (mesh && mesh.current) {
//             (mesh as any).current.rotation.x = 18
//         }
//     }, [mesh])

//     return (
//         <mesh
//             {...props}
//             ref={mesh}
//             scale={1}>
//             <boxGeometry args={[3, 3, 3]} />
//             <meshStandardMaterial color={"yellow"} />
//         </mesh>
//     )
// }


const Area = () => {
    return (
        <div style={{ width: 300, height: 500, backgroundColor: '#f0f0f0', boxShadow: '1px 4px 11px -1px #3A3A3A' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }}><div style={{ transform: "rotate(-90deg)", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', top: 52 }}>Solar Panel</div></div>
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
                <div style={{ backgroundColor: '#d4b106', width: 80, height: 140, margin: 12, boxShadow: '1px 4px 11px -1px #876800' }} />
            </div>
        </div>
        // <Canvas
        //     style={{ height: 600, width: 600 }}
        //     camera={{ position: [0, 15, 15] }}
        // >
        //     <pointLight position={[5, 5, 5]} />
        //     <Box />
        //     <Cube position={[-6.5, -5, 10]} />
        //     <Cube position={[0, -5, 10]} />
        //     <Cube position={[6.3, -5, 10]} />

        //     <Cube position={[-6.5, 5, -2]} />
        //     <Cube position={[0, 5, -2]} />
        //     <Cube position={[6.3, 5, -2]} />

        //     <Cube position={[-6.5, -5, 4]} />
        //     <Cube position={[0, -5, 4]} />
        //     <Cube position={[6.3, -5, 4]} />

        // </Canvas>
    );
};

export default Area