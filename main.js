var juego = new Phaser.Game(370, 490, Phaser.CANVAS, "bloque_juego");
var fondoJuego;
var boton;
//var flappy;
var cursores;

//DEMO
var estadoPrincipal = {
	//carga todos los componetnes
	preload: function(){
		juego.stage.backgroundColor = "#000";
		//se carga imagen
		juego.load.image("fondo", "img/bg.png");
		juego.load.image("pajaro", "img/bird_sing.png"); //flappy fijo
		juego.load.image("btn", "img/btn.png");
		//ancho de cada sprite, alto, cuantos sprites hay
		juego.load.spritesheet("pajaros", "img/bird.png", 36, 26, 3); //animacion de flappy
	},

	//se ejecuta una vez que se carga todo
	create: function(){

		//mostrar en pantalla
		fondoJuego = juego.add.tileSprite(0, 0, 370, 550, "fondo");
		boton = juego.add.sprite(juego.width/2, juego.height/2, "btn");
		//flappy = juego.add.sprite(juego.width/2, juego.height/2,"pajaro"); //flappy fijo
		flappy = juego.add.sprite(100, 100, "pajaros"); //flappy fijo
		flappy.frame = 1;

		//creamos animacion: arreglo imagenes, cuadro por segundo
		flappy.animations.add("vuelo", [0,1,2], 10, true);

		//Cambiamos el eje central de la imagen y escalamos la imagen
		boton.anchor.setTo(0.5,0.5);
		flappy.anchor.setTo(0.5);		
		flappy.scale.setTo(1,1);
		boton.scale.setTo(.2,.2);

		//flipear la imagen
		//flappy.scale.setTo(-1,1);
		//rota la imagen
		//flappy.angle = 90;

		//teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		//obtiene todas las flechas del teclado
		cursores = juego.input.keyboard.createCursorKeys();
		
		//Crea herramientas de fisica como gravedad, colision
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		//Habilita la fisica en flappy
		juego.physics.arcade.enable(flappy);
		//No deja salir de la pantalla a flappy
		flappy.body.collideWorldBounds = true;

	},

	//se realizan todas las acciones periodicamente
	update: function(){
		//Animamos el juego
		//fondoJuego.tilePosition.x -= 1;

		//corremos animacion vuelo para flappy
		flappy.animations.play("vuelo");

		/*if( teclaDerecha.isDown ){
			flappy.position.x += 1;
		}*/

		if( cursores.right.isDown )
		{
			flappy.position.x += 1;
		}
		if( cursores.left.isDown )
		{
			flappy.position.x -= 1;
		}
		if( cursores.up.isDown )
		{
			flappy.position.y -= 1;
		}
		if( cursores.down.isDown )
		{
			flappy.position.y += 1;
		}
	}
};

juego.state.add("Menu", Menu);
juego.state.add("Juego", Juego);
juego.state.add("GameOver", GameOver);
juego.state.start("Menu");

