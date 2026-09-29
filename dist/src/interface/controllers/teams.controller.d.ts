import { TeamsService } from '../../application/use-cases/teams/teams.service';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    findByLeague(leagueId: number): Promise<{
        name: string;
        logoUrl: string | null;
        id: number;
        leagueId: number;
    }[]>;
    findRandomByLeague(leagueId: number): Promise<{
        name: string;
        logoUrl: string | null;
        id: number;
        leagueId: number;
    }>;
}
