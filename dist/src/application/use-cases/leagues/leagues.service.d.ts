import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
export declare class LeaguesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findActive(): Promise<{
        name: string;
        country: string;
        logoUrl: string | null;
        active: boolean;
        id: number;
    }[]>;
    findRandomActive(): Promise<{
        name: string;
        country: string;
        logoUrl: string | null;
        active: boolean;
        id: number;
    }>;
}
