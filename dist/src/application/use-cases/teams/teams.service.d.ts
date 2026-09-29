import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
export declare class TeamsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
