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

	get timeStarted() {
		const timeStampDigitLength = 13;
		if(this.start_time.toString().length > timeStampDigitLength) {
			let timeStampString = this.start_time.toString();
			const zeroesLeft = timeStampDigitLength - this.start_time.toString().length;
			for(let i = 0; i < zeroesLeft; i++) {
				timeStampString = timeStampString + '0';
			}
			return parseInt(timeStampString);
		}
		return this.start_time;		
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