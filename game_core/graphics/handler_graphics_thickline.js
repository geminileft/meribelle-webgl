function Handler_Graphics_Thickline(color_range, matrixHandler) {
	this.projectionMatrix = matrixHandler.getProjectionMatrix();
	this.matrixHandler = matrixHandler;
    this.sys = 'graphics';

	const vdata = this.getData();
    const colors = array_duplicate(color_range, 6, vdata.count);

    const interleaved = create_interleaved3(
        vdata.vertices, GL_VERTEX_SIZE
        , colors , GL_COLOR_SIZE
        , vdata.normals, GL_NORMAL_SIZE
        , vdata.count);

	this.interleaved = interleaved;
}

Handler_Graphics_Thickline.prototype.update = function(gfx) {
	const game_object = this.game_object;

    const x = game_object.x;
    const y = game_object.y;
    const z = game_object.z;

	var identity = mat4.create();

	mat4.identity(identity);

	// var rotateX = mat4.create();
	// var rotateY = mat4.create();

	// mat4.rotateX(identity, this.rotate_x, rotateX);
	// mat4.rotateY(identity, this.rotate_y, rotateY);

	var working = mat4.create();
	var modelMatrix = mat4.create();

	var modelTranslateMatrix = mat4.create();
	mat4.identity(modelTranslateMatrix);
	mat4.translate(modelTranslateMatrix, [x, y, z]);

	// mat4.multiply(modelTranslateMatrix, rotateX, working);
	// mat4.multiply(working, rotateY, modelMatrix);

    const data = {
        interleaved:this.interleaved
		, modelMatrix: modelTranslateMatrix
		, projectionMatrix: this.projectionMatrix
		, viewMatrix: this.matrixHandler.getViewMatrix()
        , shader: 'shader_color_3d_lighting'
    };
	gfx.add_data(data);
}

Handler_Graphics_Thickline.prototype.getData = function() {
	return {
vertices : [
	0.200000, -1.000000, -1.000000
	, 0.200000, -1.000000, 1.000000
	, -0.200000, -1.000000, 1.000000
	, 0.200000, -1.000000, -1.000000
	, -0.200000, -1.000000, 1.000000
	, -0.200000, -1.000000, -1.000000
]

, normals : [
	0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
]
, count : 6
};
}