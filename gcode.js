const SLIDER_LENGTH = 400;
const STEPS_PER_TURN = 200;
const MICROSTEPS = 16;
const E_MOTOR_REDUCTION = 10;
const E_AXIS_STEPS_PER_DEG = STEPS_PER_TURN * MICROSTEPS / 360; // ≃ 0.88 steps/deg

const SPEED = 400;

function generate(slider_length, object_distance, camera_distance, speed) {
    var code = "; slider_length: " + slider_length + "\n";
    code += "; object_distance: " + object_distance + "\n";
    code += "; camera_distance: " + camera_distance + "\n";
    code += "; speed: " + speed + "\n";

    var angle = Math.abs(Math.atan(object_distance/camera_distance) * 180 / Math.PI);
    code += "; angle :  " + angle + "\n";

    var target_camera_distance = camera_distance - slider_length;
    var target_angle = 0;

    if(target_camera_distance != 0)
        target_angle = Math.abs(Math.atan(object_distance/target_camera_distance) * 180 / Math.PI);

    var e = (target_angle - angle) * E_AXIS_STEPS_PER_DEG

    code += "; target_angle :  " + target_angle + "\n";
    code += "; target_camera_distance :  " + target_camera_distance + "\n\n";
    code += "; delta :  " + e + "\n\n";

    code += "G92 X0 E0\n";
    code += "G1 X" + slider_length + " E" + e + " F" + speed + "\n";

    document.getElementById("code").value = code;
}

function parse_form(event) {
    event.preventDefault();

    slider_length = document.getElementById("slider_length").value;
    object_distance = document.getElementById("object_distance").value;
    camera_distance = document.getElementById("camera_distance").value;
    speed = document.getElementById("speed").value;

    generate(slider_length, object_distance, camera_distance, speed);
}

document.getElementById("form").addEventListener("submit", parse_form);
document.getElementById("slider_length").value = SLIDER_LENGTH;
document.getElementById("speed").value = SPEED;