var fondoJuego;
var flappy;
var timer;
var txtPuntos;
var puntos = -1;

var Juego = {
	//carga todos los componetnes
	preload: function(){
		juego.stage.backgroundColor = "#000";
		//se carga imagen
		juego.load.image("fondo", "img/bg.png");
		juego.load.image("pajaro", "img/bird_sing.png"); //flappy fijo
		//ancho de cada sprite, alto, cuantos sprites hay
		juego.load.spritesheet("pajaros", "img/bird.png", 36, 26, 3); //animacion de flappy
		juego.load.image("tuboArriba", "img/tube1.png");
		juego.load.image("tuboAbajo", "img/tube2.png");
		juego.load.image("piso", "img/ground.png");

		//que se vea mejor el juego
		juego.forceSingleUpdate = true;
	},

	//se ejecuta una vez que se carga todo
	create: function(){

		//mostrar en pantalla
		fondoJuego = juego.add.tileSprite(0, 0, 370, 500, "fondo");

		piso = juego.add.tileSprite(0,380, 370, 110, "piso");
		//flappy = juego.add.sprite(juego.width/2, juego.height/2,"pajaro"); //flappy fijo
		flappy = juego.add.sprite(100, 100, "pajaros"); //flappy fijo
		flappy.frame = 1;

		//creamos animacion: arreglo imagenes, cuadro por segundo
		flappy.animations.add("vuelo", [0,1,2], 10, true);

		//Cambiamos el eje central de la imagen y escalamos la imagen
		flappy.anchor.setTo(0.5);		
		flappy.scale.setTo(1,1);

		//teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		//obtiene todas las flechas del teclado
		cursores = juego.input.keyboard.createCursorKeys();
		
		//Crea herramientas de fisica como gravedad, colision
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		//Habilita la fisica en flappy
		juego.physics.arcade.enable(flappy);
		juego.physics.arcade.enable(piso);
		//No deja salir de la pantalla a flappy
		flappy.body.collideWorldBounds = true;

		saltar = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		saltar.onDown.add(this.saltar, this);
		flappy.body.gravity.y = 1200;

		tubosArriba = juego.add.group();
		tubosArriba.enableBody = true;
		tubosArriba.createMultiple(20, "tuboArriba");

		tubosAbajo = juego.add.group();
		tubosAbajo.enableBody = true;
		tubosAbajo.createMultiple(20, "tuboAbajo");

		piso.enableBody = true;
		piso.body.gravity.y = 0;

		//cada 1.5 segundos se crea una columna
		timer = juego.time.events.loop(1500, this.crearColumna, this);

		txtPuntos = juego.add.text(20, 20, "0", {font:"30px Arial", fill: "#FFF"});

	},

	//se realizan todas las acciones periodicamente
	update: function(){
		//Animamos el juego
		//fondoJuego.tilePosition.x -= 1;

		if( flappy.inWorld==false ){
			//reiniciar juego
			flappy.alive = false;

			tubosArriba.forEachAlive(function(t){
				t.body.velocity.x = 0;
			}, this);

			tubosAbajo.forEachAlive(function(t){
				t.body.velocity.x = 0;
			}, this);

			fondoJuego.tilePosition.x -= 0;;
			piso.tilePosition.x -=0;

			this.state.start("GameOver");

		} else if( flappy.position.y>460 ){

			flappy.alive = false;

			tubosArriba.forEachAlive(function(t){
				t.body.velocity.x = 0;
			}, this);
			tubosAbajo.forEachAlive(function(t){
				t.body.velocity.x = 0;
			}, this);

			fondoJuego.tilePosition.x -= 0;;
			piso.tilePosition.x -=0;
			this.state.start("GameOver");
		} else if( flappy.alive ) {
			fondoJuego.tilePosition.x -=.5;
			piso.tilePosition.x -=3;

		} else {
			fondoJuego.tilePosition.x -= 0;;
			piso.tilePosition.x -=0;

		}

		//corremos animacion vuelo para flappy
		flappy.animations.play("vuelo");

		
		if( flappy.angle<20){
			flappy.angle +=1;
		}


		juego.physics.arcade.overlap(flappy, tubosArriba, this.tocoTubo, null, this);
		juego.physics.arcade.overlap(flappy, tubosAbajo, this.tocoTubo, null, this);
		juego.physics.arcade.overlap(flappy, piso, this.tocoTubo, null, this);
	},

	saltar: function(){
		flappy.body.velocity.y = -350;
		//Se genera una trasicion del angulo
		juego.add.tween(flappy).to({angle: -20}, 100).start();
		//flappy.angle = -20;
	},

	crearColumna: function(){

		this.crearUnTubo(370, -250);

		puntos += 1;
		txtPuntos.text = puntos;
	},

	crearUnTubo: function(x,y){

		var posicionTubo = -1*Math.floor(Math.random()*230);
		if( posicionTubo>-65 ) posicionTubo = -65;

		var tubo = tubosArriba.getFirstDead();
		tubo.reset(x, posicionTubo);
		//tubo.reset(x, -50);
		tubo.body.velocity.x -= 180;
		tubo.checkWorldBounds = true;
		tubo.outOfBoundsKill = true;

		var tubo = tubosAbajo.getFirstDead();
		tubo.reset(x, 490-((-1*posicionTubo+60)));
		//tubo.reset(x, 490-110);
		tubo.body.velocity.x -= 180;
		tubo.checkWorldBounds = true;
		tubo.outOfBoundsKill = true;
	},

	tocoTubo: function(){
		if( flappy.alive==false){
			return;
		}

		flappy.alive = false;
		juego.time.events.remove(timer); //ya no creamos mas tubos

		tubosArriba.forEachAlive(function(t){
			t.body.velocity.x = 0;
		}, this);
		tubosAbajo.forEachAlive(function(t){
			t.body.velocity.x = 0;
		}, this);

		fondoJuego.tilePosition.x -= 0;;
		piso.tilePosition.x -=0;

		saltar.onDown.remove(this.saltar, this);
	}

};