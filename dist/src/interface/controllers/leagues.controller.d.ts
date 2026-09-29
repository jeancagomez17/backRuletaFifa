import { LeaguesService } from '../../application/use-cases/leagues/leagues.service';
export declare class LeaguesController {
    private readonly leaguesService;
    constructor(leaguesService: LeaguesService);
    findAll(): Promise<{
        name: string;
        country: string;
        logoUrl: string | null;
        active: boolean;
        id: number;
    }[]>;
    findRandom(): Promise<{
        name: string;
        country: string;
        logoUrl: string | null;
        active: boolean;
        id: number;
    }>;
}
