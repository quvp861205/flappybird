var Menu = {
	//carga todos los componetnes
	preload: function(){
		this.stage.backgroundColor = "#FFF";
		//se carga imagen
		this.load.image("btn", "img/btn.png");
	},

	//se ejecuta una vez que se carga todo
	create: function(){		
		var boton = this.add.button(juego.width/2, juego.height/2, "btn", this.iniciarJuego, this);
		boton.anchor.setTo(.5);		
		boton.scale.setTo(.3);

		var txtIniciar = juego.add.text(juego.width/2, juego.height/2-85, "Iniciar Juego", {font: "bold 24px sans-serif", fill:"black", align: "center"});
		txtIniciar.anchor.setTo(.5);

		var txtIniciar = juego.add.text(juego.width/2, juego.height/2-125, "Flappy Bird", {font: "bold 30px sans-serif", fill:"black", align: "center"});
		txtIniciar.anchor.setTo(.5);

	},

	iniciarJuego: function(){
		this.state.start("Juego");
	}
	
}