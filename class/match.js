class Match {
	constructor (joueur1, joueur2, court, tournament, stratTime, points, duration, serverPlayer, speed_last_serv, nb_exchanges, contests) {
    this.joueur1 = joueur1;
    this.joueur2 = joueur2;
    this.court = court;
    this.tournament = tournament;
    this.stratTime = stratTime;
    this.points = points;
    this.duration = duration;
    this.serverPlayer = serverPlayer;
    this.speed_last_serv = speed_last_serv;
    this.nb_exchanges = 0;
    this.contests = contests;
  }

  	score (points) {
		switch (points){
            case 0 :
                return 0;
            case 1 :
                return 15;
            case 2 :
                return 30;
            case 3 :
                return 40;
            default :
                return 0;
        }
	}

	time (t){
		var hours = Math.floor(t / 3600);
        var minutes = Math.floor((t % 3600) / 60);
        var seconds = t - minutes * 60 - hours * 3600;

        return hours + "h " + minutes + "min " + seconds + "s";
	}
}