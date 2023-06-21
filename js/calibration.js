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
                                                                          
function relation(X1, X2, R1,R2)