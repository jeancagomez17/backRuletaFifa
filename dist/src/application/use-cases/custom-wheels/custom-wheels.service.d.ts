import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
export type CreateCustomWheelInput = {
    name: string;
    teamIds: number[];
};
export declare class CustomWheelsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(input: CreateCustomWheelInput): Promise<{
        teams: ({
            team: {
                name: string;
                logoUrl: string | null;
                id: number;
                leagueId: number;
            };
        } & {
            customWheelId: number;
            teamId: number;
        })[];
    } & {
        name: string;
        id: number;
    }>;
    findById(id: number): Promise<{
        teams: ({
            team: {
                name: string;
                logoUrl: string | null;
                id: number;
                leagueId: number;
            };
        } & {
            customWheelId: number;
            teamId: number;
        })[];
    } & {
        name: string;
        id: number;
    }>;
    findRandomTeam(id: number): Promise<{
        name: string;
        logoUrl: string | null;
        id: number;
        leagueId: number;
    }>;
}
