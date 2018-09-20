class Match {
  constructor(docs) {
		Object.assign(this, docs);
	}

	get info() {
		return {
			radiantTeam: this.radiantTeam,
			direTeam: this.direTeam,
			...this.result,
			...this.getPlayersStats,
			startTime: this.start_time,
		}
	}

	get result() {
		const lastObjective = this.objectives[this.objectives.length - 1];
		if(lastObjective.key !== 'npc_dota_goodguys_fort') {
			return {msg: 'Game Ongoing', finished: false };
		} else {
			if(this.radiant_win) {
				return {msg: `${this.radiantTeam.name} WIN`, finished: true };
			} else {
				return {msg: `${this.direTeam.name} WIN`, finished: true };
			}
		}
	}

	get direTeam() {
		return this.dire_team;
	}

	get radiantTeam() {
		return this.radiant_team;
	}

	get getPlayersStats() {
		let radiantPlayers = [];
		let direPlayers = [];
		this.players.forEach(player => {
			if(player.isRadiant) {
				radiantPlayers.push({
					name: player.name,
					team: 'Radiant',
					kills: player.kills,
					deaths: player.deaths,
					assists: player.assists,
				})
			} else {
				direPlayers.push({
					name: player.name,
					team: 'Dire',
					kills: player.kills,
					deaths: player.deaths,
					assists: player.assists,
				})
			}
		});
		return {radiantPlayers, direPlayers};
	}
}

module.exports = Match;