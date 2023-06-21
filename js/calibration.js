import * as THREE from "three";

function get_properties(proj) {
    let position = new THREE.Vector3();
    let scale = new THREE.Vector3();
    let rot = new THREE.Quaternion();

    let transMat = new THREE.Matrix4();
    let scaleMat = new THREE.Matrix4();
    let rotMat = new THREE.Matrix4();

    proj.decompose(position, rot, scale);
    getTranslation(position, transMat);
    getRotation(rot, rotMat);
    // console.log(transMat);

    return transMat, rotMat;
}
export { get_properties };

function getTranslation(position, trans) {
    trans.set(
        1, 0, 0, position.x,
        0, 1, 0, position.y,
        0, 0, 1, position.z,
        0, 0, 0, 1
    )
    return trans;
}

function getScale(scale3, scaleMat) {
    
    scaleMat.scale(scale3);
    return scaleMat;
}

function getRotation(quat, rotation) {
    rotation.makeRotationFromQuaternion(quat);
    return rotation;
}                    
                                                                          
function extrinsic_cam2(X1, R1, T1, X0, R0, T0) {
    // x1, R1,T1 are position, rotation & translation vectors of cam1 respectively
    // x0, R0,T0 are relative position, rotation & translation vectors
    // X2, R2, T2 can be claluclated as follows:

    let X2 = new THREE.Vector3();
    let R2 = new THREE.Matrix3();
    let T2 = new THREE.Vector3();

    X2.set(R0.multiply(X1) + T0);

    T2.set(R1.multiply(T0) + T1);

    return X2, T2;
}