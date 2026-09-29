import { CustomWheelsService } from '../../application/use-cases/custom-wheels/custom-wheels.service';
import { CreateCustomWheelDto } from '../dto/create-custom-wheel.dto';
export declare class CustomWheelsController {
    private readonly customWheelsService;
    constructor(customWheelsService: CustomWheelsService);
    create(dto: CreateCustomWheelDto): Promise<{
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
