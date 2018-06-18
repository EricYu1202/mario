var game = new Phaser.Game(800, 500, Phaser.AUTO, 'gameDiv');
var bgtile;
var cur, obj,money,nextEnemyAt,enemyDelay,localscore;
var life =3;
var datebefore;
var startMsec;
var first=0;
var timeend;
var main = {
    

  preload: function() {
      game.load.image('logo', 'asset/mario2.png');
      game.load.image('background', 'asset/background.jpg');
      game.load.image('monster', 'asset/enemy1.1.png');
      game.load.image('money', 'asset/money1.1.png',40,40);
      game.load.audio('bgmMusic', 'asset/Super Mario Bros. Soundtrack.mp3');
      
      datebefore=new Date();
      startMsec = datebefore.getMilliseconds();
  },

  create: function() {
      life =3;
     datebefore=new Date();
        startMsec = datebefore.getMilliseconds();
       
       this.bgmMusic = game.add.audio('bgmMusic');
       this.bgmMusic.loop = true;
       this.bgmMusic.play(); 
      
      game.physics.startSystem(Phaser.Physics.ARCADE);
      bgtile = game.add.tileSprite(0, 0, 800, 500, 'background');
      this.score = 0;
      this.scoreText = game.add.text(16, 16, '分數: 0',
                                {fontSize: '25px', fill: '#000'});
      obj=game.add.text(16, 45, '生命:' +life,
                                {fontSize: '25px', fill: '#000'});
      
      this.player = game.add.sprite(20, 15, 'logo');
      game.physics.arcade.enable(this.player);
      this.player.body.bounce.y = 0.2;
      this.player.body.gravity.y = 400;
      this.player.body.collideWorldBounds = true;
      this.player.body.setSize(40, 125, 5, 8);
      cur = game.input.keyboard.createCursorKeys(); 
      
      this.coin = game.add.group();
      this.coin.enabelBody=true;
      game.physics.arcade.enable(this.coin);
     
      this.coin.createMultiple(5, 'money');
      this.coin.setAll('anchor.x', 0.5);
      this.coin.setAll('anchor.y', 0.5);
      this.coin.setAll('outOfBoundsKill', true);
      this.coin.setAll('checkWorldBounds', true);
       this.nextcoinAt = 0;
       this.coinDelay = 2000;
     
      
      this.monsters=game.add.group();
      this.monsters.enabelBody=true;
      game.physics.arcade.enable(this.monsters);
      this.monsters.createMultiple(10, 'monster');
      this.monsters.setAll('anchor.x', 0.5);
      this.monsters.setAll('anchor.y', 0.5);
      this.monsters.setAll('outOfBoundsKill', true);
      this.monsters.setAll('checkWorldBounds', true);
       this.nextEnemyAt = 0;
       this.enemyDelay = 8000;
      
      datebefore=new Date();
        startMsec = datebefore.getMilliseconds();
       
  },

  update: function() {
      if(first==0){datebefore=new Date();
        startMsec = datebefore.getMilliseconds();first++;console.log(datebefore);}
      
      bgtile.tilePosition.x -= 2;
      game.physics.arcade.overlap(this.player, this.monsters, this.hitmonster,null, this); 
      game.physics.arcade.overlap(this.player, this.coin, this.collectcoin,null, this);
      
      if (this.nextEnemyAt<game.time.now && this.monsters.countDead()>0) {
    this.nextEnemyAt = game.time.now + this.enemyDelay;
    var enemy = this.monsters.getFirstExists(false);
    enemy.reset(750, 450);
    game.physics.arcade.enable(enemy);
    if(this.score>=100&&this.score<200){enemy.body.velocity.x=-60;}
    else if(this.score>=200&&this.score<300){enemy.body.velocity.x=-90;}
    else if(this.score>=300){enemy.body.velocity.x=-150;}
    else{enemy.body.velocity.x=-30 ;}
    
  }
      
      if (this.nextcoinAt<game.time.now && this.coin.countDead()>0) {
    this.nextcoinAt = game.time.now + this.coinDelay;
    var cash = this.coin.getFirstExists(false);
    cash.reset(750, game.rnd.integerInRange(200, 450));
    game.physics.arcade.enable(cash);
    cash.body.velocity.x= -30;
  }
      
      
      
      this.player.body.velocity.x = 0;
  if (cur.left.isDown) {
    this.player.body.velocity.x = -200;
     
    
  }
  else if (cur.right.isDown) {
    this.player.body.velocity.x = 200;
    
  }
  else {
    //101
    
  }
  if (cur.up.isDown &&
      (this.player.body.onFloor() || this.player.body.touching.down)) {
    this.player.body.velocity.y = -350;
  } 
      
  },
    
    
    collectcoin: function(player, money) {
    money.kill(); 
    this.score += 10;
    this.scoreText.text = '分數: ' + this.score; 
  },
    hitmonster: function(player,monster){
    monster.kill();
    life-=1;
        obj.kill();
    obj=game.add.text(16, 45, '生命:'+life,
                                {fontSize: '25px', fill: '#000'});
    //var s=datebefore.getSeconds();
    //var m=datebefore.getMinutes();
    //var h=datebefore.getHours();
    
    //var t=h+'時'+m+'分'+s+'秒';
    if(life==0){
        console.log(new Date());
        
        timeend=new Date();
        var s=(timeend-datebefore)/1000;
        var t= s+'秒';
        game.state.start('over');localStorage.setItem(t, this.score);
       
      
               }
}

    

};
    
var over={
    
    preload: function() {
      
      game.load.image('background', 'asset/background.jpg');
     
  },
    
    create: function(){
        game.add.tileSprite(0, 0, 800, 500, 'background');
       var style={
         font: '52px Monospace',
         fill: '#000000',
         align: 'center'
       }
       var text = game.add.text(game.width/2, game.height/2,
     '遊戲結束\n\n點擊重新開始', style);
       text.anchor.set(0.5);
       game.input.onDown.add(this.restartGame, this);
    },
    restartGame: function() {
    game.state.start('main');
        first=0;
  }
    
    
};

game.state.add('main', main);
game.state.add('over', over);
game.state.start('main');