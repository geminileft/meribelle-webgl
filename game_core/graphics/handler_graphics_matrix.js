function Handler_Graphics_Matrix(width, height
    , angle, near_plane, far_plane, distance_behind) {
    const ratio = width / height;
    this.projectionMatrix = mat4_perspective(angle, ratio, near_plane, far_plane);
    this.sys = 'graphics';
    this.distance_behind = distance_behind;
    this.follow_obj = null;
}

Handler_Graphics_Matrix.prototype.setFollowObject = function(follow_obj) {
    this.follow_obj = follow_obj;
}

Handler_Graphics_Matrix.prototype.getProjectionMatrix = function() {
    return this.projectionMatrix;
}

Handler_Graphics_Matrix.prototype.getViewMatrix = function() {
    const game_object = this.game_object;
    
    if (this.follow_obj != null) {
        game_object.z = this.follow_obj.z + this.distance_behind;

    }
    const camera_location = {
        x_pos : game_object.x
        , y_pos : game_object.y
        , z_pos : game_object.z
        , distance_behind: this.distance_behind
    };
    //TODO: REFACTOR OUT FROM MAT4_LOOKAT THE OTHER VALUES
    return mat4_lookat(camera_location);
}

Handler_Graphics_Matrix.prototype.update = function(gfx) {
}