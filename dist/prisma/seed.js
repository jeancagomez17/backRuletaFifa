"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const leagues = [
    {
        name: 'Premier League',
        country: 'England',
        teams: [
            'Arsenal',
            'Aston Villa',
            'AFC Bournemouth',
            'Brentford',
            'Brighton & Hove Albion',
            'Chelsea',
            'Crystal Palace',
            'Coventry City',
            'Everton',
            'Fulham',
            'Hull City',
            'Ipswich Town',
            'Leeds United',
            'Liverpool',
            'Manchester City',
            'Manchester United',
            'Newcastle United',
            'Nottingham Forest',
            'Sunderland',
            'Tottenham Hotspur',
        ],
    },
    {
        name: 'La Liga',
        country: 'Spain',
        teams: [
            'Athletic Club',
            'Atletico Madrid',
            'Osasuna',
            'Celta Vigo',
            'Alaves',
            'Elche',
            'Barcelona',
            'Getafe',
            'Levante',
            'Malaga',
            'Racing Santander',
            'Rayo Vallecano',
            'Deportivo La Coruna',
            'Espanyol',
            'Real Betis',
            'Real Madrid',
            'Real Sociedad',
            'Sevilla',
            'Valencia',
            'Villarreal',
        ],
    },
    {
        name: 'Serie A',
        country: 'Italy',
        teams: [
            'Inter Milan',
            'AC Milan',
            'Juventus',
            'Napoli',
            'Roma',
            'Lazio',
            'Atalanta',
            'Bologna',
            'Fiorentina',
            'Torino',
            'Genoa',
            'Udinese',
            'Monza',
            'Como',
            'Parma',
            'Cagliari',
            'Lecce',
            'Hellas Verona',
            'Pisa',
            'Sassuolo',
        ],
    },
    {
        name: 'Bundesliga',
        country: 'Germany',
        teams: [
            'Bayern Munich',
            'Borussia Dortmund',
            'Bayer Leverkusen',
            'RB Leipzig',
            'Eintracht Frankfurt',
            'VfB Stuttgart',
            'SC Freiburg',
            'Mainz 05',
            'Werder Bremen',
            'Borussia Monchengladbach',
            'VfL Wolfsburg',
            'FC Augsburg',
            'Union Berlin',
            'TSG Hoffenheim',
            '1. FC Koln',
            'Hamburger SV',
            'FC Schalke 04',
            'FC St. Pauli',
            'FC Heidenheim',
            'SV Elversberg',
        ],
    },
    {
        name: 'Ligue 1',
        country: 'France',
        teams: [
            'Paris Saint-Germain',
            'Marseille',
            'Lyon',
            'Monaco',
            'Lille',
            'Nice',
            'Lens',
            'Rennes',
            'Strasbourg',
            'Nantes',
            'Montpellier',
            'Toulouse',
            'Brest',
            'Reims',
            'Auxerre',
            'Le Havre',
            'Angers',
            'Metz',
        ],
    },
    {
        name: 'Primeira Liga',
        country: 'Portugal',
        teams: [
            'Benfica',
            'Porto',
            'Sporting CP',
            'Braga',
            'Vitoria Guimaraes',
            'Boavista',
            'Famalicao',
        ],
    },
    {
        name: 'Eredivisie',
        country: 'Netherlands',
        teams: [
            'Ajax',
            'PSV Eindhoven',
            'Feyenoord',
            'AZ Alkmaar',
            'FC Twente',
            'Utrecht',
            'Groningen',
        ],
    },
    {
        name: 'Belgian Pro League',
        country: 'Belgium',
        teams: ['Club Brugge', 'Anderlecht', 'Genk'],
    },
    {
        name: 'Scottish Premiership',
        country: 'Scotland',
        teams: ['Celtic', 'Rangers', 'Aberdeen'],
    },
];
async function clearDatabase() {
    await prisma.match.deleteMany();
    await prisma.sessionPlayer.deleteMany();
    await prisma.bet.deleteMany();
    await prisma.gameSession.deleteMany();
    await prisma.player.deleteMany();
    await prisma.customWheelTeam.deleteMany();
    await prisma.customWheel.deleteMany();
    await prisma.team.deleteMany();
    await prisma.league.deleteMany();
}
async function seedLeagues() {
    for (const league of leagues) {
        const created = await prisma.league.create({
            data: {
                name: league.name,
                country: league.country,
                active: true,
                teams: {
                    create: league.teams.map((teamName) => ({ name: teamName })),
                },
            },
        });
        console.log(`Seeded league ${created.name} with ${league.teams.length} teams`);
    }
}
async function seedDefaultCustomWheel() {
    const teams = await prisma.team.findMany({ select: { id: true } });
    await prisma.customWheel.create({
        data: {
            name: 'Todas las ligas',
            teams: {
                create: teams.map((team) => ({ teamId: team.id })),
            },
        },
    });
    console.log(`Seeded default custom wheel with ${teams.length} teams`);
}
async function main() {
    await clearDatabase();
    await seedLeagues();
    await seedDefaultCustomWheel();
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map